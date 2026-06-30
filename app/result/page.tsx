'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Lightbulb, CheckCircle2, AlertTriangle, Printer,
  X, RefreshCw, Loader2, TrendingUp, Shield,
} from 'lucide-react'
import { getT, SUPPORTED_LANGS, type Lang } from '../lib/i18n'
import type { LiteracyScore, TrapResult, Language } from '@/types'
import type { FeedbackOutput } from '@/lib/ai'

// ─── 型 ──────────────────────────────────────────────────────────────────────

type ApiResponse = {
  session_id: string
  ui_lang: Language
  score: LiteracyScore
  trapResults: TrapResult[]
  feedback: FeedbackOutput
  meta: { totalLogs: number; provider: string; scoredAt: string }
}

// ─── ユーティリティ ──────────────────────────────────────────────────────────

function parseLang(raw: string | null, fallback: Lang): Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(raw ?? '')
    ? (raw as Lang)
    : fallback
}

function getLevel(score: number): 'high' | 'mid' | 'low' {
  if (score >= 70) return 'high'
  if (score >= 40) return 'mid'
  return 'low'
}

const LEVEL_STYLES = {
  high: 'bg-green-100 text-green-700 border border-green-200',
  mid:  'bg-yellow-100 text-yellow-700 border border-yellow-200',
  low:  'bg-red-100 text-red-700 border border-red-200',
}

const OVERALL_STYLES = {
  high: 'bg-green-50 border-green-300 text-green-800',
  mid:  'bg-yellow-50 border-yellow-300 text-yellow-800',
  low:  'bg-red-50 border-red-300 text-red-800',
}

// ─── 攻撃タイプ情報 ───────────────────────────────────────────────────────────

type TrapInfo = { name: string; description: string }

function getTrapInfo(trapId: string, lang: Lang): TrapInfo {
  const num = parseInt(trapId.match(/trap-(\d+)-/)?.[1] ?? '0')

  const INFO: Record<number, Record<Lang, TrapInfo>> = {
    1: {
      ja: { name: 'BEC（ベンダーなりすまし）', description: '取引先業者を装い、振込先の変更や添付ファイルの開封を求めます。実在する組織名に酷似したドメインや、PDFに見せかけた実行ファイル（.pdf.exe）が使われます。' },
      en: { name: 'BEC (Vendor Impersonation)', description: 'Attackers impersonate a vendor and request bank account changes or file downloads. Key signs: lookalike domain names, double extensions like .pdf.exe.' },
      de: { name: 'BEC (Lieferanten-Impersonation)', description: 'Angreifer geben sich als Lieferant aus und fordern Kontoänderungen oder Dateidownloads. Merkmale: ähnliche Domains, Doppelerweiterungen wie .pdf.exe.' },
      zh: { name: 'BEC（供应商冒充）', description: '攻击者冒充供应商，要求更改银行账户或下载文件。特征：相似域名、双重扩展名如.pdf.exe。' },
      ko: { name: 'BEC(공급업체 사칭)', description: '공격자가 공급업체를 사칭하여 계좌 변경이나 파일 다운로드를 요청합니다. 특징: 유사한 도메인명, .pdf.exe 같은 이중 확장자.' },
      it: { name: 'BEC (Impersonazione Fornitore)', description: "Gli attaccanti si spacciano per un fornitore e chiedono di cambiare conto o scaricare file. Segnali: domini simili, doppie estensioni come .pdf.exe." },
      vi: { name: 'BEC (Giả mạo nhà cung cấp)', description: 'Kẻ tấn công giả mạo nhà cung cấp và yêu cầu thay đổi tài khoản hoặc tải tệp. Dấu hiệu: tên miền tương tự, phần mở rộng kép như .pdf.exe.' },
      es: { name: 'BEC (Suplantación de Proveedor)', description: 'Los atacantes se hacen pasar por un proveedor y solicitan cambios de cuenta o descargas. Señales: dominios similares, extensiones dobles como .pdf.exe.' },
    },
    2: {
      ja: { name: 'BEC（権威者なりすまし）', description: '上司や学部長などの権威者を装い、緊急かつ秘密の依頼として情報入力を求めます。フリーメールアドレスと偽装リンクの組み合わせが典型的な手口です。' },
      en: { name: 'BEC (Authority Impersonation)', description: 'Attackers pose as an authority figure demanding urgent, confidential action. Red flags: free email addresses, spoofed links that appear official.' },
      de: { name: 'BEC (Autoritäts-Impersonation)', description: 'Angreifer geben sich als Vorgesetzten aus und fordern dringende, vertrauliche Maßnahmen. Warnsignale: kostenlose E-Mail-Adressen, gefälschte Links.' },
      zh: { name: 'BEC（权威人士冒充）', description: '攻击者冒充上级要求紧急、保密的行动。警告信号：免费邮箱地址、看起来官方的伪造链接。' },
      ko: { name: 'BEC(권위자 사칭)', description: '공격자가 상급자를 사칭하여 긴급하고 기밀인 행동을 요구합니다. 경고 신호: 무료 이메일 주소, 공식처럼 보이는 스푸핑 링크.' },
      it: { name: 'BEC (Impersonazione di Autorità)', description: "Gli attaccanti si spacciano per un superiore richiedendo azioni urgenti e riservate. Segnali: indirizzi email gratuiti, link contraffatti." },
      vi: { name: 'BEC (Giả mạo người có thẩm quyền)', description: 'Kẻ tấn công giả mạo người có thẩm quyền và yêu cầu hành động khẩn cấp, bí mật. Dấu hiệu: email miễn phí, liên kết giả mạo.' },
      es: { name: 'BEC (Suplantación de Autoridad)', description: 'Los atacantes se hacen pasar por una figura de autoridad exigiendo acción urgente y confidencial. Señales: emails gratuitos, enlaces falsificados.' },
    },
    3: {
      ja: { name: '標的型攻撃（業務継続なりすまし）', description: '過去のメールのやり取りに割り込み、信頼済みの相手として修正書類を送付します。パスワード付きZIPや二重拡張子ファイルで悪意のあるプログラムを隠します。' },
      en: { name: 'Spear Phishing (Thread Hijacking)', description: 'Attackers hijack existing email threads posing as a trusted contact. They hide malware in password-protected ZIPs or double extension files.' },
      de: { name: 'Spear-Phishing (Thread-Hijacking)', description: 'Angreifer kapern bestehende E-Mail-Threads als vertrauenswürdiger Kontakt. Malware wird in passwortgeschützten ZIPs oder Doppelerweiterungen versteckt.' },
      zh: { name: '鱼叉式网络钓鱼（邮件线程劫持）', description: '攻击者劫持现有邮件线程，伪装成可信联系人。将恶意软件隐藏在密码保护的ZIP或双重扩展名文件中。' },
      ko: { name: '스피어 피싱(스레드 하이재킹)', description: '공격자가 기존 이메일 스레드를 장악하여 신뢰할 수 있는 연락처인 척합니다. 악성코드를 ZIP 또는 이중 확장자 파일에 숨깁니다.' },
      it: { name: 'Spear Phishing (Dirottamento Thread)', description: "Gli attaccanti si inseriscono in thread email esistenti fingendosi un contatto fidato. Nascondono malware in ZIP protetti da password o file con doppie estensioni." },
      vi: { name: 'Tấn công có chủ đích (Chiếm đoạt chuỗi email)', description: 'Kẻ tấn công chiếm đoạt chuỗi email và giả vờ là liên hệ đáng tin cậy. Chúng ẩn phần mềm độc hại trong file ZIP hoặc file có phần mở rộng kép.' },
      es: { name: 'Spear Phishing (Secuestro de Hilo)', description: 'Los atacantes secuestran hilos de correo haciéndose pasar por un contacto de confianza. Ocultan malware en ZIPs con contraseña o archivos con doble extensión.' },
    },
    4: {
      ja: { name: 'フィッシング（インフラ偽通知）', description: '公式機関を装ってアカウント停止などの危機感を煽り、偽サイトへ誘導します。本物に見えるURLでも、ドメイン全体をよく見ると正規組織のものでないことがわかります。' },
      en: { name: 'Phishing (Fake Infrastructure Alert)', description: 'Attackers impersonate official services claiming account suspension, directing victims to fake sites. The domain looks plausible but does not belong to the real organization.' },
      de: { name: 'Phishing (Gefälschte Infrastrukturmeldung)', description: 'Angreifer geben sich als offizielle Dienste aus und behaupten, ein Konto sei gesperrt. Die Domain sieht plausibel aus, gehört aber nicht zur echten Organisation.' },
      zh: { name: '网络钓鱼（伪造基础设施通知）', description: '攻击者冒充官方服务，声称账户被暂停，将受害者引导至假网站。域名看起来合理，但不属于真实组织。' },
      ko: { name: '피싱(가짜 인프라 알림)', description: '공격자가 공식 서비스를 사칭하여 계정 정지를 주장하며 피해자를 가짜 사이트로 유도합니다. 도메인이 그럴듯해 보이지만 실제 조직 소속이 아닙니다.' },
      it: { name: 'Phishing (Falso Avviso Infrastrutturale)', description: "Gli attaccanti si spacciano per servizi ufficiali affermando la sospensione di un account. Il dominio sembra plausibile ma non appartiene all'organizzazione reale." },
      vi: { name: 'Lừa đảo (Cảnh báo cơ sở hạ tầng giả)', description: 'Kẻ tấn công giả mạo dịch vụ chính thức và tuyên bố tài khoản bị đình chỉ. Tên miền trông hợp lý nhưng không thuộc tổ chức thực.' },
      es: { name: 'Phishing (Alerta de Infraestructura Falsa)', description: 'Los atacantes se hacen pasar por servicios oficiales alegando suspensión de cuenta. El dominio parece plausible pero no pertenece a la organización real.' },
    },
  }

  return INFO[num]?.[lang] ?? INFO[num]?.['en'] ?? { name: `Trap ${num}`, description: '' }
}

// ─── スケルトン UI ────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
}

function SkeletonPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-3 text-center">
        <Skeleton className="h-14 w-14 rounded-full mx-auto" />
        <Skeleton className="h-8 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-16" />)}
      </div>
      <Skeleton className="h-24" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20" />)}
      </div>
    </div>
  )
}

// ─── スコアバッジ ─────────────────────────────────────────────────────────────

function LevelBadge({ score, labelHigh, labelMid, labelLow }: {
  score: number
  labelHigh: string
  labelMid: string
  labelLow: string
}) {
  const level = getLevel(score)
  const label = level === 'high' ? labelHigh : level === 'mid' ? labelMid : labelLow
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold ${LEVEL_STYLES[level]}`}>
      {label}
    </span>
  )
}

// ─── ResultContent ────────────────────────────────────────────────────────────

function ResultContent() {
  const searchParams = useSearchParams()
  const sessionId    = searchParams.get('session_id') ?? ''

  const [data, setData]       = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  // ui_lang の優先順位: URLパラメータ > APIレスポンス > デフォルト 'ja'
  const urlLangRaw = searchParams.get('ui_lang')
  const lang: Lang = urlLangRaw
    ? parseLang(urlLangRaw, 'ja')
    : parseLang((data?.ui_lang as string) ?? null, 'ja')

  const t = getT(lang)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setVisibleCount(0)
    try {
      const res = await fetch('/api/feedback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ session_id: sessionId }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`)
      }
      setData(await res.json() as ApiResponse)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => { fetchData() }, [fetchData])

  // フィードバック段階的フェードイン（500ms 間隔）
  useEffect(() => {
    if (!data) return
    const timers = [1, 2, 3, 4, 5].map((n, i) =>
      setTimeout(() => setVisibleCount(n), 300 + i * 500)
    )
    return () => timers.forEach(clearTimeout)
  }, [data])

  if (loading) return <SkeletonPage />

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-gray-700 font-medium mb-2">{t.errorFeedback}</p>
        <p className="text-sm text-gray-500 mb-6">{error}</p>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {t.retryButton}
        </button>
      </div>
    )
  }

  if (!data) return null

  const { score, trapResults, feedback } = data
  const missed = trapResults.filter((tr) => tr.fellForTrap)

  const scoreItems: { key: keyof LiteracyScore; label: string }[] = [
    { key: 'domainVerification',  label: t.scoreDomain },
    { key: 'linkInspection',      label: t.scoreLink },
    { key: 'urgencyResistance',   label: t.scoreUrgency },
    { key: 'extensionAwareness',  label: t.scoreExtension },
    { key: 'textVerification',    label: t.scoreText },
    { key: 'hesitationAwareness', label: t.scoreHesitation },
  ]

  const overallLevel = getLevel(score.overallScore)
  const overallLabel = overallLevel === 'high' ? t.levelHigh : overallLevel === 'mid' ? t.levelMid : t.levelLow

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8 print:py-4 print:space-y-6">

        {/* ① ヘッダー */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-3 print:hidden">
            <Shield className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t.resultTitle}</h1>
          <p className="text-xs text-gray-400 font-mono">{sessionId}</p>
        </header>

        {/* ② スコア可視化 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500 print:hidden" />
            {t.scoreLabel}
          </h2>

          {/* 総合評価カード */}
          <div className={`border-2 rounded-2xl p-5 mb-4 text-center ${OVERALL_STYLES[overallLevel]}`}>
            <div className="text-xs font-medium uppercase tracking-wider mb-1 opacity-70">{t.scoreOverall}</div>
            <div className="text-3xl font-bold">{overallLabel}</div>
          </div>

          {/* 6項目グリッド */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {scoreItems.map(({ key, label }) => (
              <div key={key} className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex flex-col gap-1.5 print:border-gray-300">
                <span className="text-xs text-gray-500 font-medium">{label}</span>
                <LevelBadge
                  score={score[key]}
                  labelHigh={t.levelHigh}
                  labelMid={t.levelMid}
                  labelLow={t.levelLow}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ③ 見落とした罠の説明 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500 print:hidden" />
            {t.trapMissed}
          </h2>
          {missed.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800 font-medium">{t.noMissedTraps}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {missed.map((tr) => {
                const info = getTrapInfo(tr.trapId, lang)
                return (
                  <div key={tr.trapId} className="bg-white border border-red-100 rounded-xl p-4 space-y-1 print:border-red-200">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-red-700">{info.name}</span>
                      {tr.hesitationCount > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                          {lang === 'ja'
                            ? `${tr.hesitationCount}回保留`
                            : `Held ${tr.hesitationCount}×`}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{info.description}</p>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* ④ AI フィードバック（段階的フェードイン） */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-500 print:hidden" />
            {t.feedbackTitle}
          </h2>

          <div className="space-y-4">
            {/* headline */}
            <div className={`transition-all duration-500 ${visibleCount >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} print:opacity-100 print:translate-y-0`}>
              <p className="text-xl font-bold text-gray-900 leading-snug">
                {feedback.headline}
              </p>
            </div>

            {/* whatYouDidWell */}
            <div className={`transition-all duration-500 ${visibleCount >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} print:opacity-100 print:translate-y-0`}>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1.5">
                  {t.feedbackWell}
                </p>
                <p className="text-sm text-green-900 leading-relaxed">{feedback.whatYouDidWell}</p>
              </div>
            </div>

            {/* whatYouMissed */}
            <div className={`transition-all duration-500 ${visibleCount >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} print:opacity-100 print:translate-y-0`}>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wider mb-1.5">
                  {t.feedbackMissed}
                </p>
                <p className="text-sm text-yellow-900 leading-relaxed">{feedback.whatYouMissed}</p>
              </div>
            </div>

            {/* keyInsight */}
            <div className={`transition-all duration-500 ${visibleCount >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} print:opacity-100 print:translate-y-0`}>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <Lightbulb className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5 print:hidden" />
                <div>
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
                    {t.feedbackInsight}
                  </p>
                  <p className="text-sm text-blue-900 leading-relaxed">{feedback.keyInsight}</p>
                </div>
              </div>
            </div>

            {/* oneAction */}
            <div className={`transition-all duration-500 ${visibleCount >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} print:opacity-100 print:translate-y-0`}>
              <div className="border-2 border-gray-800 rounded-xl p-4 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5 print:hidden" />
                <div>
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    {t.feedbackAction}
                  </p>
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">{feedback.oneAction}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⑤ 終了アクション */}
        <footer className="space-y-4 pt-4 border-t border-gray-200 print:border-gray-300">
          <p className="text-center text-sm text-gray-500">{t.thankYou}</p>

          {/* ボタン群: 印刷時は非表示 */}
          <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
            {/* 印刷・PDF保存ボタン */}
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              {t.printReport}
            </button>

            {/* 閉じるボタン */}
            <button
              onClick={() => window.close()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors"
            >
              <X className="w-4 h-4" />
              {t.close}
            </button>
          </div>
        </footer>

      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
