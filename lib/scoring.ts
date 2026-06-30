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

// ─── スコア算出 ────────────────────────────────────────────────────────────────

export function computeScore(
  logs: LogRow[],
  uiLang: Language,
  l1Lang: Language,
): { score: LiteracyScore; trapResults: TrapResult[] } {
  const emails     = getEmailSet(uiLang, l1Lang)
  const trapEmails = emails.filter((e) => e.isTrap)
  const trapIds    = new Set(trapEmails.map((e) => e.id))

  const linkTrapIds = new Set(
    trapEmails.filter((e) => e.traps.includes('link')).map((e) => e.id)
  )
  const extTrapIds = new Set(
    trapEmails.filter((e) => e.traps.includes('extension')).map((e) => e.id)
  )

  const trapLogs = logs.filter((l) => trapIds.has(l.email_id))

  // ── domainVerification（25%）─────────────────────────────────────────────
  const hoverSenderMs = trapLogs
    .filter((l) => l.event_type === 'hover_sender' && l.duration_ms != null)
    .reduce((sum, l) => sum + (l.duration_ms ?? 0), 0)

  const domainThreshold  = 2000 * (trapEmails.length / 4)
  const domainVerification = clamp(linearScore(hoverSenderMs, 0, domainThreshold))

  // ── linkInspection（20%）────────────────────────────────────────────────
  const emailsWithHoverLink = new Set(
    trapLogs
      .filter((l) => l.event_type === 'hover_link' && linkTrapIds.has(l.email_id))
      .map((l) => l.email_id)
  )
  const linkInspection = clamp(
    linkTrapIds.size > 0 ? (emailsWithHoverLink.size / linkTrapIds.size) * 100 : 0
  )

  // ── urgencyResistance（20%）──────────────────────────────────────────────
  // 罠メールの最終 TTA（action_reply / action_delete の duration_ms）の中央値
  const finalTtaByEmail: Record<string, number> = {}
  for (const log of trapLogs) {
    if (
      (log.event_type === 'action_reply' || log.event_type === 'action_delete') &&
      log.duration_ms != null
    ) {
      finalTtaByEmail[log.email_id] = log.duration_ms
    }
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

  // ── hesitationAwareness（15%）────────────────────────────────────────────
  const emailsWithHold = new Set(
    trapLogs.filter((l) => l.event_type === 'action_hold').map((l) => l.email_id)
  )
  const hesitationAwareness = clamp(
    trapEmails.length > 0 ? (emailsWithHold.size / trapEmails.length) * 100 : 0
  )

  // ── overallScore ─────────────────────────────────────────────────────────
  const overallScore = clamp(
    domainVerification  * 0.25 +
    linkInspection      * 0.20 +
    urgencyResistance   * 0.20 +
    extensionAwareness  * 0.10 +
    textVerification    * 0.10 +
    hesitationAwareness * 0.15
  )

  const score: LiteracyScore = {
    domainVerification,
    linkInspection,
    urgencyResistance,
    extensionAwareness,
    textVerification,
    hesitationAwareness,
    overallScore,
  }

  // ── trapResults ───────────────────────────────────────────────────────────
  const trapResults: TrapResult[] = trapEmails.map((email) => {
    const emailLogs       = trapLogs.filter((l) => l.email_id === email.id)
    const hesitationCount = emailLogs.filter((l) => l.event_type === 'action_hold').length

    const finalActionLog = [...emailLogs]
      .reverse()
      .find((l) => l.event_type === 'action_reply' || l.event_type === 'action_delete')

    const finalAction: 'replied' | 'deleted' =
      finalActionLog?.event_type === 'action_delete' ? 'deleted' : 'replied'

    return {
      trapId:          email.id,
      finalAction,
      hesitationCount,
      ttaMs:           finalActionLog?.duration_ms ?? 0,
      fellForTrap:     finalAction === 'replied',
    }
  })

  return { score, trapResults }
}
