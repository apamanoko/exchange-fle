'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ActionButtons.tsx  —  Phase 3-A
//
// 【設計上の重要な決定】
//   返信・転送・削除 の3種のみ実装。
//   「フィッシングとして報告」ボタンは意図的に実装しない。
//   （カバーストーリー維持: 被験者に実験目的を悟らせないための研究設計）
//
// 【トラッキング層との分離】
//   各ボタンの onClick は必ず props 経由で受け取る。
//   Phase 8（トラッキング実装）では MailLayout 側でラップするだけでよい。
// ─────────────────────────────────────────────────────────────────────────────

import { Reply, CornerUpRight, Trash2 } from 'lucide-react'
import type { Translations } from '../lib/i18n'

export type ActionButtonsProps = {
  onReply: () => void
  onForward: () => void
  onDelete: () => void
  t: Translations
}

export default function ActionButtons({
  onReply,
  onForward,
  onDelete,
  t,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={onReply}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors font-medium"
      >
        <Reply className="w-4 h-4" />
        {t.reply}
      </button>

      <button
        onClick={onForward}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors font-medium"
      >
        <CornerUpRight className="w-4 h-4" />
        {t.forward}
      </button>

      <div className="w-px h-4 bg-gray-200 mx-1" aria-hidden />

      <button
        onClick={onDelete}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 rounded hover:bg-red-50 active:bg-red-100 transition-colors font-medium"
      >
        <Trash2 className="w-4 h-4" />
        {t.delete}
      </button>
    </div>
  )
}
