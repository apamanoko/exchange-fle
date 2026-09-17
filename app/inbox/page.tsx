'use client'

import { useState, useCallback, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Mail, Search, Bell, Settings, Loader2, CheckCircle2 } from 'lucide-react'
import { getT, SUPPORTED_LANGS, type Lang } from '../lib/i18n'
import { getEmailSet } from '@/data/emailUtils'
import { useTracker, type DebugEvent } from '../hooks/useTracker'
import { useDevToolsGuard } from '../hooks/useDevToolsGuard'
import type { Email, Language } from '@/types'
import type { FolderId } from '../store/mailStore'
import MailSidebar from '../components/MailSidebar'
import MailList from '../components/MailList'
import MailBodyPane from '../components/MailBodyPane'
import type { ListEmail } from '../components/MailListItem'
import DebugOverlay from '../components/dev/DebugOverlay'

const IS_DEV = process.env.NODE_ENV === 'development'

// ─── 型定義 ──────────────────────────────────────────────────────────────────

/** メールの処理状態 */
type MailStatus = 'unread' | 'read' | 'replied' | 'ignored' | 'blocked'

// EmailAction として MailList/MailListItem に渡せる部分集合
type DisplayAction = 'replied' | 'ignored' | 'blocked'

// ─── ユーティリティ ──────────────────────────────────────────────────────────

function parseLang(raw: string | null, fallback: Lang): Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(raw ?? '')
    ? (raw as Lang)
    : fallback
}

function extractPreview(html: string, maxLen = 80): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text
}

// ─── InboxContent ─────────────────────────────────────────────────────────────

function InboxContent() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  const sessionId = searchParams.get('session_id') ?? ''
  const uiLang    = parseLang(searchParams.get('ui_lang'), 'ja')
  const l1Lang    = parseLang(searchParams.get('l1_lang'), uiLang)
  const t         = getT(uiLang)

  // ── デバッグイベント ────────────────────────────────────────────────────────
  const [debugEvents, setDebugEvents] = useState<DebugEvent[]>([])
  const handleDebugEvent = useCallback((e: DebugEvent) => {
    setDebugEvents((prev) => [...prev.slice(-99), e])
  }, [])

  const tracker = useTracker(sessionId, {
    onDebugEvent: IS_DEV ? handleDebugEvent : undefined,
  })
  useDevToolsGuard(sessionId)

  // ── メールデータ ────────────────────────────────────────────────────────────
  const [emails] = useState<Email[]>(() =>
    getEmailSet(uiLang as Language, l1Lang as Language)
  )

  // メールごとの処理状態
  const [statusMap, setStatusMap]           = useState<Record<string, MailStatus>>({})
  const [selectedId, setSelectedId]         = useState<string | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<FolderId>('inbox')

  // ── 派生値 ──────────────────────────────────────────────────────────────────

  const selectedEmail = useMemo(
    () => emails.find((e) => e.id === selectedId) ?? null,
    [emails, selectedId]
  )

  // 実験終了判定: 全メールが replied か ignored か blocked になった場合
  const allResolved = useMemo(
    () => emails.every((e) => {
      const s = statusMap[e.id] ?? 'unread'
      return s === 'replied' || s === 'ignored' || s === 'blocked'
    }),
    [emails, statusMap]
  )

  // フォルダごとの表示対象
  // inbox: blocked 以外を全て表示（ignored は既読のまま受信トレイに残る）
  const folderEmails = useMemo(() => {
    if (selectedFolder === 'deleted') {
      return emails.filter((e) => statusMap[e.id] === 'blocked')
    }
    return emails.filter((e) => statusMap[e.id] !== 'blocked')
  }, [emails, statusMap, selectedFolder])

  const listEmails: ListEmail[] = useMemo(
    () =>
      folderEmails.map((e) => ({
        id:            e.id,
        fromName:      e.from.display,
        subject:       e.subject,
        preview:       extractPreview(e.bodyHtml),
        dateLabel:     e.date,
        isRead:        (statusMap[e.id] ?? 'unread') !== 'unread',
        hasAttachment: (e.attachments?.length ?? 0) > 0,
      })),
    [folderEmails, statusMap]
  )

  // MailList/MailListItem に渡す表示用マップ
  const displayMap = useMemo(() => {
    const result: Record<string, DisplayAction> = {}
    for (const [id, status] of Object.entries(statusMap)) {
      if (status === 'replied' || status === 'ignored' || status === 'blocked') {
        result[id] = status
      }
    }
    return result
  }, [statusMap])

  // サイドバーバッジ / リストカウンター用: 未確定件数（unread / read）
  const pendingCount = useMemo(
    () =>
      emails.filter((e) => {
        const s = statusMap[e.id] ?? 'unread'
        return s === 'unread' || s === 'read'
      }).length,
    [emails, statusMap]
  )

  const folderLabel =
    selectedFolder === 'inbox'   ? t.inbox   :
    selectedFolder === 'sent'    ? t.sent    :
    t.deleted

  // ── ハンドラ ─────────────────────────────────────────────────────────────────

  /**
   * 次の unread / read メールへ自動遷移。なければ選択解除。
   * reply / ignore / block はすべて終端アクションのため、再訪は発生しない。
   */
  const advanceToNext = useCallback(
    (currentId: string) => {
      const next = emails.find((e) => {
        if (e.id === currentId) return false
        const s = statusMap[e.id] ?? 'unread'
        return s === 'unread' || s === 'read'
      })

      if (next) {
        setSelectedId(next.id)
        setStatusMap((prev) => {
          const s = prev[next.id] ?? 'unread'
          return s === 'unread' ? { ...prev, [next.id]: 'read' } : prev
        })
        tracker.onEmailOpen(next.id, next.lang)
      } else {
        setSelectedId(null)
      }
    },
    [emails, statusMap, tracker]
  )

  const handleSelect = useCallback(
    (id: string) => {
      const email = emails.find((e) => e.id === id)
      if (!email) return
      setSelectedId(id)
      // unread → read。replied / ignored / blocked はステータスを変えない
      setStatusMap((prev) => {
        const s = prev[id] ?? 'unread'
        return s === 'unread' ? { ...prev, [id]: 'read' } : prev
      })
      tracker.onEmailOpen(email.id, email.lang)
    },
    [emails, tracker]
  )

  const handleReply = useCallback(
    (emailId: string) => {
      tracker.onAction('action_reply')
      setStatusMap((prev) => ({ ...prev, [emailId]: 'replied' }))
      advanceToNext(emailId)
    },
    [tracker, advanceToNext]
  )

  /**
   * 既読にして放置: status を 'ignored' にし次のメールへ。終端アクション（再訪なし）。
   */
  const handleIgnore = useCallback(
    (emailId: string) => {
      tracker.onAction('action_ignore')
      setStatusMap((prev) => ({ ...prev, [emailId]: 'ignored' }))
      advanceToNext(emailId)
    },
    [tracker, advanceToNext]
  )

  const handleBlock = useCallback(
    (emailId: string) => {
      tracker.onAction('action_block')
      setStatusMap((prev) => ({ ...prev, [emailId]: 'blocked' }))
      if (selectedId === emailId) advanceToNext(emailId)
    },
    [tracker, advanceToNext, selectedId]
  )

  const handleFinish = useCallback(() => {
    router.push(`/result?session_id=${sessionId}&ui_lang=${uiLang}`)
  }, [router, sessionId, uiLang])

  // ── レンダリング ──────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full overflow-hidden select-none bg-white">

      {/* ── ヘッダー ── */}
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
              className="w-full pl-9 pr-4 h-8 text-sm bg-gray-100 rounded-full border-0 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors cursor-text"
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
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none hover:opacity-90 transition-opacity">
              TA
            </div>
          </div>
        </div>
      </header>

      {/* ── 全メール解決バナー ── */}
      {allResolved && (
        <div className="flex-shrink-0 flex items-center justify-between gap-4 px-4 py-2 bg-green-50 border-b border-green-200">
          <div className="flex items-center gap-2 text-green-800 text-sm">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>全てのメールへの対応が完了しました。</span>
          </div>
          <button
            onClick={handleFinish}
            className="flex-shrink-0 px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 active:bg-green-800 transition-colors"
          >
            実験を終了する →
          </button>
        </div>
      )}

      {/* ── 3ペイン本体 ── */}
      <div className="flex flex-1 overflow-hidden">
        <MailSidebar
          selectedFolder={selectedFolder}
          inboxBadge={pendingCount}
          t={t}
          onFolderSelect={setSelectedFolder}
        />

        <MailList
          folderLabel={folderLabel}
          emails={listEmails}
          selectedId={selectedId}
          pendingCount={selectedFolder === 'inbox' ? pendingCount : 0}
          processedMap={displayMap}
          onSelect={handleSelect}
        />

        <MailBodyPane
          email={selectedEmail}
          lang={uiLang}
          tracker={tracker}
          sessionId={sessionId}
          onReply={handleReply}
          onIgnore={handleIgnore}
          onBlock={handleBlock}
        />
      </div>

      {/* 開発環境のみ: トラッキングリアルタイム確認パネル */}
      <DebugOverlay
        events={debugEvents}
        currentEmail={selectedEmail}
        getElapsedMs={tracker.getElapsedMs}
        getCurrentEmailId={tracker.getCurrentEmailId}
      />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function InboxPage() {
  return (
    <div className="h-screen">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        }
      >
        <InboxContent />
      </Suspense>
    </div>
  )
}
