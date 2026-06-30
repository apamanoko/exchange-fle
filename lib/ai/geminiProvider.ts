// encoding: utf-8
import { GoogleGenerativeAI } from '@google/generative-ai'
import type { Language } from '@/types'
import type { FeedbackInput, FeedbackOutput, FeedbackProvider } from './feedbackProvider'

// ─── 攻撃手法の説明（trapId の番号から判定）────────────────────────────────────

function describeTrap(trapId: string): string {
  const num = parseInt(trapId.match(/trap-(\d+)-/)?.[1] ?? '0')
  switch (num) {
    case 1: return 'BEC（ベンダーなりすまし）: ドメイン偽装 + 二重拡張子（.pdf.exe）'
    case 2: return 'BEC（権威者なりすまし）: フリーメール偽装 + リンク偽装 + 緊急性 + 権威'
    case 3: return '標的型（業務継続乗っ取り）: 二重拡張子（.pdf.exe）+ 信頼関係の悪用'
    case 4: return 'フィッシング（インフラ偽通知）: ドメイン偽装 + リンク偽装 + 緊急性'
    default: return 'フィッシングメール'
  }
}

// ─── 言語別プロンプト指示文 ──────────────────────────────────────────────────

const LANG_INSTRUCTION: Record<Language, string> = {
  ja: '日本語で',
  en: 'in English',
  de: 'auf Deutsch',
  zh: '用中文（简体）',
  ko: '한국어로',
  it: 'in italiano',
  vi: 'bằng tiếng Việt',
  es: 'en español',
}

// ─── デフォルトフィードバック（API 失敗時のフォールバック）──────────────────────

const DEFAULT_FEEDBACK: Record<Language, FeedbackOutput> = {
  ja: {
    headline: '実験へのご参加ありがとうございました',
    whatYouDidWell: 'メールの確認作業に丁寧に取り組んでいただきました。',
    whatYouMissed: '一部のフィッシングメールで差出人アドレスのドメインを見逃した可能性があります。',
    keyInsight: 'フィッシングメールは本物そっくりの偽装を使います。焦らず確認する習慣をつけましょう。',
    oneAction: 'メールを受け取ったら、まず差出人のメールアドレス全体（特にドメイン部分）を確認してください。',
  },
  en: {
    headline: 'Thank you for participating in the experiment',
    whatYouDidWell: 'You engaged carefully with the email review tasks.',
    whatYouMissed: 'Some phishing emails may have gone undetected. Pay close attention to sender domain names.',
    keyInsight: 'Phishing emails use subtle disguises. Develop the habit of verifying before acting.',
    oneAction: 'When you receive an email, always check the full sender address, especially the domain part.',
  },
  de: {
    headline: 'Vielen Dank für Ihre Teilnahme am Experiment',
    whatYouDidWell: 'Sie haben sich sorgfältig mit den E-Mail-Aufgaben befasst.',
    whatYouMissed: 'Einige Phishing-E-Mails wurden möglicherweise nicht erkannt. Achten Sie auf die Absenderdomain.',
    keyInsight: 'Phishing-E-Mails verwenden subtile Tarnung. Überprüfen Sie immer, bevor Sie handeln.',
    oneAction: 'Überprüfen Sie beim Empfang einer E-Mail stets die vollständige Absenderadresse.',
  },
  zh: {
    headline: '感谢您参与本次实验',
    whatYouDidWell: '您认真参与了邮件审查任务。',
    whatYouMissed: '部分钓鱼邮件可能未被发现，请仔细检查发件人的域名。',
    keyInsight: '钓鱼邮件使用微妙的伪装，养成验证后再行动的习惯。',
    oneAction: '收到邮件时，请先仔细检查发件人的完整邮件地址，尤其是域名部分。',
  },
  ko: {
    headline: '실험에 참여해 주셔서 감사합니다',
    whatYouDidWell: '이메일 검토 작업에 성실히 참여하셨습니다.',
    whatYouMissed: '일부 피싱 이메일이 감지되지 않았을 수 있습니다. 발신자 도메인을 주의 깊게 확인하세요.',
    keyInsight: '피싱 이메일은 미묘한 위장을 사용합니다. 행동하기 전에 확인하는 습관을 기르세요.',
    oneAction: '이메일을 받으면 항상 발신자의 전체 주소, 특히 도메인 부분을 확인하세요.',
  },
  it: {
    headline: "Grazie per aver partecipato all'esperimento",
    whatYouDidWell: "Hai partecipato attentamente alle attività di revisione delle email.",
    whatYouMissed: "Alcune email di phishing potrebbero non essere state rilevate. Fai attenzione al dominio del mittente.",
    keyInsight: "Le email di phishing usano mascherature sottili. Sviluppa l'abitudine di verificare prima di agire.",
    oneAction: "Quando ricevi un'email, controlla sempre l'indirizzo completo del mittente.",
  },
  vi: {
    headline: 'Cảm ơn bạn đã tham gia thí nghiệm',
    whatYouDidWell: 'Bạn đã tham gia cẩn thận vào các nhiệm vụ xem xét email.',
    whatYouMissed: 'Một số email lừa đảo có thể chưa được phát hiện. Hãy chú ý đến tên miền của người gửi.',
    keyInsight: 'Email lừa đảo sử dụng ngụy trang tinh vi. Hãy phát triển thói quen xác minh trước khi hành động.',
    oneAction: 'Khi nhận email, hãy luôn kiểm tra địa chỉ đầy đủ của người gửi, đặc biệt là phần tên miền.',
  },
  es: {
    headline: 'Gracias por participar en el experimento',
    whatYouDidWell: 'Participaste cuidadosamente en las tareas de revisión de correos.',
    whatYouMissed: 'Algunos correos de phishing pueden no haber sido detectados. Presta atención al dominio del remitente.',
    keyInsight: 'Los correos de phishing usan disfraces sutiles. Desarrolla el hábito de verificar antes de actuar.',
    oneAction: 'Cuando recibas un correo, revisa siempre la dirección completa del remitente, especialmente el dominio.',
  },
}

// ─── システムプロンプト ────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `あなたはサイバーセキュリティ教育の専門家です。
以下の被験者の行動データに基づき、責めるトーンを避け、行動変容を促す教育的なフィードバックを生成してください。

出力ルール:
- 必ず有効な JSON のみを返すこと（コードフェンスや説明文は不要）
- 各フィールドは 100〜200 文字程度
- 被験者が指定した言語でフィールドを記述すること
- whatYouMissed には具体的な攻撃タイプ名を含めること
- 一度でも保留した被験者には「疑問を持ったこと」を評価し、
  最終的に騙された場合は「その直感を信じてほしかった」というニュアンスを加えること`

// ─── ユーザープロンプト生成 ────────────────────────────────────────────────────

function buildUserPrompt(input: FeedbackInput): string {
  const { score, trapResults, uiLang } = input
  const langInstr = LANG_INSTRUCTION[uiLang]

  const trapLines = trapResults.map((tr, i) => {
    const outcome  = tr.finalAction === 'replied' ? '❌ 騙された（replied）' : '✅ 排除（deleted）'
    const hesiNote = tr.hesitationCount > 0
      ? `（${tr.hesitationCount}回保留した後で最終判断）`
      : ''
    return `  ${i + 1}. ${tr.trapId} [${describeTrap(tr.trapId)}]\n     → ${outcome}${hesiNote}, TTA: ${tr.ttaMs}ms`
  }).join('\n')

  const contextNotes: string[] = []
  if (trapResults.every((tr) => !tr.fellForTrap)) {
    contextNotes.push('- 全ての罠メールを正しく排除した優秀な被験者です')
  }
  const hesitatedDeceived = trapResults.filter((tr) => tr.fellForTrap && tr.hesitationCount > 0)
  if (hesitatedDeceived.length > 0) {
    contextNotes.push(
      `- ${hesitatedDeceived.length}通の罠メールで一度は保留したが最終的に返信してしまいました（直感を持っていたのに行動に踏み切れなかった）`
    )
  }

  return `
【被験者の行動データ】

スコアサマリー:
- 総合スコア: ${score.overallScore}/100
- ドメイン検証: ${score.domainVerification}点
- リンク確認: ${score.linkInspection}点
- 焦り耐性: ${score.urgencyResistance}点
- 拡張子確認: ${score.extensionAwareness}点
- テキスト検証: ${score.textVerification}点
- 保留による熟慮: ${score.hesitationAwareness}点

罠メール ${trapResults.length}通の結果:
${trapLines}

${contextNotes.length > 0 ? '補足:\n' + contextNotes.join('\n') : ''}

【出力指示】
${langInstr}、以下の JSON フォーマットで出力してください:
{
  "headline": "（総合評価の1文見出し）",
  "whatYouDidWell": "（上手くできたこと）",
  "whatYouMissed": "（見逃した点・改善点。具体的な攻撃タイプ名を含める）",
  "keyInsight": "（最重要な気づき）",
  "oneAction": "（今すぐ実践できる具体的な1アクション）"
}`.trim()
}

// ─── JSON 抽出（コードフェンス除去）─────────────────────────────────────────────

function extractJson(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (fenced) return fenced[1].trim()
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (jsonMatch) return jsonMatch[0].trim()
  return raw.trim()
}

// ─── GeminiProvider ────────────────────────────────────────────────────────────

export class GeminiProvider implements FeedbackProvider {
  private readonly apiKey: string

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY ?? ''
  }

  async generateFeedback(input: FeedbackInput): Promise<FeedbackOutput> {
    if (!this.apiKey) {
      console.warn('[GeminiProvider] GEMINI_API_KEY が未設定です。デフォルトフィードバックを返します。')
      return DEFAULT_FEEDBACK[input.uiLang] ?? DEFAULT_FEEDBACK.en
    }

    try {
      const genAI = new GoogleGenerativeAI(this.apiKey)
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: SYSTEM_PROMPT,
      })

      const result = await model.generateContent(buildUserPrompt(input))
      const raw    = result.response.text()
      const parsed = JSON.parse(extractJson(raw)) as Partial<FeedbackOutput>

      const required: (keyof FeedbackOutput)[] = [
        'headline', 'whatYouDidWell', 'whatYouMissed', 'keyInsight', 'oneAction',
      ]
      for (const key of required) {
        if (typeof parsed[key] !== 'string') throw new Error(`フィールドが不正: ${key}`)
      }

      return parsed as FeedbackOutput
    } catch (err) {
      console.error('[GeminiProvider] generateFeedback 失敗:', err)
      return DEFAULT_FEEDBACK[input.uiLang] ?? DEFAULT_FEEDBACK.en
    }
  }
}
