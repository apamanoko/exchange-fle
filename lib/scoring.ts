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
  /** 提示スロット（1〜16）。古いログや /phished 直書き行では null のことがある */
  slot_index?: number | null
  /** 罠の提示回数（1/2）。古いログや /phished 直書き行では null のことがある */
  exposure_index?: number | null
}

// 罠にかかったと判定するイベント（クリック/添付実行）
const FELL_EVENTS = new Set(['link_click', 'attachment_open'])
// ホバー系（熟慮・ためらいの指標）
const HOVER_EVENTS = new Set(['hover_sender', 'hover_link', 'hover_attachment'])

/** 攻撃タイプ番号を email_id（trap-N-xxx）から取り出す（通常メールは null） */
function attackTypeOf(emailId: string): number | null {
  const m = emailId.match(/trap-(\d+)-/)
  return m ? parseInt(m[1], 10) : null
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
): {
  score: LiteracyScore
  trapResults: TrapResult[]
  falseAlarmCount: number
  falseAlarmRate: number
} {
  const emails     = getEmailSet(uiLang, l1Lang)
  const trapEmails = emails.filter((e) => e.isTrap)
  const normalEmails = emails.filter((e) => !e.isTrap)
  const trapIds    = new Set(trapEmails.map((e) => e.id))

  // email_id ごとにログをまとめる（行数ではなく「有無」で判定するため）
  const logsByEmail: Record<string, LogRow[]> = {}
  for (const l of logs) (logsByEmail[l.email_id] ??= []).push(l)

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
    const el = logsByEmail[email.id] ?? []
    const finalActionLog = finalActionLogByEmail[email.id]

    const finalAction: 'replied' | 'ignored' | 'blocked' =
      finalActionLog?.event_type === 'action_block'  ? 'blocked' :
      finalActionLog?.event_type === 'action_ignore' ? 'ignored' :
      'replied'

    // fell = クリック/添付実行が1件でもあれば true（行数ではなくメール単位の有無）
    const fellForTrap   = el.some((l) => FELL_EVENTS.has(l.event_type))
    const repliedToTrap = el.some((l) => l.event_type === 'action_reply')

    // slot/exposure は null でない行から取る（/phished 直書き行は null のため）
    const slotIndex     = el.find((l) => l.slot_index != null)?.slot_index ?? null
    const exposureIndex = el.find((l) => l.exposure_index != null)?.exposure_index ?? null

    return {
      trapId:        email.id,
      attackType:    attackTypeOf(email.id) ?? 0,
      lang:          email.lang,
      slotIndex,
      exposureIndex,
      finalAction,
      ttaMs:         finalActionLog?.duration_ms ?? 0,
      fellForTrap,
      repliedToTrap,
    }
  })

  // ── falseAlarm（偽陽性）: 正規メールに対する action_block ────────────────────
  // メール単位の有無で数える（正規メールをブロック＝1件の誤報）
  const falseAlarmCount = normalEmails.filter(
    (e) => (logsByEmail[e.id] ?? []).some((l) => l.event_type === 'action_block'),
  ).length
  const falseAlarmRate = normalEmails.length > 0 ? falseAlarmCount / normalEmails.length : 0

  return { score, trapResults, falseAlarmCount, falseAlarmRate }
}

// ─── 試行単位エクスポート（1セッション×1メール=1行）──────────────────────────

/** エクスポート1行（1セッション×1メール） */
export type TrialRow = {
  session_id: string
  attackType: number | null
  lang: string
  exposureIndex: number | null
  slotIndex: number | null
  isTrap: 0 | 1
  /** link_click または attachment_open が1件でもあれば1（罠・通常問わず） */
  clicked: 0 | 1
  /** 罠にかかった(1)/かからなかった(0)。通常メールは null（空欄）。罠では clicked と同値 */
  fell: 0 | 1 | null
  /** 罠に返信した(1)/しない(0)。通常メールは null（空欄） */
  repliedToTrap: 0 | 1 | null
  /** 疑って action_block した(1)/しない(0)。通常メールでは偽陽性 */
  suspected: 0 | 1
  /** 最終アクションまでの TTA（ms） */
  ttaMs: number | null
  /** ホバー回数（熟慮・ためらいの指標） */
  hesitationCount: number
}

/** 割当メール（emailUtils の AssignedEmail 互換の最小形） */
type AssignedLike = {
  id: string
  lang: string
  isTrap: boolean
  slotIndex: number
  exposureIndex: number | null
}

/**
 * 1セッションの割当メール（16通）とログから、試行単位の行を生成する純粋関数。
 * slot/exposure はログの非null行を優先し、無ければ割当（AssignedEmail）の値を使う。
 * これにより新列の無い古いログでも落ちない。
 */
export function buildTrialRows(
  sessionId: string,
  assignedEmails: AssignedLike[],
  logs: LogRow[],
): TrialRow[] {
  const logsByEmail: Record<string, LogRow[]> = {}
  for (const l of logs) (logsByEmail[l.email_id] ??= []).push(l)

  return assignedEmails.map((email) => {
    const el = [...(logsByEmail[email.id] ?? [])].sort(
      (a, b) => a.created_at.localeCompare(b.created_at),
    )
    const isTrap = email.isTrap

    const clicked = el.some((l) => FELL_EVENTS.has(l.event_type))
    const replied = el.some((l) => l.event_type === 'action_reply')
    const blocked = el.some((l) => l.event_type === 'action_block')

    const actionLogs = el.filter((l) => FINAL_ACTION_EVENTS.has(l.event_type))
    const lastAction = actionLogs[actionLogs.length - 1]
    const ttaMs = lastAction?.duration_ms ?? null

    const hesitationCount = el.filter((l) => HOVER_EVENTS.has(l.event_type)).length

    const slotIndex     = el.find((l) => l.slot_index != null)?.slot_index ?? email.slotIndex
    const exposureIndex = el.find((l) => l.exposure_index != null)?.exposure_index ?? email.exposureIndex

    return {
      session_id:    sessionId,
      attackType:    attackTypeOf(email.id),
      lang:          email.lang,
      exposureIndex,
      slotIndex,
      isTrap:        isTrap ? 1 : 0,
      clicked:       clicked ? 1 : 0,
      fell:          isTrap ? (clicked ? 1 : 0) : null,
      repliedToTrap: isTrap ? (replied ? 1 : 0) : null,
      suspected:     blocked ? 1 : 0,
      ttaMs,
      hesitationCount,
    }
  })
}
