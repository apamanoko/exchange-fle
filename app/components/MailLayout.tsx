'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailLayout.tsx  —  レガシーラッパー（旧 app/page.tsx 用）
// inbox/page.tsx への移行後はこのファイルは使用されない。
// 型エラー防止のため最小構成に置き換え済み。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react'
import { Mail, Search, Bell, Settings } from 'lucide-react'
import { getT, type Lang } from '../lib/i18n'
import { useMailStore } from '../store/mailStore'
import type { FolderId, EmailAction } from '../store/mailStore'
import type { Email } from '@/types'
import MailSidebar from './MailSidebar'
import MailList from './MailList'
import MailBodyPane from './MailBodyPane'
import type { ListEmail } from './MailListItem'

type MailLayoutProps = {
  lang?: Lang
}

export default function MailLayout({ lang = 'ja' }: MailLayoutProps) {
  const t = getT(lang)

  const selectedFolder    = useMailStore((s) => s.selectedFolder)
  const selectedId        = useMailStore((s) => s.selectedId)
  const pendingIds        = useMailStore((s) => s.pendingIds)
  const processedMap      = useMailStore((s) => s.processedMap)
  const setSelectedFolder = useMailStore((s) => s.setSelectedFolder)
  const selectEmail       = useMailStore((s) => s.selectEmail)
  const initPending       = useMailStore((s) => s.initPending)
  const processEmail      = useMailStore((s) => s.processEmail)

  useEffect(() => {
    initPending([])
  }, [initPending])

  const handleReply  = (id: string) => processEmail(id, 'replied')
  const handleIgnore = (id: string) => processEmail(id, 'ignored')
  const handleBlock  = (id: string) => processEmail(id, 'blocked')

  const listEmails: ListEmail[] = []
  const selectedEmail: Email | null = null

  const folderLabel =
    selectedFolder === 'inbox'  ? t.inbox  :
    selectedFolder === 'sent'   ? t.sent   :
    t.deleted

  return (
    <div className="flex flex-col h-full overflow-hidden select-none bg-white">
      <header className="h-12 flex-shrink-0 flex items-center px-4 gap-4 border-b border-gray-200 bg-white shadow-sm z-10">
        <div className="flex items-center gap-2.5 w-44 flex-shrink-0">
          <div className="w-7 h-7 rounded flex items-center justify-center bg-blue-600 flex-shrink-0">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800 whitespace-nowrap truncate">
            {t.appTitle}
          </span>
        </div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="メールを検索..."
              readOnly
              className="w-full pl-9 pr-4 h-8 text-sm bg-gray-100 rounded-full border-0 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <div className="ml-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none">
              TA
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <MailSidebar
          selectedFolder={selectedFolder}
          inboxBadge={pendingIds.length}
          t={t}
          onFolderSelect={setSelectedFolder}
        />
        <MailList
          folderLabel={folderLabel}
          emails={listEmails}
          selectedId={selectedId}
          pendingCount={0}
          processedMap={processedMap as Record<string, EmailAction>}
          onSelect={selectEmail}
        />
        <MailBodyPane
          email={selectedEmail}
          lang={lang}
          onReply={handleReply}
          onIgnore={handleIgnore}
          onBlock={handleBlock}
        />
      </div>
    </div>
  )
}
