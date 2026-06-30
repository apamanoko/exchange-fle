import { GeminiProvider } from './geminiProvider'
// import { AnthropicProvider } from './anthropicProvider'  // 将来用

export type { FeedbackProvider, FeedbackInput, FeedbackOutput } from './feedbackProvider'

// ここを切り替えるだけでプロバイダーを変更できる
export const feedbackProvider = new GeminiProvider()
