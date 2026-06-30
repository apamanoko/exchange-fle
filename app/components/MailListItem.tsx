'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailListItem.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { Paperclip } from 'lucide-react'
import type { EmailAction } from '../types'
import { avatarColor, initials } from './MailBodyPane'

export type ListEmail = {
  id: string
  fromName: string
  subject: string
  preview: string
  dateLabel: string
  isRead: boolean
  hasAttachment: boolean
}

type MailListItemProps = {
  email: ListEmail
  isSelected: boolean
  processedAction: EmailAction | undefined
  heldLabel: string
  onClick: (id: string) => void
}

export default function MailListItem({
  email,
  isSelected,
  processedAction,
  heldLabel,
  onClick,
}: MailListItemProps) {
  const isReplied = processedAction === 'replied'
  const isHeld    = processedAction === 'held'

  return (
    <li>
      <button
        onClick={() => onClick(email.id)}
        className={`
          w-full text-left px-4 py-3 transition-colors border-l-2
          ${isSelected
            ? 'bg-blue-50 border-l-blue-600'
            : isHeld
            ? 'border-l-yellow-400 bg-yellow-50/40 hover:bg-yellow-50/70'
            : isReplied
            ? 'border-l-transparent bg-gray-50/50 hover:bg-gray-100/60'
            : 'border-l-transparent hover:bg-gray-50'}
        `}
      >
        <div className="flex items-start gap-2.5">
          {/* 未読ドット */}
          <div className="flex-shrink-0 mt-[0.6rem] w-2">
            {!isReplied && !email.isRead && (
              <div className="w-2 h-2 rounded-full bg-blue-600" />
            )}
          </div>

          {/* アバター */}
          <div
            className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              text-white text-xs font-semibold select-none
              ${avatarColor(email.fromName)}
              ${isReplied ? 'opacity-40' : ''}
            `}
          >
            {initials(email.fromName)}
          </div>

          {/* テキスト情報 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span
                className={`text-sm truncate ${
                  isReplied
                    ? 'text-gray-400 font-normal'
                    : !email.isRead
                    ? 'font-semibold text-gray-900'
                    : 'font-medium text-gray-700'
                }`}
              >
                {email.fromName}
              </span>
              <span className="flex-shrink-0 text-xs text-gray-400">
                {email.dateLabel}
              </span>
            </div>

            {/* 件名 + 保留中バッジ */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <div
                className={`text-xs truncate ${
                  isReplied
                    ? 'text-gray-400'
                    : !email.isRead
                    ? 'font-semibold text-gray-800'
                    : 'text-gray-600'
                }`}
              >
                {email.subject}
              </div>
              {isHeld && (
                <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200 leading-none">
                  {heldLabel}
                </span>
              )}
            </div>

            {/* プレビュー */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 truncate leading-snug">
                {isReplied
                  ? '↩ 返信済み'
                  : isHeld
                  ? email.preview
                  : email.preview}
              </span>
              {email.hasAttachment && !isReplied && (
                <Paperclip className="flex-shrink-0 w-3 h-3 text-gray-300 ml-auto" />
              )}
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}
