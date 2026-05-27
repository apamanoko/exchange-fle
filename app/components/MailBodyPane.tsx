'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailBodyPane.tsx  —  Phase 3-B
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import DOMPurify from 'dompurify'
import { Mail, Paperclip, MoreHorizontal, FileText } from 'lucide-react'
import { getT, type Lang } from '../lib/i18n'
import ActionButtons from './ActionButtons'

// PROVISIONAL — Phase 1-C で本番型に差し替える
export type ProvisionalAttachment = {
  name: string
  size: string
}

export type ProvisionalEmail = {
  id: string
  fromName: string
  fromEmail: string
  toName: string
  subject: string
  bodyHtml: string
  fullDate: string
  attachments: ProvisionalAttachment[]
  isTrap: boolean
  trapType?: 'T1' | 'T2' | 'T3' | 'T4' | 'T5'
}

// アバター色・イニシャル（MailListItem と共有するユーティリティ）
const AVATAR_COLORS = [
  'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-orange-500',
  'bg-rose-500',  'bg-teal-500',   'bg-pink-500',   'bg-indigo-500',
]

export function avatarColor(name: string): string {
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export function initials(name: string): string {
  const parts = name.trim().split(/[\s　]+/)
  if (parts.length >= 2 && /^[A-Za-z]/.test(name)) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2)
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML サニタイズ + リンク後処理
// ─────────────────────────────────────────────────────────────────────────────

function processBodyHtml(raw: string): string {
  // DOMPurify / DOMParser はブラウザ API — SSR では空文字を返す
  if (typeof window === 'undefined') return ''

  const clean = DOMPurify.sanitize(raw, {
    ADD_ATTR: ['data-display-url'],
  })

  const doc = new DOMParser().parseFromString(clean, 'text/html')

  doc.querySelectorAll('a').forEach((a) => {
    // 実際の遷移先を data-actual-href に退避してからナビゲートを無効化
    const realHref = a.getAttribute('href') ?? ''
    a.setAttribute('data-actual-href', realHref)
    a.setAttribute('href', 'javascript:void(0)')

    // T3: data-display-url → title に移動（偽装URLは表示テキストに残す）
    const displayUrl = a.getAttribute('data-display-url')
    if (displayUrl) {
      a.setAttribute('title', displayUrl)
      a.removeAttribute('data-display-url')
    }
  })

  return doc.body.innerHTML
}

// ─────────────────────────────────────────────────────────────────────────────
// SenderAddress — アドレス部分はホバーで下線表示（T① ドメイン検証誘導）
// ─────────────────────────────────────────────────────────────────────────────

type SenderAddressProps = { name: string; email: string }

function SenderAddress({ name, email }: SenderAddressProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="flex items-baseline flex-wrap gap-x-1">
      <span className="font-semibold text-gray-900 text-sm">{name}</span>
      <span
        className={`text-xs text-gray-400 cursor-default transition-colors ${hovered ? 'underline text-gray-600' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        &lt;{email}&gt;
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AttachmentCard — .pdf.exe はPDFアイコンで偽装（T2）
// ─────────────────────────────────────────────────────────────────────────────

type AttachmentCardProps = { att: ProvisionalAttachment }

function AttachmentCard({ att }: AttachmentCardProps) {
  const parts = att.name.split('.')
  const isPseudoPdf =
    parts.length > 2 &&
    parts[parts.length - 1].toLowerCase() === 'exe' &&
    parts[parts.length - 2].toLowerCase() === 'pdf'

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors max-w-xs">
      {isPseudoPdf ? (
        // T2: PDF アイコンで .exe を偽装
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-7">
          <FileText className="w-5 h-5 text-red-500" />
          <span className="text-[8px] font-bold text-red-500 leading-none tracking-tight">
            PDF
          </span>
        </div>
      ) : (
        <Paperclip className="w-4 h-4 text-gray-500 flex-shrink-0" />
      )}
      <div className="min-w-0">
        {/* 二重拡張子を含む完全なファイル名を表示 */}
        <div className="text-sm text-gray-800 font-medium leading-tight break-all">
          {att.name}
        </div>
        <div className="text-xs text-gray-400">{att.size}</div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BodyContent — HTML レンダリング + リンクホバー追跡（T③）
// ─────────────────────────────────────────────────────────────────────────────

type BodyContentProps = {
  rawHtml: string
  onLinkHover: (url: string | null) => void
}

function BodyContent({ rawHtml, onLinkHover }: BodyContentProps) {
  const [safeHtml, setSafeHtml] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSafeHtml(processBodyHtml(rawHtml))
  }, [rawHtml])

  // イベント委譲: コンテナに一度だけ登録し、内部リンクのホバーを追跡
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onOver = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-actual-href]')
      if (a) onLinkHover(a.dataset.actualHref ?? null)
    }
    const onOut = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-actual-href]')
      if (a) onLinkHover(null)
    }

    container.addEventListener('mouseover', onOver)
    container.addEventListener('mouseout', onOut)
    return () => {
      container.removeEventListener('mouseover', onOver)
      container.removeEventListener('mouseout', onOut)
    }
  }, [onLinkHover])

  return (
    <div
      ref={containerRef}
      className="text-sm text-gray-800 leading-relaxed select-text email-body"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MailBodyPane
// ─────────────────────────────────────────────────────────────────────────────

type MailBodyPaneProps = {
  email: ProvisionalEmail | null
  lang: Lang
  onReply: (emailId: string) => void
  onForward: (emailId: string) => void
  onDelete: (emailId: string) => void
}

export default function MailBodyPane({
  email,
  lang,
  onReply,
  onForward,
  onDelete,
}: MailBodyPaneProps) {
  const t = getT(lang)
  const [hoveredLinkUrl, setHoveredLinkUrl] = useState<string | null>(null)

  const handleLinkHover = useCallback((url: string | null) => {
    setHoveredLinkUrl(url)
  }, [])

  if (!email) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 select-none">
        <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
          <Mail className="w-7 h-7 text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">{t.noEmailSelected}</p>
        <p className="text-xs text-gray-400 mt-1">{t.selectPrompt}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white relative">

      {/* ── ツールバー ── */}
      <div className="flex-shrink-0 flex items-center gap-0.5 px-6 py-2.5 border-b border-gray-100">
        <ActionButtons
          onReply={() => onReply(email.id)}
          onForward={() => onForward(email.id)}
          onDelete={() => onDelete(email.id)}
          t={t}
        />
        <div className="ml-auto">
          <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── スクロール可能なコンテンツ領域 ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 pb-10 max-w-3xl">

          {/* 件名 */}
          <h1 className="text-xl font-semibold text-gray-900 mb-5 leading-snug">
            {email.subject}
          </h1>

          {/* 差出人情報 */}
          <div className="flex items-start gap-3 mb-6">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full ${avatarColor(email.fromName)} flex items-center justify-center text-white text-sm font-semibold select-none`}
            >
              {initials(email.fromName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {/* Phase 3-B: ホバーで下線表示（T① ドメイン検証誘導） */}
                  <SenderAddress name={email.fromName} email={email.fromEmail} />
                </div>
                <span className="flex-shrink-0 text-xs text-gray-400 whitespace-nowrap">
                  {email.fullDate}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {t.to}：<span className="text-gray-700">{email.toName}</span>
              </div>
            </div>
          </div>

          {/* 添付ファイル */}
          {email.attachments.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-gray-500 font-medium mb-2">
                {t.attachmentCount(email.attachments.length)}
              </p>
              <div className="flex flex-wrap gap-2">
                {email.attachments.map((att) => (
                  <AttachmentCard key={att.name} att={att} />
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 mb-6" />

          {/* 本文: HTML レンダリング（Phase 3-B） */}
          <BodyContent rawHtml={email.bodyHtml} onLinkHover={handleLinkHover} />

        </div>
      </div>

      {/* ── ブラウザ風ステータスバー: リンクホバー時に実際のURLを表示（T③） ── */}
      {hoveredLinkUrl && (
        <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-gray-100 border-t border-gray-300 text-xs text-gray-600 truncate z-20 select-none">
          {hoveredLinkUrl}
        </div>
      )}
    </div>
  )
}
