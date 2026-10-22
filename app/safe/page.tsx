'use client'

// ─────────────────────────────────────────────────────────────────────────────
// app/safe/page.tsx
// 通常メール（罠ではない）のリンク／添付ファイルをクリックした被験者が到達する
// 「安全確認画面」。外部サイトへの遷移は実験中のためブロックされる。
// 正常行動であり研究データとして不要なため、トラッキングは一切行わない。
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShieldCheck, Loader2, X } from 'lucide-react'
import { getT, type Lang } from '@/app/lib/i18n'

type SafeType = 'link' | 'attachment'

function parseType(raw: string | null): SafeType {
  return raw === 'attachment' ? 'attachment' : 'link'
}

function parseLang(raw: string | null): Lang {
  const supported: Lang[] = ['ja', 'en', 'de', 'zh', 'ko', 'it', 'vi', 'es', 'pl', 'no', 'fi']
  return supported.includes(raw as Lang) ? (raw as Lang) : 'ja'
}

// ─── SafeContent ──────────────────────────────────────────────────────────────

function SafeContent() {
  const searchParams = useSearchParams()
  const lang = parseLang(searchParams.get('ui_lang'))
  // type / session_id / email_id はパラメータとして受け取るが、
  // 通常行動のためログには記録しない。
  const t = getT(lang)

  const handleClose = useCallback(() => {
    window.close()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 text-center">
      <div className="max-w-md w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5">
          <ShieldCheck className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-4">
          {t.safeLinkTitle}
        </h1>

        <div className="bg-white border border-green-200 rounded-xl p-4 mb-8 text-left">
          <p className="text-sm text-gray-700 leading-relaxed">
            {t.safeLinkBody}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-colors"
        >
          <X className="w-4 h-4" />
          {t.closeTab}
        </button>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SafePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      }
    >
      <SafeContent />
    </Suspense>
  )
}
