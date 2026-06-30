// ─────────────────────────────────────────────────────────────────────────────
// app/lib/experiment.ts  —  Phase 1-A
// 参加者コード生成 + Google Forms URL ビルダー
// ─────────────────────────────────────────────────────────────────────────────

// Google Forms の事前・事後アンケート設定
export interface FormConfig {
  // 事前アンケートのベース URL（Google Forms の viewform URL）
  pre: string
  // 事前アンケートで参加者コードを受け取るフィールドの entry ID
  // 例: "entry.123456789"
  preEntryId: string
  // 事後アンケートのベース URL
  post: string
  // 事後アンケートで参加者コードを受け取るフィールドの entry ID
  postEntryId: string
}

export interface FormUrls {
  preUrl: string
  postUrl: string
}

/**
 * 参加者コードをプリフィル埋め込みした Google Forms URL を生成する。
 * usp=pp_url は Google Forms のプリフィル URL 共有形式。
 */
export function getFormUrls(participantCode: string, f: FormConfig): FormUrls {
  return {
    preUrl:  `${f.pre}?usp=pp_url&${f.preEntryId}=${encodeURIComponent(participantCode)}`,
    postUrl: `${f.post}?usp=pp_url&${f.postEntryId}=${encodeURIComponent(participantCode)}`,
  }
}

/**
 * EXP-XXXXXX 形式の参加者コードを生成する。
 * 大文字英字 + 数字 6文字のランダム文字列。
 * ブラウザ/Node.js 両環境で動作（crypto.getRandomValues 非依存）。
 */
export function generateParticipantCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const random = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('')
  return `EXP-${random}`
}
