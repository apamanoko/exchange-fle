'use client'

import { useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Copy, Check, ExternalLink, Loader2,
  AlertTriangle, ChevronRight,
} from 'lucide-react'
import { getT, type Lang } from './lib/i18n'
import { getFormUrls, generateParticipantCode } from './lib/formUrls'
import { supabase } from './lib/supabase'

// ─── 定数：留学生の母語選択肢 ────────────────────────────────────────────────

type MotherTongueLang = 'en' | 'zh' | 'ko' | 'de' | 'it' | 'vi' | 'es' | 'pl' | 'no' | 'fi'

const MOTHER_TONGUES: { code: MotherTongueLang; ja: string; native: string }[] = [
  { code: 'en', ja: '英語',         native: 'English'    },
  { code: 'zh', ja: '中国語',       native: '中文'       },
  { code: 'ko', ja: '韓国語',       native: '한국어'     },
  { code: 'de', ja: 'ドイツ語',     native: 'Deutsch'    },
  { code: 'it', ja: 'イタリア語',   native: 'Italiano'   },
  { code: 'vi', ja: 'ベトナム語',   native: 'Tiếng Việt' },
  { code: 'es', ja: 'スペイン語',   native: 'Español'    },
  { code: 'pl', ja: 'ポーランド語', native: 'Polski'     },
  { code: 'no', ja: 'ノルウェー語', native: 'Norsk'      },
  { code: 'fi', ja: 'フィンランド語', native: 'Suomi'    },
]

// ─── 状況確定パラメータ型 ────────────────────────────────────────────────────

type SituationParams = {
  uiLang:    Lang
  l1Lang:    Lang
  l2Lang:    'ja'
  condition: 'L1' | 'L2'
}

// ─── StepIndicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[0, 1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              s < current
                ? 'bg-blue-600 text-white'
                : s === current
                ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s < current ? <Check className="w-4 h-4" /> : s + 1}
          </div>
          {s < 3 && (
            <div className={`w-10 h-0.5 mx-1 ${s < current ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── カード共通ラッパー ───────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-xl">
      {children}
    </div>
  )
}

// ─── SituationSelector ───────────────────────────────────────────────────────

function SituationSelector({ onConfirm }: { onConfirm: (p: SituationParams) => void }) {
  const [situation, setSituation]     = useState<'ryugakusei' | null>(null)
  const [motherTongue, setMotherTongue] = useState<MotherTongueLang | null>(null)

  const canConfirm = situation === 'ryugakusei' && motherTongue !== null

  function handleConfirm() {
    if (!canConfirm) return
    const lang = motherTongue as MotherTongueLang
    onConfirm({ uiLang: lang, l1Lang: lang, l2Lang: 'ja', condition: 'L2' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-xl space-y-6">

        <div className="text-center">
          <h1 className="text-lg font-bold text-gray-900">
            あなたの状況を選択してください
          </h1>
          <p className="text-sm text-gray-500 mt-1">Please select your situation</p>
        </div>

        <div className="space-y-3">

          {/* 選択肢1: 日本在住の留学生 */}
          <button
            onClick={() => { setSituation('ryugakusei'); setMotherTongue(null) }}
            className={`w-full text-left p-5 rounded-xl border-2 transition-colors ${
              situation === 'ryugakusei'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <p className="font-semibold text-gray-900">日本在住の留学生</p>
            <p className="text-sm text-gray-500 mt-0.5">International student in Japan</p>
          </button>

          {/* 母語選択（留学生選択時のみ展開） */}
          {situation === 'ryugakusei' && (
            <div className="ml-4 space-y-2">
              <p className="text-xs font-medium text-gray-600">
                母語を選択してください / Select your native language
              </p>
              <div className="grid grid-cols-2 gap-2">
                {MOTHER_TONGUES.map(({ code, ja, native }) => (
                  <button
                    key={code}
                    onClick={() => setMotherTongue(code)}
                    className={`px-3 py-2.5 rounded-lg border text-left transition-colors ${
                      motherTongue === code
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-xs text-gray-500">{ja}</span>
                    <span className="block text-sm font-semibold">{native}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors
            disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
            bg-blue-600 text-white hover:bg-blue-700
            flex items-center justify-center gap-2"
        >
          次へ / Next
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  )
}

// ─── HomeContent ─────────────────────────────────────────────────────────────

function HomeContent() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  const hasNoSessionError = searchParams.get('error') === 'no_session'

  // ── 状況選択で確定する言語・条件 ───────────────────────────────────────────
  const [situationConfirmed, setSituationConfirmed] = useState(false)
  const [uiLang,    setUiLang]    = useState<Lang>('ja')
  const [l1Lang,    setL1Lang]    = useState<Lang>('ja')
  const [l2Lang,    setL2Lang]    = useState<'ja' | 'en'>('ja')
  const [condition, setCondition] = useState<'L1' | 'L2'>('L2')

  const t = getT(uiLang)

  const handleSituationConfirm = useCallback(
    ({ uiLang: ul, l1Lang: l1, l2Lang: l2, condition: cond }: SituationParams) => {
      setUiLang(ul)
      setL1Lang(l1)
      setL2Lang(l2)
      setCondition(cond)
      setSituationConfirmed(true)
    },
    [],
  )

  // ── ステップ状態 ──────────────────────────────────────────────────────────
  const [step, setStep]               = useState<0 | 1 | 2 | 3>(0)
  const [consentChecked, setConsent]  = useState(false)
  const [preFormDone, setPreFormDone] = useState(false)
  const [readyChecked, setReady]      = useState(false)
  const [isCopied, setIsCopied]       = useState(false)
  const [isLoading, setIsLoading]     = useState(false)
  const [error, setError]             = useState<string | null>(null)

  const [participantCode] = useState(() => generateParticipantCode())
  const { preUrl } = getFormUrls(uiLang, participantCode)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(participantCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [participantCode])

  const handleStart = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // l2_lang カラムがないため email_set_id で L2言語を表現
      const emailSetId = l2Lang === 'en' ? 'en-l2' : 'ja-l2'

      const { data, error: dbError } = await supabase
        .from('sessions')
        .insert({
          participant_code: participantCode,
          ui_lang:          uiLang,
          l1_lang:          l1Lang,
          condition,
          email_set_id:     emailSetId,
        })
        .select('id')
        .single()

      if (dbError) {
        const msg = dbError.message
          ? `DB error: ${dbError.message}${dbError.hint ? ` (hint: ${dbError.hint})` : ''}`
          : JSON.stringify(dbError)
        throw new Error(msg)
      }
      router.push(`/inbox?session_id=${data.id}&ui_lang=${uiLang}&l1_lang=${l1Lang}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setIsLoading(false)
    }
  }, [uiLang, l1Lang, l2Lang, condition, participantCode, router])

  // ── 状況未確定: セレクター表示 ────────────────────────────────────────────
  if (!situationConfirmed) {
    return (
      <>
        {hasNoSessionError && (
          <div className="fixed top-4 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none">
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 max-w-xl w-full pointer-events-auto">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">
                有効なセッションがありません。最初からやり直してください。
              </p>
            </div>
          </div>
        )}
        <SituationSelector onConfirm={handleSituationConfirm} />
      </>
    )
  }

  // ── 状況確定後: 実験ステップ表示 ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

      {hasNoSessionError && (
        <div className="w-full max-w-xl mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">
            有効なセッションがありません。最初からやり直してください。
          </p>
        </div>
      )}

      <StepIndicator current={step} />

      {/* ── STEP 0: 研究同意 ───────────────────────────────────────────────── */}
      {step === 0 && (
        <Card>
          <h1 className="text-xl font-bold text-gray-900 mb-6">{t.consentTitle}</h1>
          <ol className="space-y-3 mb-6">
            {([t.consentItem1, t.consentItem2, t.consentItem3, t.consentItem4] as string[]).map(
              (item, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ),
            )}
          </ol>
          <p className="text-xs text-gray-500 border-t border-gray-100 pt-4 mb-1 leading-relaxed">
            {t.consentNote}
          </p>
          <p className="text-xs text-gray-400 mb-6 italic">{t.consentDataTransfer}</p>
          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{t.consentAgree}</span>
          </label>
          <button
            onClick={() => setStep(1)}
            disabled={!consentChecked}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors
              disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
              bg-blue-600 text-white hover:bg-blue-700"
          >
            {t.nextStep}
          </button>
        </Card>
      )}

      {/* ── STEP 1: 参加者コード ──────────────────────────────────────────── */}
      {step === 1 && (
        <Card>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{t.participantCodeLabel}</h1>
          <p className="text-sm text-gray-500 mb-6">{t.participantCodeNote}</p>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-8">
            <span className="flex-1 text-2xl font-mono font-bold tracking-widest text-gray-900">
              {participantCode}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isCopied
                ? <><Check className="w-4 h-4" />{t.copied}</>
                : <><Copy className="w-4 h-4" />{t.copyCode}</>
              }
            </button>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {t.nextStep}
          </button>
        </Card>
      )}

      {/* ── STEP 2: 事前アンケート ────────────────────────────────────────── */}
      {step === 2 && (
        <Card>
          <h1 className="text-xl font-bold text-gray-900 mb-6">{t.preFormButton}</h1>
          <a
            href={preUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors mb-8"
          >
            <ExternalLink className="w-4 h-4" />
            {t.preFormButton}
          </a>
          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={preFormDone}
              onChange={(e) => setPreFormDone(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{t.preFormComplete}</span>
          </label>
          <button
            onClick={() => setStep(3)}
            disabled={!preFormDone}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors
              disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
              bg-blue-600 text-white hover:bg-blue-700"
          >
            {t.nextStep}
          </button>
        </Card>
      )}

      {/* ── STEP 3: カバーストーリー + 実験開始 ──────────────────────────── */}
      {step === 3 && (
        <Card>
          <h1 className="text-xl font-bold text-gray-900 mb-4">{t.coverStoryTitle}</h1>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {t.coverStoryBody}
            </p>
          </div>
          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={readyChecked}
              onChange={(e) => setReady(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{t.readyToStart}</span>
          </label>
          {error && <p className="text-xs text-red-600 mb-4">{error}</p>}
          <button
            onClick={handleStart}
            disabled={!readyChecked || isLoading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors
              disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
              bg-blue-600 text-white hover:bg-blue-700
              flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? t.loading : t.startExperiment}
          </button>
        </Card>
      )}

    </div>
  )
}

// ─── Page（useSearchParams を Suspense でラップ）────────────────────────────

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
