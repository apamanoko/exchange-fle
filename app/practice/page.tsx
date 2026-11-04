'use client'

// ─────────────────────────────────────────────────────────────────────────────
// app/practice/page.tsx
// 本番16通の前に表示する「練習メール」画面（採点対象外・ログ記録なし）。
// 差出人/リンク/添付の確認方法を試してもらい、「実験を始める」で /inbox に進む。
// ─────────────────────────────────────────────────────────────────────────────

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, Info, ArrowRight } from 'lucide-react'
import { SUPPORTED_LANGS, type Lang } from '../lib/i18n'
import { getPracticeContent } from '@/data/practiceEmail'
import type { Language } from '@/types'
import MailBodyPane from '../components/MailBodyPane'

function parseLang(raw: string | null, fallback: Lang): Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(raw ?? '')
    ? (raw as Lang)
    : fallback
}

const noop = () => {}

function PracticeContent() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  const sessionId = searchParams.get('session_id') ?? ''
  const uiLang    = parseLang(searchParams.get('ui_lang'), 'ja')
  const l1Lang    = parseLang(searchParams.get('l1_lang'), uiLang)

  const { intro, startButton, badge, email } = getPracticeContent(uiLang as Language)
  const [baseDate] = useState(() => new Date())

  function handleStart() {
    // 本番へ。練習の操作は一切記録していない。
    router.push(`/inbox?session_id=${encodeURIComponent(sessionId)}&ui_lang=${encodeURIComponent(uiLang)}&l1_lang=${encodeURIComponent(l1Lang)}`)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 select-none">
      {/* ── 案内バナー ── */}
      <div className="flex-shrink-0 bg-blue-50 border-b border-blue-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
              <Info className="w-3.5 h-3.5" />
              {badge}
            </span>
          </div>
          <p className="text-sm text-blue-900 leading-relaxed">{intro}</p>
        </div>
      </div>

      {/* ── 練習メール本体（本番と同じ UI。操作は記録されない）── */}
      <div className="flex flex-1 overflow-hidden">
        <MailBodyPane
          email={email}
          lang={uiLang}
          baseDate={baseDate}
          practiceMode
          onReply={noop}
          onIgnore={noop}
          onBlock={noop}
        />
      </div>

      {/* ── 実験開始ボタン ── */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white px-4 py-3">
        <div className="max-w-3xl mx-auto flex justify-end">
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            {startButton}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  )
}
