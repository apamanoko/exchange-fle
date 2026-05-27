'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailListItem.tsx  —  Phase 3-A
// ─────────────────────────────────────────────────────────────────────────────

import { Paperclip } from 'lucide-react'
import type { EmailAction } from '../store/mailStore'
import { avatarColor, initials } from './MailBodyPane'

// PROVISIONAL — Phase 1-C で本番型に差し替える
export type ProvisionalListEmail = {
  id: string
  fromName: string
  subject: string
  preview: string
  dateLabel: string
  isRead: boolean
  hasAttachment: boolean
}

type MailListItemProps = {
  email: ProvisionalListEmail
  isSelected: boolean
  processedAction: EmailAction | undefined
  onClick: (id: string) => void
}

export default function MailListItem({
  email,
  isSelected,
  processedAction,
  onClick,
}: MailListItemProps) {
  const isProcessed = processedAction !== undefined

  return (
    <li>
      <button
        onClick={() => onClick(email.id)}
        className={`
          w-full text-left px-4 py-3 transition-colors border-l-2
          ${isSelected
            ? 'bg-blue-50 border-l-blue-600'
            : isProcessed
            ? 'border-l-transparent bg-gray-50/50 hover:bg-gray-100/60'
            : 'border-l-transparent hover:bg-gray-50'}
        `}
      >
        <div className="flex items-start gap-2.5">
          {/* 未読ドット / 処理済みアイコン */}
          <div className="flex-shrink-0 mt-[0.6rem] w-2">
            {!isProcessed && !email.isRead && (
              <div className="w-2 h-2 rounded-full bg-blue-600" />
            )}
          </div>

          {/* アバター */}
          <div
            className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              text-white text-xs font-semibold select-none
              ${avatarColor(email.fromName)}
              ${isProcessed ? 'opacity-40' : ''}
            `}
          >
            {initials(email.fromName)}
          </div>

          {/* テキスト情報 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span
                className={`text-sm truncate ${
                  isProcessed
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

            <div
              className={`text-xs truncate mb-0.5 ${
                isProcessed
                  ? 'text-gray-400'
                  : !email.isRead
                  ? 'font-semibold text-gray-800'
                  : 'text-gray-600'
              }`}
            >
              {email.subject}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 truncate leading-snug">
                {isProcessed
                  ? processedAction === 'replied'   ? '↩ 返信済み'
                  : processedAction === 'forwarded' ? '↪ 転送済み'
                  :                                   '🗑 削除済み'
                  : email.preview}
              </span>
              {email.hasAttachment && !isProcessed && (
                <Paperclip className="flex-shrink-0 w-3 h-3 text-gray-300 ml-auto" />
              )}
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}
