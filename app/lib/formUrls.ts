/**
 * Googleフォーム プリフィルURL生成ユーティリティ
 *
 * 振り分けルール：
 *   ui_lang === 'ja'  → 日本語フォームペア（ドイツ滞在の日本人向け）
 *   ui_lang その他    → 英語フォームペア（日本滞在の留学生向け）
 *
 * entry IDはGoogleフォームの「事前入力付きリンクを取得」で確認済み（2025年確定）
 */

const FORM_BASE = 'https://docs.google.com/forms/d/e'

const FORM_URLS = {
  /** 日本語フォームペア：ドイツ滞在の日本人 */
  ja: {
    pre:         `${FORM_BASE}/1FAIpQLSejpJjAmzrrpAqcljVXdzSAJBVac_O2mcirA7uRvKe1f6rZsA/viewform`,
    post:        `${FORM_BASE}/1FAIpQLScNxnhofGtlXRgDd9t1vGR5Cn1d4pwuAaZmFtJUf5xttvCo6w/viewform`,
    preEntryId:  'entry.319892986',
    postEntryId: 'entry.635950766',
  },
  /** 英語フォームペア：日本滞在の留学生（en/de/zh/ko/it/es 全て共通） */
  en: {
    pre:         `${FORM_BASE}/1FAIpQLSe2N5KdG4G5FtFq8NXNDEuvr_WB8T4BwUa4If92vyQ2xv8wQw/viewform`,
    post:        `${FORM_BASE}/1FAIpQLSdiv2paseFunGmyeilajRiq_czY3gxQc9mh7Y9oCQfsXKiOeA/viewform`,
    preEntryId:  'entry.459914088',
    postEntryId: 'entry.561643019',
  },
} as const

/**
 * participant_code をプリフィルしたフォームURLを返す
 *
 * @param uiLang          被験者のUI言語（sessions.ui_lang）
 * @param participantCode システム生成の識別コード（例: EXP-ABC123）
 * @returns               事前・事後フォームの完成URL
 *
 * @example
 * const { preUrl, postUrl } = getFormUrls('en', 'EXP-ABC123')
 * // → 事前フォームが開いた時点で「Participant Code」欄に EXP-ABC123 が自動入力される
 */
export function getFormUrls(
  uiLang: string,
  participantCode: string
): { preUrl: string; postUrl: string } {
  const f = uiLang === 'ja' ? FORM_URLS.ja : FORM_URLS.en
  return {
    preUrl:  `${f.pre}?usp=pp_url&${f.preEntryId}=${encodeURIComponent(participantCode)}`,
    postUrl: `${f.post}?usp=pp_url&${f.postEntryId}=${encodeURIComponent(participantCode)}`,
  }
}

/**
 * participant_code の生成
 * 形式: EXP-XXXXXX（英大文字 + 数字 6桁）
 * Supabaseの sessions.participant_code に保存し、Google Sheetsとの JOIN キーになる
 */
export function generateParticipantCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const random = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `EXP-${random}`
}