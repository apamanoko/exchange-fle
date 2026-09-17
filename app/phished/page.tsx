'use client'

// ─────────────────────────────────────────────────────────────────────────────
// app/phished/page.tsx
// フィッシング罠のリンク／添付ファイルを開いた被験者が到達する警告ページ。
// 第1段階（3秒）: 本物の被害画面のように見せて実験のリアリティを高める
// 第2段階（3秒後）: フェードでシミュレーションである旨の教育的な説明に切り替える
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShieldAlert, ShieldCheck, Loader2, X, FileWarning } from 'lucide-react'
import { supabase } from '@/app/lib/supabase'
import { getT, type Lang } from '@/app/lib/i18n'
import type { EventType } from '@/types'

type PhishType = 'link' | 'attachment'

function parseType(raw: string | null): PhishType {
  return raw === 'attachment' ? 'attachment' : 'link'
}

function parseLang(raw: string | null): Lang {
  const supported: Lang[] = ['ja', 'en', 'de', 'zh', 'ko', 'it', 'vi', 'es', 'pl', 'no', 'fi']
  return supported.includes(raw as Lang) ? (raw as Lang) : 'ja'
}

// ─── 第1段階: 本物のフィッシング被害画面を模した警告 ─────────────────────────

function ShockStage({ type, lang }: { type: PhishType; lang: Lang }) {
  const t = getT(lang)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center select-none">
      <ShieldAlert className="w-20 h-20 text-red-600 mb-6 animate-pulse" />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-wide mb-3">
        {t.phishedShockTitle}
      </h1>

      {type === 'link' ? (
        <>
          <p className="text-sm text-red-200 mb-1">{t.phishedShockLinkLine1}</p>
          <p className="text-xs text-gray-400 mb-8">{t.phishedShockLinkLine2}</p>
        </>
      ) : (
        <>
          <p className="text-sm text-red-200 mb-1">{t.phishedShockAttachmentLine1}</p>
          <p className="text-xs text-gray-400 mb-8">{t.phishedShockAttachmentLine2}</p>
        </>
      )}

      {type === 'attachment' && (
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-red-600"
            style={{ width: `${progress}%`, transition: 'width 2900ms linear' }}
          />
        </div>
      )}

      <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
    </div>
  )
}

// ─── 第2段階: 実験の説明（教育的トーン） ──────────────────────────────────────

function RevealStage({ type, lang, onClose }: { type: PhishType; lang: Lang; onClose: () => void }) {
  const t = getT(lang)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <div className="max-w-md w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-5">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-4">
          {t.phishedTitle}
        </h1>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-left flex gap-2.5">
          <FileWarning className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            {type === 'link' ? t.phishedExplainLink : t.phishedExplainAttachment}
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          {t.phishedRecordedNote}
        </p>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 active:bg-black transition-colors"
        >
          <X className="w-4 h-4" />
          {t.closeTab}
        </button>
      </div>
    </div>
  )
}

// ─── PhishedContent ───────────────────────────────────────────────────────────

function PhishedContent() {
  const searchParams = useSearchParams()
  const type      = parseType(searchParams.get('type'))
  const lang      = parseLang(searchParams.get('ui_lang'))
  const sessionId = searchParams.get('session_id')
  const emailId   = searchParams.get('email_id')

  const [revealed, setRevealed] = useState(false)

  // 3秒後に第2段階（説明画面）へ自動的に切り替える
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // トラッキング: session_id / email_id がある場合のみ記録する
  useEffect(() => {
    if (!sessionId || !emailId) return
    const eventType: EventType = type === 'attachment' ? 'attachment_open' : 'link_click'
    const emailLang = emailId.split('-').pop() || 'ja'

    supabase
      .from('experiment_logs')
      .insert({
        session_id:  sessionId,
        email_id:    emailId,
        email_lang:  emailLang,
        event_type:  eventType,
        duration_ms: null,
        value:       type,
      })
      .then(({ error }) => {
        if (error) console.error('[phished] tracking insert failed:', error)
      })
  }, [sessionId, emailId, type])

  const handleClose = useCallback(() => {
    window.close()
  }, [])

  return (
    <div className="relative">
      <div
        className="fixed inset-0 z-50"
        style={{
          opacity:       revealed ? 0 : 1,
          pointerEvents: revealed ? 'none' : 'auto',
          transition:    'opacity 0.7s ease',
        }}
      >
        <ShockStage type={type} lang={lang} />
      </div>

      <div style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <RevealStage type={type} lang={lang} onClose={handleClose} />
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PhishedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      }
    >
      <PhishedContent />
    </Suspense>
  )
}
