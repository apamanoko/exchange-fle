// Phase 3-A: MailLayout を使用
// Phase 1-A (i18n基盤) 実装後、lang を searchParams から受け取るよう変更する
import MailLayout from './components/MailLayout'

export default function Home() {
  return <MailLayout lang="ja" />
}
