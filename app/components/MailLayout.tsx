'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MailLayout.tsx  —  Phase 3-A
//
// ■ 仮型定義・モックデータについて
//   このファイル内にインラインで定義している。
//   Phase 1-C（型定義本番化）および Phase 2（メールデータ本番化）で差し替える。
//
// ■ アクションハンドラ設計
//   onReply / onForward / onDelete を MailLayout が生成し props 経由で渡す。
//   Phase 8（トラッキング実装）では この層だけを修正すればよい。
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react'
import { Mail, Search, Bell, Settings } from 'lucide-react'
import { getT, type Lang } from '../lib/i18n'
import { useMailStore, type EmailAction, type FolderId } from '../store/mailStore'
import MailSidebar from './MailSidebar'
import MailList from './MailList'
import MailBodyPane, { type ProvisionalEmail } from './MailBodyPane'
import type { ProvisionalListEmail } from './MailListItem'

// ═══════════════════════════════════════════════════════════════════════════════
// PROVISIONAL TYPE DEFINITIONS — Phase 1-C で本番型に差し替える
// ═══════════════════════════════════════════════════════════════════════════════

type MockEmail = ProvisionalEmail & {
  folder: FolderId
  dateLabel: string   // 一覧表示用（相対日時）
  preview: string     // 一覧プレビューテキスト
  isRead: boolean
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOCK DATA — Phase 2 で本番データ（app/data/emails.ts）に差し替える
// ═══════════════════════════════════════════════════════════════════════════════

const MOCK_EMAILS: MockEmail[] = [

  // ════════════════════════════════════════════════════════════════════════════
  // 今日 (2026-05-28) のメール
  // ════════════════════════════════════════════════════════════════════════════

  // ── TRAP-4: T1（ドメイン偽装）+ T3（リンク偽装）+ T4（緊急性）の複合 ──────
  // fromEmail: meijo-u-portal.net は meijo-u.ac.jp の偽ドメイン
  // リンク: 表示は正規 URL、href は偽ドメイン
  {
    id: 'e01',
    folder: 'inbox',
    fromName: '名城大学 情報サービスセンター',
    fromEmail: 'notice@meijo-u-portal.net',
    toName: 'あなた',
    subject: '【重要なお知らせ】大学アカウントの停止について',
    preview: '本日、お使いの大学アカウントに不審なアクティビティが検出されました。早急に本人確認をお済ませください。',
    dateLabel: '今日',
    fullDate: '2026年5月28日 11:47',
    isRead: false,
    attachments: [],
    isTrap: true,
    trapType: 'T1',   // T1（ドメイン偽装 meijo-u-portal.net）+ T3（リンク偽装）+ T4（緊急性）
    bodyHtml: `<p>名城大学 情報サービスセンターよりご連絡いたします。</p>
<p>本日、お使いの大学アカウントに対して複数の不審なアクセスが検出されました。規程に基づき、アカウントの一時保護措置を実施いたします。</p>
<p>引き続きアカウントをご利用いただくには、<strong>48時間以内</strong>に下記リンクより本人確認を完了してください。期限を過ぎた場合、学内システムおよびポータルへのアクセスが停止されます。</p>
<p>▼ アカウントの確認・復旧はこちら<br>
<a href="https://mymeijo.meijo-u-portal.net/account/verify" data-display-url="https://mymeijo.meijo-u.ac.jp/account/verify">https://mymeijo.meijo-u.ac.jp/account/verify</a></p>
<p>お心当たりのない方も、セキュリティのため必ずご確認ください。ご不明な点はこのメールにご返信ください。</p>
<p>名城大学 情報サービスセンター<br>
セキュリティ管理部門<br>
notice@meijo-u-portal.net</p>`,
  },

  // ── 正規メール 1: 田中教授（TA採点補助依頼）─────────────────────────────
  {
    id: 'e02',
    folder: 'inbox',
    fromName: '田中 誠二 教授',
    fromEmail: 'tanaka.s@meijo-u.ac.jp',
    toName: 'あなた',
    subject: '【TA業務】前期中間試験の採点補助をお願いします',
    preview: 'お疲れ様です。来週実施の中間試験につき、採点補助をお願いしたく連絡しました。',
    dateLabel: '今日',
    fullDate: '2026年5月28日 11:00',
    isRead: false,
    attachments: [],
    isTrap: false,
    bodyHtml: `<p>お疲れ様です、田中です。</p>
<p>来週月曜日（6月2日）実施予定の「情報工学演習Ⅰ」中間試験について、採点補助をお願いしたく連絡しました。</p>
<p><strong>【作業内容と日程】</strong><br>
対象科目：情報工学演習Ⅰ（受講者 87名）<br>
採点期間：6月2日（月）〜 6月6日（金）<br>
提出期限：6月7日（土）正午<br>
採点ツール：学内 LMS（manabi.meijo-u.ac.jp）</p>
<p>採点基準は来週月曜のミーティングで説明します。事前に確認したい点があればメールでご連絡ください。</p>
<p>よろしくお願いします。</p>
<p>田中 誠二<br>
情報工学部 情報工学科<br>
tanaka.s@meijo-u.ac.jp</p>`,
  },

  // ── TRAP-1: T1（ドメイン偽装 annazon.co.jp）+ T4（緊急性）─────────────────
  // 「annazon」は amazon のタイポスクワッティング
  {
    id: 'e03',
    folder: 'inbox',
    fromName: '名城大学 奨学金センター',
    fromEmail: 'scholarship-support@univ-support.annazon.co.jp',
    toName: 'あなた',
    subject: '【重要】奨学金口座の確認をお願いします（48時間以内）',
    preview: 'いつも奨学金をご利用いただきありがとうございます。振込先口座情報の再確認が必要です。',
    dateLabel: '今日',
    fullDate: '2026年5月28日 10:32',
    isRead: false,
    attachments: [],
    isTrap: true,
    trapType: 'T1',   // T1（ドメイン偽装 annazon.co.jp）+ T4（48時間以内）
    bodyHtml: `<p>いつも奨学金をご利用いただきありがとうございます。</p>
<p>このたび、奨学金振込システムのセキュリティアップグレードに伴い、<strong>受給者全員の口座情報の再確認</strong>が必要となりました。</p>
<p>下記よりお手続きをお済みいただかないと、<strong>6月分の奨学金振込が停止</strong>される場合がございます。お手数をおかけしますが、<strong>48時間以内</strong>にご対応ください。</p>
<p>▼ 口座情報の確認はこちら<br>
<a href="https://univ-support.annazon.co.jp/scholarship/confirm">https://univ-support.annazon.co.jp/scholarship/confirm</a></p>
<p>ご不明な点は scholarship-support@univ-support.annazon.co.jp までご連絡ください。</p>
<p>名城大学 奨学金センター<br>
奨学金業務担当</p>`,
  },

  // ── 正規メール 2: 学務課（成績入力メンテナンス通知）────────────────────
  {
    id: 'e04',
    folder: 'inbox',
    fromName: '学務課 教務担当',
    fromEmail: 'kyomu@meijo-u.ac.jp',
    toName: 'あなた',
    subject: '前期成績入力システムのメンテナンスについて（5/30実施）',
    preview: '5月30日（土）2:00〜6:00の間、成績入力システムのメンテナンスを実施します。',
    dateLabel: '今日',
    fullDate: '2026年5月28日 09:15',
    isRead: false,
    attachments: [],
    isTrap: false,
    bodyHtml: `<p>学生・教員の皆様</p>
<p>学務課より、成績入力システムのメンテナンス実施についてお知らせします。</p>
<p><strong>【メンテナンス日時】</strong><br>
日時：2026年5月30日（土）午前2:00 〜 午前6:00<br>
対象：成績入力システム（manabi.meijo-u.ac.jp）</p>
<p>上記の時間帯は成績の入力・閲覧ともにご利用いただけません。TA業務で成績登録作業を予定している方は、事前にご調整ください。</p>
<p>メンテナンス完了後は通常どおりご利用いただけます。ご不便をおかけしますが、よろしくお願いいたします。</p>
<p>学務課 教務担当</p>`,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 昨日 (2026-05-27) のメール
  // ════════════════════════════════════════════════════════════════════════════

  // ── 正規メール 3: 大学院事務室（TAミーティング日程調整）────────────────
  {
    id: 'e05',
    folder: 'inbox',
    fromName: '大学院事務室',
    fromEmail: 'gs-office@meijo-u.ac.jp',
    toName: 'あなた',
    subject: 'TAミーティング（6月）の日程調整についてのお願い',
    preview: '6月のTAミーティングの日程を調整しております。ご都合のよい日程をお知らせください。',
    dateLabel: '昨日',
    fullDate: '2026年5月27日 17:30',
    isRead: false,
    attachments: [],
    isTrap: false,
    bodyHtml: `<p>TAの皆さま</p>
<p>大学院事務室よりご連絡いたします。</p>
<p>6月のTAミーティングにつきまして、日程調整を行いたいと思います。以下の候補日の中からご都合のよい日時をお知らせください。</p>
<p><strong>【日程候補】</strong><br>
① 6月9日（月）16:00〜17:30<br>
② 6月11日（水）14:00〜15:30<br>
③ 6月13日（金）16:00〜17:30</p>
<p>出席確認は<strong>5月30日（金）17時</strong>までに、返信にてご連絡ください。なお、今期のTA業務報告書のフォームについては後日改めてご案内いたします。</p>
<p>大学院事務室<br>
gs-office@meijo-u.ac.jp　内線：2345</p>`,
  },

  // ── TRAP-2: T3（リンク偽装）+ T5（権威の悪用：研究科長を騙る）───────────
  // fromEmail の meijo-ac.jp は meijo-u.ac.jp の偽ドメイン（.u を省略）
  // リンク: 表示は forms.meijo-u.ac.jp、href は forms.meijo-ac.jp
  {
    id: 'e06',
    folder: 'inbox',
    fromName: '情報工学研究科長 鈴木 一郎',
    fromEmail: 'dean-info@meijo-ac.jp',
    toName: 'あなた',
    subject: '【重要】大学院生対象 TA業績評価フォームの提出について（6月2日締切）',
    preview: 'TA担当の皆さんへ。今期のTA業績評価フォームの提出期限が6月2日に迫っています。',
    dateLabel: '昨日',
    fullDate: '2026年5月27日 14:30',
    isRead: false,
    attachments: [],
    isTrap: true,
    trapType: 'T3',   // T3（リンク偽装 meijo-ac.jp）+ T1（差出人ドメイン偽装）+ T5（研究科長騙り）
    bodyHtml: `<p>大学院生（TA担当）の皆さんへ</p>
<p>情報工学研究科長の鈴木です。今期のTA活動に対するご尽力、誠にありがとうございます。</p>
<p>さて、前期TA業績評価フォームの提出期限が近づいております。<strong>6月2日（月）正午</strong>までに以下のフォームより必ずご回答ください。提出のない場合、TA手当の支給が翌月以降に繰り越される場合があります。</p>
<p>▼ TA業績評価フォーム（要ログイン）<br>
<a href="https://forms.meijo-ac.jp/ta-evaluation/2026spring" data-display-url="https://forms.meijo-u.ac.jp/ta-evaluation/2026spring">https://forms.meijo-u.ac.jp/ta-evaluation/2026spring</a></p>
<p>ご不明な点は研究科事務室（gs-office@meijo-u.ac.jp）にお問い合わせください。</p>
<p>情報工学研究科<br>
研究科長 鈴木 一郎</p>`,
  },

  // ── 正規メール 4: 田中教授（輪講資料共有）──────────────────────────────
  {
    id: 'e07',
    folder: 'inbox',
    fromName: '田中 誠二 教授',
    fromEmail: 'tanaka.s@meijo-u.ac.jp',
    toName: 'あなた',
    subject: '来週の輪講資料を送ります（第8章：強化学習の基礎）',
    preview: '来週月曜のゼミ輪講、第8章の資料です。§8.3〜§8.5 を中心に準備してください。',
    dateLabel: '昨日',
    fullDate: '2026年5月27日 11:20',
    isRead: true,
    attachments: [
      { name: 'RL_chapter08_distributed.pdf', size: '3.2 MB' },
    ],
    isTrap: false,
    bodyHtml: `<p>お疲れ様です、田中です。</p>
<p>来週月曜日（6月2日）の輪講に向けて、第8章「強化学習の基礎」の資料を送ります。先週の議論を踏まえ、§8.3〜§8.5 を中心に準備してください。</p>
<p><strong>【資料と担当範囲】</strong><br>
添付ファイル：RL_chapter08_distributed.pdf<br>
今週の担当：加藤（§8.1〜§8.3）<br>
来週の担当：陳さん（§8.4〜§8.6）</p>
<p>質問や不明な点があれば、ゼミ前日（5/30）の17時までに Slack またはメールで共有してください。当日の議論を充実させましょう。</p>
<p>田中</p>`,
  },

  // ── 正規メール 5: 加藤先輩（修士論文スライド相談）──────────────────────
  {
    id: 'e08',
    folder: 'inbox',
    fromName: '加藤 雄大',
    fromEmail: 'kato.y@st.meijo-u.ac.jp',
    toName: 'あなた',
    subject: '修士論文の中間報告スライドを見ていただけますか',
    preview: '中間報告まで2週間を切りました。スライドの構成について一度アドバイスいただけると助かります。',
    dateLabel: '昨日',
    fullDate: '2026年5月27日 09:45',
    isRead: true,
    attachments: [],
    isTrap: false,
    bodyHtml: `<p>お疲れ様です、加藤です。</p>
<p>修士論文の中間報告（6月12日）まで2週間を切りましたが、スライドの構成で少し詰まっているところがあり、ご相談させてください。</p>
<p>特に悩んでいるのは<strong>実験結果の見せ方</strong>です。複数の評価指標をどうまとめるか迷っていて、先輩が昨年の中間報告でうまく整理されていたのが印象に残っています。</p>
<p>お時間があるときに、Slack か研究室で少し話していただけると助かります。15〜20分ほどで構いません。よろしくお願いします。</p>
<p>加藤 雄大<br>
情報工学研究科 博士前期課程2年</p>`,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 5月26日 (2026-05-26) のメール
  // ════════════════════════════════════════════════════════════════════════════

  // ── TRAP-3: T2（二重拡張子 .pdf.exe）+ T5（同研究室の留学生グループ騙り）─
  {
    id: 'e09',
    folder: 'inbox',
    fromName: '田中研究室 留学生グループ',
    fromEmail: 'lab-intl-group@meijo-student.net',
    toName: 'あなた',
    subject: '【TAさんへのお願い】成績報告書のフォーマット確認をお願いします',
    preview: 'TA担当の先輩へ。成績報告書のフォーマットに不明な点があり、確認いただけると助かります。',
    dateLabel: '5月26日',
    fullDate: '2026年5月26日 15:17',
    isRead: false,
    attachments: [
      { name: '成績報告書_最終版.pdf.exe', size: '1.8 MB' },
    ],
    isTrap: true,
    trapType: 'T2',   // T2（.pdf.exe 二重拡張子）+ T5（同研究室コミュニティ騙り）
    bodyHtml: `<p>田中研究室のTAを担当されている先輩へ</p>
<p>こんにちは。研究室の留学生グループです。いつもお世話になっております。</p>
<p>今期の成績報告書の提出にあたり、フォーマットの記入方法に不明な点があります。添付のファイルに私たちが作成した成績報告書をまとめましたので、内容に問題がないかご確認のうえ、アドバイスをいただけますか。ファイルをダウンロードして開いていただければ内容を確認できます。</p>
<p>お忙しいところ大変申し訳ありませんが、<strong>5月30日（金）</strong>までにご確認いただけると大変助かります。</p>
<p>どうぞよろしくお願いいたします。</p>
<p>田中研究室 留学生グループ一同</p>`,
  },

  // ── 正規メール 6: 国際センター（在留資格更新手続き）────────────────────
  {
    id: 'e10',
    folder: 'inbox',
    fromName: '国際センター',
    fromEmail: 'international@meijo-u.ac.jp',
    toName: 'あなた',
    subject: '在留資格更新手続きの注意事項（6月末期限の方へ）',
    preview: '在留期限が6月末の方へ。更新申請に必要な書類と手続きの流れをお知らせします。',
    dateLabel: '5月26日',
    fullDate: '2026年5月26日 13:00',
    isRead: true,
    attachments: [],
    isTrap: false,
    bodyHtml: `<p>各位</p>
<p>国際センターより、在留資格の更新手続きに関する注意事項をお知らせいたします。</p>
<p>在留資格の有効期限が<strong>2026年6月末</strong>の方は、更新申請の受付が3ヶ月前から可能です。早めの申請をおすすめします。</p>
<p><strong>【必要書類】</strong><br>
・在籍証明書（国際センター窓口にて発行、発行まで3営業日）<br>
・成績証明書（学務課にて発行）<br>
・住民票（お住まいの市区町村役場にて発行）</p>
<p>詳細は国際センターウェブサイト、または窓口（1号館2階）にてお問い合わせください。</p>
<p>名城大学 国際センター</p>`,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 5月25日 以前のメール
  // ════════════════════════════════════════════════════════════════════════════

  // ── 正規メール 7: 情報基盤センター（ネットワークメンテナンス）────────────
  {
    id: 'e11',
    folder: 'inbox',
    fromName: '情報基盤センター',
    fromEmail: 'it-center@meijo-u.ac.jp',
    toName: 'あなた',
    subject: '学内ネットワーク 定期メンテナンスのご案内（5月29日実施）',
    preview: '5月29日（金）22:00〜翌5:00の間、学内ネットワークの定期メンテナンスを実施します。',
    dateLabel: '5月25日',
    fullDate: '2026年5月25日 09:00',
    isRead: true,
    attachments: [],
    isTrap: false,
    bodyHtml: `<p>学内の皆様</p>
<p>情報基盤センターより、学内ネットワークの定期メンテナンス実施についてお知らせいたします。</p>
<p><strong>【メンテナンス日時】</strong><br>
日時：2026年5月29日（金）22:00 〜 2026年5月30日（土）05:00<br>
影響範囲：学内全ネットワーク・Wi-Fi・VPN・学内システム全般</p>
<p>メンテナンス中は学内外からの接続が一時的にご利用いただけません。研究・業務データのバックアップをお済ませのうえ、ご準備ください。</p>
<p>ご不便をおかけしますが、ご協力のほどよろしくお願いいたします。</p>
<p>名城大学 情報基盤センター<br>
it-center@meijo-u.ac.jp　内線：1100</p>`,
  },

  // ── 正規メール 8: 学生支援課（後期民間奨学金募集）──────────────────────
  {
    id: 'e12',
    folder: 'inbox',
    fromName: '学生支援課（奨学金係）',
    fromEmail: 'scholarship@meijo-u.ac.jp',
    toName: 'あなた',
    subject: '2026年度後期 民間奨学金の募集案内（申請期限：6月13日）',
    preview: '2026年度後期の民間奨学金の募集を開始しました。申請希望者は6月13日までに窓口へ。',
    dateLabel: '5月23日',
    fullDate: '2026年5月23日 16:00',
    isRead: true,
    attachments: [],
    isTrap: false,
    bodyHtml: `<p>奨学金の申請を希望する学生の皆さんへ</p>
<p>2026年度後期の民間奨学金（外部奨学金）の募集を開始しました。希望者は下記の内容をご確認ください。</p>
<p><strong>【募集概要】</strong><br>
募集奨学財団：名城育英会・中部産業奨学財団 ほか計5団体<br>
対象：大学院生（博士前期・後期課程）<br>
申請期限：2026年6月13日（土）17:00<br>
提出先：学生支援課 奨学金係窓口（1号館1階）</p>
<p>各奨学財団の詳細・申請書類は学生支援課窓口または学生ポータルよりご確認ください。なお、指導教員の推薦書が必要な財団もありますので、早めにご準備ください。</p>
<p>学生支援課 奨学金係<br>
scholarship@meijo-u.ac.jp</p>`,
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MailLayout
// ═══════════════════════════════════════════════════════════════════════════════

type MailLayoutProps = {
  lang?: Lang   // Phase 1-A で URL クエリパラメータから受け取る
}

export default function MailLayout({ lang = 'ja' }: MailLayoutProps) {
  const t = getT(lang)

  const selectedFolder  = useMailStore((s) => s.selectedFolder)
  const selectedId      = useMailStore((s) => s.selectedId)
  const pendingIds      = useMailStore((s) => s.pendingIds)
  const processedMap    = useMailStore((s) => s.processedMap)
  const setSelectedFolder = useMailStore((s) => s.setSelectedFolder)
  const selectEmail       = useMailStore((s) => s.selectEmail)
  const initPending       = useMailStore((s) => s.initPending)
  const processEmail      = useMailStore((s) => s.processEmail)

  // 受信トレイの全メールIDで初期キューを設定
  useEffect(() => {
    const inboxIds = MOCK_EMAILS.filter((e) => e.folder === 'inbox').map((e) => e.id)
    initPending(inboxIds)
  }, [initPending])

  // ── アクションハンドラ ──────────────────────────────────────────────────
  // Phase 8（トラッキング）では、この層で TTA 計測・Supabase INSERT を追加する
  const handleReply = (emailId: string) => {
    // TODO Step2: recordAction(emailId, 'replied', { tta: performance.now() - viewStartTime })
    processEmail(emailId, 'replied')
  }

  const handleForward = (emailId: string) => {
    // TODO Step2: recordAction(emailId, 'forwarded', { tta: performance.now() - viewStartTime })
    processEmail(emailId, 'forwarded')
  }

  const handleDelete = (emailId: string) => {
    // TODO Step2: recordAction(emailId, 'deleted', { tta: performance.now() - viewStartTime })
    processEmail(emailId, 'deleted')
  }

  // ── 現在フォルダのメール一覧（一覧用・本文用に変換）────────────────────
  const folderEmails = MOCK_EMAILS.filter((e) => e.folder === selectedFolder)

  const listEmails: ProvisionalListEmail[] = folderEmails.map((e) => ({
    id: e.id,
    fromName: e.fromName,
    subject: e.subject,
    preview: e.preview,
    dateLabel: e.dateLabel,
    isRead: e.isRead,
    hasAttachment: e.attachments.length > 0,
  }))

  const selectedEmail: ProvisionalEmail | null =
    MOCK_EMAILS.find((e) => e.id === selectedId) ?? null

  // 受信トレイの未処理件数（サイドバーバッジ + リストカウンター）
  const inboxPendingCount =
    selectedFolder === 'inbox' ? pendingIds.length : 0

  const folderLabel =
    selectedFolder === 'inbox'   ? t.inbox   :
    selectedFolder === 'sent'    ? t.sent    :
    t.deleted

  // ── レンダリング ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full overflow-hidden select-none bg-white">

      {/* ── ヘッダー ── */}
      <header className="h-12 flex-shrink-0 flex items-center px-4 gap-4 border-b border-gray-200 bg-white shadow-sm z-10">
        {/* ロゴ */}
        <div className="flex items-center gap-2.5 w-44 flex-shrink-0">
          <div className="w-7 h-7 rounded flex items-center justify-center bg-blue-600 flex-shrink-0">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800 whitespace-nowrap truncate">
            {t.appTitle}
          </span>
        </div>

        {/* 検索バー */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="メールを検索..."
              readOnly
              className="w-full pl-9 pr-4 h-8 text-sm bg-gray-100 rounded-full border-0 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors cursor-text"
            />
          </div>
        </div>

        {/* 右側コントロール */}
        <div className="flex items-center gap-1 ml-auto">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <div className="ml-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none hover:opacity-90 transition-opacity">
              TA
            </div>
          </div>
        </div>
      </header>

      {/* ── 3ペイン本体 ── */}
      <div className="flex flex-1 overflow-hidden">
        <MailSidebar
          selectedFolder={selectedFolder}
          inboxBadge={pendingIds.length}
          t={t}
          onFolderSelect={setSelectedFolder}
        />

        <MailList
          folderLabel={folderLabel}
          emails={listEmails}
          selectedId={selectedId}
          pendingCount={inboxPendingCount}
          processedMap={processedMap as Record<string, EmailAction>}
          onSelect={selectEmail}
        />

        <MailBodyPane
          email={selectedEmail}
          lang={lang}
          onReply={handleReply}
          onForward={handleForward}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
