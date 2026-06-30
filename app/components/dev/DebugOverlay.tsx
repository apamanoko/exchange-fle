'use client'

// ─────────────────────────────────────────────────────────────────────────────
// DebugOverlay.tsx — 開発時のみ表示するトラッキングリアルタイム確認ツール
// process.env.NODE_ENV !== 'development' の場合は何も描画しない
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import type { DebugEvent } from '@/app/hooks/useTracker'
import type { Email } from '@/types'

const IS_DEV = process.env.NODE_ENV === 'development'
const MAX_LOG = 5

type Props = {
  /** useTracker から受け取ったイベント（useEffect で push される） */
  events: DebugEvent[]
  /** 現在開いているメール（trap 情報表示用） */
  currentEmail: Email | null
  /** TTA のポーリング用 getter */
  getElapsedMs: () => number | null
  /** 現在のメールID getter */
  getCurrentEmailId: () => string | null
}

export default function DebugOverlay({
  events,
  currentEmail,
  getElapsedMs,
  getCurrentEmailId,
}: Props) {
  // 開発環境以外は何も描画しない
  if (!IS_DEV) return null

  return <DebugPanel events={events} currentEmail={currentEmail} getElapsedMs={getElapsedMs} getCurrentEmailId={getCurrentEmailId} />
}

// ─── 実体（IS_DEV 確定後にレンダリング）────────────────────────────────────────

function DebugPanel({ events, currentEmail, getElapsedMs, getCurrentEmailId }: Props) {
  const [open, setOpen]         = useState(true)
  const [elapsedMs, setElapsed] = useState<number | null>(null)
  const [flash, setFlash]       = useState<string | null>(null)

  // TTA カウントアップ（1秒ごと）
  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsedMs()), 1000)
    return () => clearInterval(id)
  }, [getElapsedMs])

  // text_select / text_copy のフラッシュ表示
  const latest = events[events.length - 1]
  const latestRef = useCallback(() => {
    if (!latest) return
    if (latest.event_type === 'text_select') {
      setFlash('SELECTION DETECTED')
      setTimeout(() => setFlash(null), 1000)
    } else if (latest.event_type === 'text_copy') {
      setFlash('COPY DETECTED')
      setTimeout(() => setFlash(null), 1000)
    }
  }, [latest])

  useEffect(() => {
    latestRef()
  }, [latestRef])

  const recentEvents = [...events].reverse().slice(0, MAX_LOG)
  const emailId = getCurrentEmailId()
  const isTrap  = currentEmail?.isTrap ?? false

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] w-72 font-mono text-xs text-white"
      style={{ userSelect: 'none' }}
    >
      {/* ヘッダー（クリックで折りたたみ） */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-black/90 px-3 py-1.5 rounded-t border border-white/10 hover:bg-black/80 transition-colors"
      >
        <span className="font-bold text-green-400">🛠 Tracker Debug</span>
        <span className="text-white/50">{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className="bg-black/80 border border-t-0 border-white/10 rounded-b px-3 py-2 space-y-2.5">

          {/* ① TTA カウントアップ */}
          <section>
            <div className="text-white/50 uppercase tracking-wider text-[10px] mb-0.5">TTA</div>
            <div className="text-yellow-300">
              {emailId
                ? <><span className="text-white/60">{emailId}</span>　{elapsedMs != null ? `${elapsedMs} ms` : '—'}</>
                : <span className="text-white/30">no email open</span>}
            </div>
          </section>

          {/* ② フラッシュ表示 */}
          {flash && (
            <div className="bg-orange-500/80 text-white text-center py-0.5 rounded text-[11px] font-bold animate-pulse">
              {flash}
            </div>
          )}

          {/* ③ 直近5件のイベントログ */}
          <section>
            <div className="text-white/50 uppercase tracking-wider text-[10px] mb-0.5">Recent Events</div>
            {recentEvents.length === 0 ? (
              <div className="text-white/30">no events yet</div>
            ) : (
              <ul className="space-y-0.5">
                {recentEvents.map((e, i) => (
                  <li key={i} className="flex gap-1.5 items-baseline">
                    <span className={`flex-shrink-0 ${eventColor(e.event_type)}`}>
                      {e.event_type}
                    </span>
                    {e.duration_ms != null && (
                      <span className="text-white/40">{e.duration_ms}ms</span>
                    )}
                    <span className="text-white/30 truncate">{e.email_id}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ④ 現在メールの trap 情報 */}
          <section>
            <div className="text-white/50 uppercase tracking-wider text-[10px] mb-0.5">Trap Info</div>
            {currentEmail ? (
              <div className={`rounded px-2 py-1 text-[11px] ${isTrap ? 'bg-red-800/70' : 'bg-green-800/70'}`}>
                <div>{isTrap ? '🎣 TRAP' : '✅ NORMAL'}</div>
                {isTrap && currentEmail.traps.length > 0 && (
                  <div className="text-white/70 mt-0.5">
                    {currentEmail.traps.join(', ')}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-white/30">—</div>
            )}
          </section>

        </div>
      )}
    </div>
  )
}

// ─── イベント種別ごとの色 ─────────────────────────────────────────────────────

function eventColor(type: string): string {
  if (type.startsWith('hover_'))      return 'text-blue-300'
  if (type.startsWith('action_'))     return 'text-green-300'
  if (type === 'email_open')          return 'text-purple-300'
  if (type === 'link_click')          return 'text-red-400'
  if (type === 'attachment_open')     return 'text-orange-400'
  if (type === 'text_select' || type === 'text_copy') return 'text-orange-300'
  return 'text-white/60'
}
