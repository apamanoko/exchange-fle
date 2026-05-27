'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailSidebar.tsx  —  Phase 3-A
// フォルダ: 受信トレイ / 送信済み / 削除済み の3種
// ─────────────────────────────────────────────────────────────────────────────

import { Inbox, Send, Trash2, PenSquare } from 'lucide-react'
import type { FolderId } from '../store/mailStore'
import type { Translations } from '../lib/i18n'

type FolderItem = {
  id: FolderId
  labelKey: keyof Pick<Translations, 'inbox' | 'sent' | 'deleted'>
  icon: React.ReactNode
  badge: number
}

const FOLDER_DEFS: FolderItem[] = [
  {
    id: 'inbox',
    labelKey: 'inbox',
    icon: <Inbox className="w-4 h-4" />,
    badge: 0,  // MailLayout からリアルタイム値を受け取るので dummy
  },
  {
    id: 'sent',
    labelKey: 'sent',
    icon: <Send className="w-4 h-4" />,
    badge: 0,
  },
  {
    id: 'deleted',
    labelKey: 'deleted',
    icon: <Trash2 className="w-4 h-4" />,
    badge: 0,
  },
]

type MailSidebarProps = {
  selectedFolder: FolderId
  inboxBadge: number      // 未処理件数（受信トレイのバッジ）
  t: Translations
  onFolderSelect: (id: FolderId) => void
}

export default function MailSidebar({
  selectedFolder,
  inboxBadge,
  t,
  onFolderSelect,
}: MailSidebarProps) {
  return (
    <nav className="w-48 flex-shrink-0 flex flex-col bg-white border-r border-gray-200 overflow-y-auto">
      {/* 新規作成ボタン */}
      <div className="px-3 pt-4 pb-3">
        <button className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm">
          <PenSquare className="w-4 h-4" />
          {t.compose}
        </button>
      </div>

      {/* フォルダリスト */}
      <ul className="px-2 space-y-0.5 flex-1">
        {FOLDER_DEFS.map((folder) => {
          const active = selectedFolder === folder.id
          const badge = folder.id === 'inbox' ? inboxBadge : 0

          return (
            <li key={folder.id}>
              <button
                onClick={() => onFolderSelect(folder.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={active ? 'text-blue-600' : 'text-gray-400'}>
                  {folder.icon}
                </span>
                <span className="flex-1 text-left truncate">
                  {t[folder.labelKey]}
                </span>
                {badge > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-semibold min-w-[1.25rem] text-center ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* ストレージ使用量 */}
      <div className="mx-4 mt-4 border-t border-gray-200" />
      <div className="px-5 py-4">
        <div className="text-xs text-gray-400 mb-1.5">{t.storageUsed}</div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-blue-500 rounded-full" />
        </div>
        <div className="text-xs text-gray-400 mt-1">3.2 GB / 10 GB</div>
      </div>
    </nav>
  )
}
