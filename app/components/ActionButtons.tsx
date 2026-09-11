'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ActionButtons.tsx
//
// 3ボタン構成：返信する / 既読にして放置 / ブロック・報告
// フィッシング報告ボタンとは別物。Hawthorne 効果排除のため action_report_phishing 相当は非実装。
// ─────────────────────────────────────────────────────────────────────────────

import { Reply, CheckCheck, ShieldX } from 'lucide-react'
import type { Translations } from '../lib/i18n'

export type ActionButtonsProps = {
  onReply: () => void
  onIgnore: () => void
  onBlock: () => void
  t: Translations
}

export default function ActionButtons({
  onReply,
  onIgnore,
  onBlock,
  t,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">

      {/* 返信する */}
      <button
        onClick={onReply}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium"
      >
        <Reply className="w-4 h-4" />
        {t.actionReply}
      </button>

      {/* 既読にして放置 */}
      <button
        onClick={onIgnore}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors font-medium"
      >
        <CheckCheck className="w-4 h-4" />
        {t.actionIgnore}
      </button>

      {/* ブロック・報告 */}
      <button
        onClick={onBlock}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-red-600 rounded hover:bg-red-700 active:bg-red-800 transition-colors font-medium"
      >
        <ShieldX className="w-4 h-4" />
        {t.actionBlock}
      </button>

    </div>
  )
}
