import type { Language, LiteracyScore, TrapResult } from '@/types'

export type FeedbackInput = {
  score: LiteracyScore
  trapResults: TrapResult[]
  uiLang: Language
}

export type FeedbackOutput = {
  /** 1行の総評見出し */
  headline: string
  /** 上手くできたこと */
  whatYouDidWell: string
  /** 見逃してしまったこと・改善点 */
  whatYouMissed: string
  /** 重要な気づき */
  keyInsight: string
  /** 今すぐ実践できる1つのアクション */
  oneAction: string
}

export interface FeedbackProvider {
  generateFeedback(input: FeedbackInput): Promise<FeedbackOutput>
}
