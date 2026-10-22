import { getEmailSet } from '@/data/emailUtils'
import type { Language, LiteracyScore, TrapResult } from '@/types'

// ─── DB ログ行の型 ────────────────────────────────────────────────────────────

export type LogRow = {
  id: number
  session_id: string
  email_id: string
  email_lang: string
  event_type: string
  duration_ms: number | null
  value: string | null
  created_at: string
}

// ─── 数値ユーティリティ ────────────────────────────────────────────────────────

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2
}

function linearScore(value: number, min: number, max: number): number {
  if (value >= max) return 100
  if (value < min) return 0
  return ((value - min) / (max - min)) * 100
}

function clamp(v: number): number {
  return Math.min(100, Math.max(0, Math.round(v * 10) / 10))
}

// 罠メールへの最終判断となりうるアクション種別
const FINAL_ACTION_EVENTS = new Set(['action_reply', 'action_ignore', 'action_block'])

// 最終アクションを点数化する（ドメイン／リンク判定で共通利用）
//   action_block  → 100（偽装を見抜いて正しく対処）
//   action_ignore →  50（疑ったが確信が持てなかった）
//   action_reply / 未操作 → 0（偽装に気づかなかった）
function actionScore(eventType: string | undefined): number {
  if (eventType === 'action_block')  return 100
  if (eventType === 'action_ignore') return 50
  return 0
}

// ─── スコア算出 ────────────────────────────────────────────────────────────────

export function computeScore(
  logs: LogRow[],
  uiLang: Language,
  l1Lang: Language,
): { score: LiteracyScore; trapResults: TrapResult[] } {
  const emails     = getEmailSet(uiLang, l1Lang)
  const trapEmails = emails.filter((e) => e.isTrap)
  const trapIds    = new Set(trapEmails.map((e) => e.id))

  const domainTrapIds = new Set(
    trapEmails.filter((e) => e.traps.includes('domain')).map((e) => e.id)
  )
  const linkTrapIds = new Set(
    trapEmails.filter((e) => e.traps.includes('link')).map((e) => e.id)
  )
  const extTrapIds = new Set(
    trapEmails.filter((e) => e.traps.includes('extension')).map((e) => e.id)
  )

  const trapLogs = logs.filter((l) => trapIds.has(l.email_id))

  // 各罠メールの「最終アクション」ログ（時系列で最後の action_* を採用）。
  // ドメイン・リンク・緊急性スコアと trapResults で共通利用する。
  const finalActionLogByEmail: Record<string, LogRow> = {}
  for (const log of trapLogs) {
    if (FINAL_ACTION_EVENTS.has(log.event_type)) {
      finalActionLogByEmail[log.email_id] = log
    }
  }

  // ── domainVerification（30%）─────────────────────────────────────────────
  // ドメイン偽装を含む罠メール（traps に 'domain'）への最終アクションで判定する。
  // ホバー時間ではなく最終判断を見るため、目視確認の参加者も正しく評価できる。
  const domainScores = [...domainTrapIds].map(
    (id) => actionScore(finalActionLogByEmail[id]?.event_type)
  )
  const domainVerification = clamp(
    domainScores.length > 0
      ? domainScores.reduce((a, b) => a + b, 0) / domainScores.length
      : 0
  )

  // ── linkInspection（25%）────────────────────────────────────────────────
  // リンク偽装を含む罠メール（traps に 'link'）への最終アクションで判定する。
  const linkScores = [...linkTrapIds].map(
    (id) => actionScore(finalActionLogByEmail[id]?.event_type)
  )
  const linkInspection = clamp(
    linkScores.length > 0
      ? linkScores.reduce((a, b) => a + b, 0) / linkScores.length
      : 0
  )

  // ── urgencyResistance（25%）──────────────────────────────────────────────
  // 罠メールの最終 TTA（action_reply / action_ignore / action_block の duration_ms）の中央値
  const finalTtaByEmail: Record<string, number> = {}
  for (const [emailId, log] of Object.entries(finalActionLogByEmail)) {
    if (log.duration_ms != null) finalTtaByEmail[emailId] = log.duration_ms
  }
  const medianTta = median(Object.values(finalTtaByEmail))
  const urgencyResistance = clamp(
    medianTta === null ? 0 : linearScore(medianTta, 2000, 8000)
  )

  // ── extensionAwareness（10%）─────────────────────────────────────────────
  const emailsWithHoverAttach = new Set(
    trapLogs
      .filter((l) => l.event_type === 'hover_attachment' && extTrapIds.has(l.email_id))
      .map((l) => l.email_id)
  )
  const extensionAwareness = clamp(
    extTrapIds.size > 0 ? (emailsWithHoverAttach.size / extTrapIds.size) * 100 : 0
  )

  // ── textVerification（10%）───────────────────────────────────────────────
  const hasTextActivity = logs.some(
    (l) => l.event_type === 'text_select' || l.event_type === 'text_copy'
  )
  const textVerification = hasTextActivity ? 100 : 0

  // ── overallScore ─────────────────────────────────────────────────────────
  const overallScore = clamp(
    domainVerification  * 0.30 +
    linkInspection      * 0.25 +
    urgencyResistance   * 0.25 +
    extensionAwareness  * 0.10 +
    textVerification    * 0.10
  )

  const score: LiteracyScore = {
    domainVerification,
    linkInspection,
    urgencyResistance,
    extensionAwareness,
    textVerification,
    overallScore,
  }

  // ── trapResults ───────────────────────────────────────────────────────────
  const trapResults: TrapResult[] = trapEmails.map((email) => {
    const finalActionLog = finalActionLogByEmail[email.id]

    const finalAction: 'replied' | 'ignored' | 'blocked' =
      finalActionLog?.event_type === 'action_block'  ? 'blocked' :
      finalActionLog?.event_type === 'action_ignore' ? 'ignored' :
      'replied'

    const fellForTrap: boolean | null =
      finalAction === 'replied' ? true :
      finalAction === 'ignored' ? null :
      false

    return {
      trapId:      email.id,
      finalAction,
      ttaMs:       finalActionLog?.duration_ms ?? 0,
      fellForTrap,
    }
  })

  return { score, trapResults }
}
