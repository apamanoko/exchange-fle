'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ActionButtons.tsx
//
// 3ボタン構成：返信する / 保留する / 削除・ブロック
// フィッシング報告ボタンは Hawthorne 効果排除のため意図的に非実装。
// ─────────────────────────────────────────────────────────────────────────────

import { Reply, Clock, ShieldX } from 'lucide-react'
import type { Translations } from '../lib/i18n'

export type ActionButtonsProps = {
  onReply: () => void
  onHold: () => void
  onDelete: () => void
  t: Translations
}

export default function ActionButtons({
  onReply,
  onHold,
  onDelete,
  t,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-0.5">

      {/* 返信する */}
      <button
        onClick={onReply}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors font-medium"
      >
        <Reply className="w-4 h-4" />
        {t.actionReply}
      </button>

      {/* 保留する */}
      <button
        onClick={onHold}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-yellow-700 rounded hover:bg-yellow-50 active:bg-yellow-100 transition-colors font-medium"
      >
        <Clock className="w-4 h-4" />
        {t.actionHold}
      </button>

      <div className="w-px h-4 bg-gray-200 mx-1" aria-hidden />

      {/* 削除・ブロック */}
      <button
        onClick={onDelete}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 rounded hover:bg-red-50 active:bg-red-100 transition-colors font-medium"
      >
        <ShieldX className="w-4 h-4" />
        {t.actionDeleteBlock}
      </button>

    </div>
  )
}
