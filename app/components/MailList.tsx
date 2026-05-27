'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailList.tsx  —  Phase 3-A
// ─────────────────────────────────────────────────────────────────────────────

import { RefreshCw, ChevronDown, MoreHorizontal } from 'lucide-react'
import type { EmailAction } from '../store/mailStore'
import MailListItem, { type ProvisionalListEmail } from './MailListItem'

type MailListProps = {
  folderLabel: string
  emails: ProvisionalListEmail[]
  selectedId: string | null
  pendingCount: number          // 未処理件数（受信トレイのみ）
  processedMap: Record<string, EmailAction>
  onSelect: (id: string) => void
}

export default function MailList({
  folderLabel,
  emails,
  selectedId,
  pendingCount,
  processedMap,
  onSelect,
}: MailListProps) {
  return (
    <div className="w-72 flex-shrink-0 flex flex-col border-r border-gray-200 overflow-hidden bg-white">

      {/* リストヘッダー */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            {folderLabel}
            <span className="ml-1.5 text-xs font-normal text-gray-400">
              {emails.length}件
            </span>
          </h2>
          {pendingCount > 0 && (
            <p className="text-xs text-blue-600 mt-0.5 font-medium">
              未処理 {pendingCount}/{emails.length}
            </p>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 transition-colors">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ソートバー */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-gray-100 flex items-center gap-3">
        <button className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
          日付
          <ChevronDown className="w-3 h-3" />
        </button>
        <span className="text-gray-200 text-xs select-none">|</span>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          未読のみ
        </button>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          添付あり
        </button>
      </div>

      {/* メール行リスト */}
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {emails.length === 0 ? (
          <li className="flex items-center justify-center h-24 text-xs text-gray-400">
            メールはありません
          </li>
        ) : (
          emails.map((email) => (
            <MailListItem
              key={email.id}
              email={email}
              isSelected={selectedId === email.id}
              processedAction={processedMap[email.id]}
              onClick={onSelect}
            />
          ))
        )}
      </ul>
    </div>
  )
}
