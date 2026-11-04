'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailBodyPane.tsx  —  Phase 3-B + tracker integration
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import DOMPurify from 'dompurify'
import { Mail, Paperclip, MoreHorizontal, FileText } from 'lucide-react'
import { getT, type Lang } from '../lib/i18n'
import type { Email, Attachment, EventType, Language } from '@/types'
import { renderDateTokens, formatEmailHeaderDate } from '@/data/emailUtils'
import ActionButtons from './ActionButtons'

// ─── トラッカーハンドラ型 ─────────────────────────────────────────────────────

export type TrackerHandlers = {
  onHoverStart: (target: string) => void
  onHoverEnd: (target: string, eventType: EventType) => void
  onLinkClick: (displayUrl: string) => void
  onAttachmentOpen: () => void
}

// ─── アバター色・イニシャル（MailListItem と共有）────────────────────────────

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

// ─── HTML サニタイズ + リンク後処理（data-link-id を付与）────────────────────

function processBodyHtml(raw: string): string {
  if (typeof window === 'undefined') return ''

  const clean = DOMPurify.sanitize(raw, {
    ADD_ATTR: ['data-display-url', 'data-phished-url'],
  })

  const doc = new DOMParser().parseFromString(clean, 'text/html')

  let linkIdx = 0
  doc.querySelectorAll('a').forEach((a) => {
    const displayUrl  = a.getAttribute('data-display-url')
    const originalHref = a.getAttribute('href') ?? ''
    // T3: data-display-url があればそれを status bar に表示（偽装URL検出ポイント）
    a.setAttribute('data-actual-href', displayUrl ?? originalHref)
    a.setAttribute('href', 'javascript:void(0)')
    a.setAttribute('data-link-id', `link-${linkIdx++}`)
    if (displayUrl) a.removeAttribute('data-display-url')
  })

  return doc.body.innerHTML
}

// ─── SenderAddress ────────────────────────────────────────────────────────────

type SenderAddressProps = {
  name: string
  email: string
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

function SenderAddress({ name, email, onHoverStart, onHoverEnd }: SenderAddressProps) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
    onHoverStart?.()
  }
  const handleLeave = () => {
    setHovered(false)
    onHoverEnd?.()
  }

  return (
    <div className="flex items-baseline flex-wrap gap-x-1">
      <span className="font-semibold text-gray-900 text-sm">{name}</span>
      <span
        className={`text-xs text-gray-400 cursor-default transition-colors ${hovered ? 'underline text-gray-600' : ''}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        &lt;{email}&gt;
      </span>
    </div>
  )
}

// ─── AttachmentCard ────────────────────────────────────────────────────────────

type AttachmentCardProps = {
  att: Attachment
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onAttachmentOpen?: (isTrapped: boolean) => void
}

/** ファイルサイズの表示（KB / MB） */
function formatFileSize(sizeKB: number): string {
  return sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`
}

/**
 * 長いファイル名は中ほどを「…」で省略する。末尾の拡張子は必ず残す。
 * 例: verylongname.pdf.exe → verylon…me.pdf.exe（.exe は常に見える）
 */
function middleTruncate(name: string, max = 34): string {
  if (name.length <= max) return name
  const dot = name.lastIndexOf('.')
  const ext = dot > 0 ? name.slice(dot) : ''
  const base = dot > 0 ? name.slice(0, dot) : name
  const keep = Math.max(8, max - ext.length - 1)
  const head = Math.ceil(keep * 0.6)
  const tail = Math.max(3, keep - head)
  return `${base.slice(0, head)}…${base.slice(-tail)}${ext}`
}

const WORD_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

function AttachmentCard({ att, onHoverStart, onHoverEnd, onAttachmentOpen }: AttachmentCardProps) {
  // アイコンは「見かけ上の種類」= mimeType で選ぶ。二重拡張子（.pdf.exe）でも mimeType は
  // 見かけ上の種類（例 application/pdf）のままなので、そのアイコンが維持され偽装が再現される。
  // 実際の拡張子はファイル名の末尾でだけ分かる。
  const kind: 'pdf' | 'word' | 'other' =
    att.mimeType === 'application/pdf' ? 'pdf' :
    att.mimeType === WORD_MIME         ? 'word' :
    'other'

  return (
    <div
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors max-w-sm"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={() => onAttachmentOpen?.(att.isTrapped)}
    >
      {kind === 'pdf' ? (
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-7">
          <FileText className="w-5 h-5 text-red-500" />
          <span className="text-[8px] font-bold text-red-500 leading-none tracking-tight">PDF</span>
        </div>
      ) : kind === 'word' ? (
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-7">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-[8px] font-bold text-blue-600 leading-none tracking-tight">W</span>
        </div>
      ) : (
        <Paperclip className="w-4 h-4 text-gray-500 flex-shrink-0" />
      )}
      <div className="min-w-0 flex flex-col">
        {/* 実ファイル名（拡張子込みすべて）を表示。中略しても末尾拡張子は残す */}
        <div className="text-sm text-gray-800 font-medium leading-tight whitespace-nowrap" title={att.name}>
          {middleTruncate(att.name)}
        </div>
        <div className="text-xs text-gray-400 leading-tight mt-0.5">{formatFileSize(att.sizeKB)}</div>
      </div>
    </div>
  )
}

// ─── BodyContent ──────────────────────────────────────────────────────────────

type BodyContentProps = {
  rawHtml: string
  onLinkHover: (url: string | null) => void
  onLinkHoverStart?: (linkId: string) => void
  onLinkHoverEnd?: (linkId: string) => void
  onLinkClick?: (displayUrl: string, isPhished: boolean) => void
}

function BodyContent({
  rawHtml,
  onLinkHover,
  onLinkHoverStart,
  onLinkHoverEnd,
  onLinkClick,
}: BodyContentProps) {
  const [safeHtml, setSafeHtml] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSafeHtml(processBodyHtml(rawHtml))
  }, [rawHtml])

  // イベント委譲: コンテナに一度だけ登録
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onOver = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-actual-href]')
      if (!a) return
      onLinkHover(a.dataset.actualHref ?? null)
      const linkId = a.dataset.linkId
      if (linkId) onLinkHoverStart?.(linkId)
    }
    const onOut = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-actual-href]')
      if (!a) return
      onLinkHover(null)
      const linkId = a.dataset.linkId
      if (linkId) onLinkHoverEnd?.(linkId)
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-actual-href]')
      if (!a) return
      e.preventDefault()
      // ① data-phished-url あり（罠メールのリンク）→ /phished へ遷移しログを記録
      // ② data-phished-url なし（通常メールのリンク）→ /safe へ遷移（ログは記録しない）
      const displayUrl = a.dataset.actualHref ?? ''
      onLinkClick?.(displayUrl, a.dataset.phishedUrl != null)
    }

    container.addEventListener('mouseover', onOver)
    container.addEventListener('mouseout', onOut)
    container.addEventListener('click', onClick)
    return () => {
      container.removeEventListener('mouseover', onOver)
      container.removeEventListener('mouseout', onOut)
      container.removeEventListener('click', onClick)
    }
  }, [onLinkHover, onLinkHoverStart, onLinkHoverEnd, onLinkClick])

  return (
    <div
      ref={containerRef}
      className="text-sm text-gray-800 leading-relaxed select-text email-body"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}

// ─── MailBodyPane ─────────────────────────────────────────────────────────────

type MailBodyPaneProps = {
  email: Email | null
  lang: Lang
  /** 日付トークン展開の基準日（参加者のセッション開始日） */
  baseDate: Date
  tracker?: TrackerHandlers
  sessionId?: string
  /** 練習モード: ツールバー非表示・リンク/添付クリックは無効（遷移もログもしない） */
  practiceMode?: boolean
  onReply: (emailId: string) => void
  onIgnore: (emailId: string) => void
  onBlock: (emailId: string) => void
}

export default function MailBodyPane({
  email,
  lang,
  baseDate,
  tracker,
  sessionId,
  practiceMode = false,
  onReply,
  onIgnore,
  onBlock,
}: MailBodyPaneProps) {
  const t = getT(lang)
  const [hoveredLinkUrl, setHoveredLinkUrl] = useState<string | null>(null)

  const handleLinkHover = useCallback((url: string | null) => {
    setHoveredLinkUrl(url)
  }, [])

  const handleLinkHoverStart = useCallback((linkId: string) => {
    tracker?.onHoverStart(`link_${linkId}`)
  }, [tracker])

  const handleLinkHoverEnd = useCallback((linkId: string) => {
    tracker?.onHoverEnd(`link_${linkId}`, 'hover_link')
  }, [tracker])

  // 共通: /phished・/safe へ渡すクエリ
  const navQuery = useCallback((type: 'link' | 'attachment') =>
    `type=${type}&session_id=${encodeURIComponent(sessionId ?? '')}&email_id=${encodeURIComponent(email?.id ?? '')}&ui_lang=${encodeURIComponent(lang)}`,
  [sessionId, email, lang])

  // リンククリック:
  //  ① 罠メールのリンク（isPhished）→ /phished を新しいタブで開く
  //  ② 通常メールのリンク           → /safe を新しいタブで開く
  // いずれも link_click を記録する（練習モードのみ記録しない）。
  const handleLinkClick = useCallback((displayUrl: string, isPhished: boolean) => {
    if (!practiceMode) tracker?.onLinkClick(displayUrl)
    if (isPhished) {
      if (email && sessionId) window.open(`/phished?${navQuery('link')}`, '_blank')
    } else {
      window.open(`/safe?${navQuery('link')}`, '_blank')
    }
  }, [practiceMode, tracker, sessionId, email, navQuery])

  // 添付クリック:
  //  ① 罠メールの添付（isTrapped）→ /phished?type=attachment
  //  ② 通常メールの添付           → /safe?type=attachment（無害な説明ページ）
  // いずれも attachment_open を記録する（練習モードのみ記録しない）。
  const handleAttachmentOpen = useCallback((isTrapped: boolean) => {
    if (!practiceMode) tracker?.onAttachmentOpen()
    if (isTrapped) {
      if (email && sessionId) window.open(`/phished?${navQuery('attachment')}`, '_blank')
    } else {
      window.open(`/safe?${navQuery('attachment')}`, '_blank')
    }
  }, [practiceMode, tracker, sessionId, email, navQuery])

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

      {/* ── ツールバー（練習モードでは非表示）── */}
      {!practiceMode && (
        <div className="flex-shrink-0 flex items-center gap-0.5 px-6 py-2.5 border-b border-gray-100">
          <ActionButtons
            onReply={() => onReply(email.id)}
            onIgnore={() => onIgnore(email.id)}
            onBlock={() => onBlock(email.id)}
            t={t}
          />
          <div className="ml-auto">
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── スクロール可能なコンテンツ領域 ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 pb-10 max-w-3xl">

          {/* 件名（日付トークンを展開） */}
          <h1 className="text-xl font-semibold text-gray-900 mb-5 leading-snug">
            {renderDateTokens(email.subject, lang as Language, baseDate)}
          </h1>

          {/* 差出人情報 */}
          <div className="flex items-start gap-3 mb-6">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full ${avatarColor(email.from.display)} flex items-center justify-center text-white text-sm font-semibold select-none`}
            >
              {initials(email.from.display)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <SenderAddress
                    name={email.from.display}
                    email={email.from.address}
                    onHoverStart={() => tracker?.onHoverStart('sender')}
                    onHoverEnd={() => tracker?.onHoverEnd('sender', 'hover_sender')}
                  />
                </div>
                <span className="flex-shrink-0 text-xs text-gray-400 whitespace-nowrap">
                  {formatEmailHeaderDate(email, lang as Language, baseDate)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {t.to}：
                <span className="text-gray-700">
                  {email.to.display} &lt;{email.to.address}&gt;
                </span>
              </div>
            </div>
          </div>

          {/* 添付ファイル */}
          {(email.attachments?.length ?? 0) > 0 && (
            <div className="mb-6">
              <p className="text-xs text-gray-500 font-medium mb-2">
                {t.attachmentCount(email.attachments!.length)}
              </p>
              <div className="flex flex-wrap gap-2">
                {email.attachments!.map((att) => (
                  <AttachmentCard
                    key={att.name}
                    att={att}
                    onHoverStart={() => tracker?.onHoverStart('attachment')}
                    onHoverEnd={() => tracker?.onHoverEnd('attachment', 'hover_attachment')}
                    onAttachmentOpen={handleAttachmentOpen}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 mb-6" />

          {/* 本文（日付トークンを展開） */}
          <BodyContent
            rawHtml={renderDateTokens(email.bodyHtml, lang as Language, baseDate)}
            onLinkHover={handleLinkHover}
            onLinkHoverStart={handleLinkHoverStart}
            onLinkHoverEnd={handleLinkHoverEnd}
            onLinkClick={handleLinkClick}
          />

        </div>
      </div>

      {/* ── ブラウザ風ステータスバー（T3: リンクホバーで実URLを表示）── */}
      {hoveredLinkUrl && (
        <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-gray-100 border-t border-gray-300 text-xs text-gray-600 truncate z-20 select-none">
          {hoveredLinkUrl}
        </div>
      )}
    </div>
  )
}
