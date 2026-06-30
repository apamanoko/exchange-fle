'use client'

import { useRef, useEffect, useCallback } from 'react'
import type { Language, EventType, ExperimentLogInsert } from '@/types'
import { supabase } from '@/app/lib/supabase'

// ─── 定数 ────────────────────────────────────────────────────────────────────

const HOVER_NOISE_THRESHOLD_MS = 250
const DEBOUNCE_MS = 500
const IS_DEV = process.env.NODE_ENV === 'development'

// ─── デバッグイベント型（DebugOverlay に渡す） ────────────────────────────────

export type DebugEvent = {
  event_type: EventType
  email_id: string
  duration_ms: number | null
  ts: number   // performance.now() 時刻
}

// ─── デバッグログ ─────────────────────────────────────────────────────────────

function devLog(event: string, detail?: Record<string, unknown>) {
  if (IS_DEV) console.log('[tracker]', event, detail ?? '')
}

// ─── フック ───────────────────────────────────────────────────────────────────

export type UseTrackerOptions = {
  /** development 環境でのみ渡す。イベント発火ごとに呼ばれる */
  onDebugEvent?: (e: DebugEvent) => void
}

export function useTracker(sessionId: string, options?: UseTrackerOptions) {
  const onDebugEvent = options?.onDebugEvent

  // 現在開封中のメール情報
  const currentEmailId   = useRef<string | null>(null)
  const currentEmailLang = useRef<string>('ja')
  const openedAt         = useRef<number | null>(null)

  // Page Visibility: タブ非アクティブ時間の累積
  const hiddenAt       = useRef<number | null>(null)
  const totalHiddenMs  = useRef<number>(0)

  // ホバー計測: target → 開始時刻
  const hoverStartMap = useRef<Map<string, number>>(new Map())

  // バッチ送信キュー
  const queue         = useRef<ExperimentLogInsert[]>([])
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // onDebugEvent を ref で保持（stale closure 回避）
  const onDebugRef = useRef(onDebugEvent)
  onDebugRef.current = onDebugEvent

  // ─── キューへの追加 ────────────────────────────────────────────────────────

  const enqueue = useCallback((entry: ExperimentLogInsert) => {
    queue.current.push(entry)
    devLog(entry.event_type, { email_id: entry.email_id, duration_ms: entry.duration_ms })

    // DebugOverlay へ通知
    if (IS_DEV && onDebugRef.current) {
      onDebugRef.current({
        event_type:  entry.event_type,
        email_id:    entry.email_id,
        duration_ms: entry.duration_ms ?? null,
        ts:          performance.now(),
      })
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => flushQueue(), DEBOUNCE_MS)
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Supabase バッチ INSERT ────────────────────────────────────────────────

  const flushQueue = useCallback(async () => {
    if (queue.current.length === 0) return
    const batch = queue.current.splice(0)
    try {
      const { error } = await supabase.from('experiment_logs').insert(batch)
      if (error) throw error
    } catch (err) {
      console.error('[tracker] flush error:', err)
      queue.current.unshift(...batch)
    }
  }, [])

  // ─── beforeunload: navigator.sendBeacon で残留キューを送信 ────────────────

  useEffect(() => {
    const handleUnload = () => {
      if (queue.current.length === 0) return
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/experiment_logs`
      navigator.sendBeacon(url, new Blob([JSON.stringify(queue.current)], { type: 'application/json' }))
      queue.current = []
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  // ─── Page Visibility API ──────────────────────────────────────────────────

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        hiddenAt.current = performance.now()
        enqueue(makeEntry('tab_hidden'))
      } else {
        if (hiddenAt.current !== null) {
          totalHiddenMs.current += performance.now() - hiddenAt.current
          hiddenAt.current = null
        }
        enqueue(makeEntry('tab_visible'))
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [enqueue])

  // ─── テキスト選択・コピー ─────────────────────────────────────────────────

  useEffect(() => {
    const handleSelect = () => {
      if (!currentEmailId.current) return
      const sel = window.getSelection()?.toString() ?? ''
      if (sel.length === 0) return
      try { enqueue(makeEntry('text_select')) } catch (e) { console.error('[tracker] text_select', e) }
    }
    const handleCopy = () => {
      if (!currentEmailId.current) return
      try {
        const value = window.getSelection()?.toString() ?? null
        enqueue(makeEntry('text_copy', { value }))
      } catch (e) { console.error('[tracker] text_copy', e) }
    }
    document.addEventListener('selectionchange', handleSelect)
    document.addEventListener('copy', handleCopy)
    return () => {
      document.removeEventListener('selectionchange', handleSelect)
      document.removeEventListener('copy', handleCopy)
    }
  }, [enqueue])

  // ─── ヘルパー ─────────────────────────────────────────────────────────────

  function makeEntry(
    event_type: EventType,
    extra?: { duration_ms?: number | null; value?: string | null },
  ): ExperimentLogInsert {
    return {
      session_id:  sessionId,
      email_id:    currentEmailId.current ?? '',
      email_lang:  currentEmailLang.current,
      event_type,
      duration_ms: extra?.duration_ms ?? null,
      value:       extra?.value ?? null,
    }
  }

  // ─── 公開インターフェース ─────────────────────────────────────────────────

  const onEmailOpen = useCallback((emailId: string, emailLang: Language) => {
    try {
      currentEmailId.current   = emailId
      currentEmailLang.current = emailLang
      openedAt.current         = performance.now()
      totalHiddenMs.current    = 0
      hoverStartMap.current.clear()
      enqueue({ session_id: sessionId, email_id: emailId, email_lang: emailLang, event_type: 'email_open', duration_ms: null, value: null })
    } catch (e) { console.error('[tracker] onEmailOpen', e) }
  }, [sessionId, enqueue])

  const onHoverStart = useCallback((target: string) => {
    hoverStartMap.current.set(target, performance.now())
  }, [])

  const onHoverEnd = useCallback((target: string, eventType: EventType) => {
    try {
      const startedAt = hoverStartMap.current.get(target)
      if (startedAt === undefined) return
      hoverStartMap.current.delete(target)
      const duration_ms = Math.round(performance.now() - startedAt)
      if (duration_ms < HOVER_NOISE_THRESHOLD_MS) return
      enqueue(makeEntry(eventType, { duration_ms }))
    } catch (e) { console.error('[tracker] onHoverEnd', e) }
  }, [enqueue])

  const onAction = useCallback(
    (actionType: 'action_reply' | 'action_hold' | 'action_delete') => {
      try {
        let tta: number | null = null
        if (openedAt.current !== null) {
          tta = Math.round(performance.now() - openedAt.current - totalHiddenMs.current)
        }
        enqueue(makeEntry(actionType, { duration_ms: tta }))
      } catch (e) { console.error('[tracker] onAction', e) }
    },
    [enqueue],
  )

  const onLinkClick = useCallback((displayUrl: string) => {
    try { enqueue(makeEntry('link_click', { value: displayUrl })) }
    catch (e) { console.error('[tracker] onLinkClick', e) }
  }, [enqueue])

  const onAttachmentOpen = useCallback(() => {
    try { enqueue(makeEntry('attachment_open')) }
    catch (e) { console.error('[tracker] onAttachmentOpen', e) }
  }, [enqueue])

  /** 現在のメール開封からの経過ms（TTA計算用。DebugOverlay からポーリングで使用） */
  const getElapsedMs = useCallback((): number | null => {
    if (openedAt.current === null) return null
    return Math.round(performance.now() - openedAt.current - totalHiddenMs.current)
  }, [])

  /** 現在開封中のメールID（DebugOverlay 表示用） */
  const getCurrentEmailId = useCallback((): string | null => {
    return currentEmailId.current
  }, [])

  return {
    onEmailOpen,
    onHoverStart,
    onHoverEnd,
    onAction,
    onLinkClick,
    onAttachmentOpen,
    getElapsedMs,
    getCurrentEmailId,
  }
}
