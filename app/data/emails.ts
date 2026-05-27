export type Folder = {
  id: string
  label: string
  unreadCount: number
}

export type Email = {
  id: string
  from: string
  fromEmail: string
  to: string
  subject: string
  preview: string
  body: string
  dateLabel: string
  fullDateLabel: string
  isRead: boolean
  folder: 'inbox' | 'drafts' | 'sent' | 'junk' | 'trash'
  hasAttachment: boolean
  attachmentName?: string
  attachmentSize?: string
  isTrap?: boolean
}

export const EMAILS: Email[] = [
  {
    id: '1',
    from: '国際センター',
    fromEmail: 'international@meijo-u.ac.jp',
    to: 'あなた',
    subject: '在留資格更新セミナーのご案内（6月開催）',
    preview: '来月、在留資格更新に関するセミナーを開催いたします。参加ご希望の方はお早めに...',
    body: `在留資格更新セミナーのご案内

各位

国際センターよりご連絡いたします。

来る6月12日（木）、在留資格の更新手続きに関するセミナーを開催いたします。在留資格の期限が近い方、または更新手続きについてご不明な点がある方はぜひご参加ください。

【開催概要】
日時：2026年6月12日（木）14:00〜16:00
場所：国際センター会議室（1号館3階）
定員：30名（先着順）

参加をご希望の方は、5月30日（金）までに国際センター窓口またはメールにてお申し込みください。

ご不明な点がございましたら、国際センターまでお問い合わせください。

名城大学 国際センター
international@meijo-u.ac.jp`,
    dateLabel: '昨日',
    fullDateLabel: '2026年5月20日 10:30',
    isRead: true,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '2',
    from: '学務課',
    fromEmail: 'gakumu@meijo-u.ac.jp',
    to: 'あなた',
    subject: '【重要】前期履修登録の最終確認について',
    preview: '前期の履修登録期間が5月25日に終了します。登録内容を必ずご確認ください。',
    body: `前期履修登録の最終確認について

学生各位

学務課よりお知らせいたします。

前期の履修登録期間が2026年5月25日（月）23:59をもって終了します。履修登録が完了していない方、または登録内容を変更したい方は、期限内にポータルサイトより手続きを行ってください。

期限を過ぎると、登録内容の変更はできなくなりますので、ご注意ください。

【確認事項】
・登録単位数の上限（年間48単位）を超えていないか
・必修科目が漏れなく登録されているか
・時間割に重複がないか

不明な点がある場合は、学務課（内線: 1234）または窓口（1号館1階）にてご相談ください。

学務課`,
    dateLabel: '今日',
    fullDateLabel: '2026年5月21日 09:00',
    isRead: false,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '3',
    from: '田中 誠二 教授',
    fromEmail: 'tanaka.s@meijo-u.ac.jp',
    to: 'あなた',
    subject: '来週のゼミについて（日程変更のお知らせ）',
    preview: '来週月曜のゼミですが、急遽日程を変更せざるを得なくなりました。ご確認ください。',
    body: `来週のゼミについて

お疲れ様です。田中です。

来週月曜日（5月27日）のゼミですが、急遽学内会議が入ってしまったため、日程を変更させてください。

変更後：5月28日（火）15:00〜17:00、研究室（8号館512）

参加可否について、今週中に返信いただけますか。また、発表予定の方は変更後の日程でも発表の準備をよろしくお願いします。

来週のゼミでは以下の発表を予定しています：
1. 実験データの中間報告（発表者: あなた）
2. 関連研究のサーベイ（発表者: 李さん）

何かご都合のつかない場合は遠慮なくご連絡ください。

田中`,
    dateLabel: '5月19日',
    fullDateLabel: '2026年5月19日 16:45',
    isRead: true,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '4',
    from: '附属図書館',
    fromEmail: 'library@meijo-u.ac.jp',
    to: 'あなた',
    subject: '貸出資料の返却期限が近づいています',
    preview: '現在ご利用中の資料の返却期限が3日後に迫っています。延長はポータルよりお手続きを。',
    body: `貸出資料の返却期限のお知らせ

附属図書館よりお知らせです。

以下の貸出資料の返却期限が近づいています。

【返却期限：2026年5月24日（日）】
・サイバーセキュリティの基礎と実践（山田太郎 著）
・認知心理学入門（第2版）

返却は図書館カウンターへ直接お持ちください。延長をご希望の場合は、ポータルサイト「図書館サービス」より延長手続きができます（延長は1回のみ可能）。

延滞が発生した場合、延滞日数×貸出冊数分の貸出停止期間が設けられますのでご注意ください。

名城大学附属図書館`,
    dateLabel: '今日',
    fullDateLabel: '2026年5月21日 08:00',
    isRead: false,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '5',
    from: 'Ahmad Karimi',
    fromEmail: 'ahmad.karimi.0247@st.meijo-u.ac.jp',
    to: 'あなた',
    subject: '緊急のお願い：ビザの件でご相談があります',
    preview: 'お世話になっております。Ahmadです。在留カードの更新について急ぎご相談したいことがあります...',
    body: `お世話になっております。Ahmadです。

突然のご連絡、大変失礼いたします。先日の研究室の懇親会でご挨拶させていただきました。

実は大変困った状況にあり、ご相談させていただきたく連絡しました。来週、在留資格の更新手続きの期限が迫っているのですが、申請書類の記入に不明な点があり、とても困っています。

日本語での行政手続きはまだ慣れておらず、同じ研究室の先輩にお願いできる方が見当たらなかったため、あなたにご連絡しました。

お手数をおかけして大変申し訳ありませんが、添付のファイルをダウンロードして実行いただくと、私の申請書類の内容が確認できます。問題がないかご確認のうえ、アドバイスをいただけると大変助かります。

お時間のある時で構いません。どうぞよろしくお願いいたします。

Ahmad Karimi
情報工学研究科 博士前期課程1年`,
    dateLabel: '今日',
    fullDateLabel: '2026年5月21日 11:22',
    isRead: false,
    folder: 'inbox',
    hasAttachment: true,
    attachmentName: '在留カード申請書類_確認用.exe',
    attachmentSize: '2.4 MB',
    isTrap: true,
  },
  {
    id: '6',
    from: '学生支援課',
    fromEmail: 'student-support@meijo-u.ac.jp',
    to: 'あなた',
    subject: '学生証の有効期限更新手続きのご案内',
    preview: '本年度の学生証有効期限のシールの配布を開始いたしましたのでお知らせします。',
    body: `学生証の有効期限更新手続きのご案内

学生各位

学生支援課よりお知らせいたします。

本年度の学生証有効期限のシールの配布を開始しましたのでお知らせいたします。

【配布期間】
2026年5月1日（木）〜 6月30日（月）

【配布場所】
学生支援課窓口（1号館1階）
平日 9:00〜17:00

学生証を持参の上、窓口にてお申し出ください。シールの貼付作業はその場で行います。

本手続きを行わないと、図書館や施設利用時に学生証が使用できなくなる場合がありますので、お早めにお手続きください。

学生支援課`,
    dateLabel: '5月15日',
    fullDateLabel: '2026年5月15日 14:00',
    isRead: true,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '7',
    from: '情報基盤センター',
    fromEmail: 'it-support@meijo-u.ac.jp',
    to: 'あなた',
    subject: '【予告】学内ネットワーク緊急メンテナンスのお知らせ',
    preview: '5月24日（土）深夜から翌朝にかけて、ネットワーク設備のメンテナンスを実施いたします。',
    body: `学内ネットワーク緊急メンテナンスのお知らせ

情報基盤センターよりお知らせいたします。

下記の日程にて、学内ネットワーク設備のメンテナンス作業を実施いたします。作業中は、学内ネットワークおよびインターネット接続が一時的にご利用いただけなくなります。

【作業日時】
2026年5月24日（土）23:00 〜 5月25日（日）5:00（予定）

【影響範囲】
・学内Wi-Fi（全エリア）
・有線LAN
・学内ポータルシステム

ご不便をおかけしますが、何卒ご理解・ご協力のほどよろしくお願いいたします。
ご不明な点は情報基盤センター（it-support@meijo-u.ac.jp）までご連絡ください。

情報基盤センター`,
    dateLabel: '5月17日',
    fullDateLabel: '2026年5月17日 10:00',
    isRead: true,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '8',
    from: '学生支援課（奨学金係）',
    fromEmail: 'scholarship@meijo-u.ac.jp',
    to: 'あなた',
    subject: '【締切間近】2026年度前期 奨学金継続申請について',
    preview: '奨学金の継続申請の締め切りが迫っております。5月30日（金）17時までに手続きを。',
    body: `奨学金継続申請について（締切間近）

奨学金受給者の方へ

現在奨学金を受給されている方で、2026年度前期も継続して受給を希望される方は、以下の期限内に所定の手続きを行ってください。

【申請期限】
2026年5月30日（金）17:00

【提出書類】
1. 奨学金継続願（ポータルよりダウンロード）
2. 成績証明書（学務課にて発行）
3. 家族の収入証明（前年度分）

書類は学生支援課奨学金係窓口（1号館1階）へ直接提出してください。郵送は受け付けておりません。

期限を過ぎると受給が停止となりますのでご注意ください。

学生支援課 奨学金係`,
    dateLabel: '今日',
    fullDateLabel: '2026年5月21日 09:30',
    isRead: false,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '9',
    from: 'Noreply（論文投稿システム）',
    fromEmail: 'noreply@academic.meijo-u.ac.jp',
    to: 'あなた',
    subject: '論文投稿システム：パスワードリセット完了',
    preview: 'パスワードのリセットが正常に完了しました。このメールに心当たりがない場合は直ちにご連絡ください。',
    body: `パスワードリセット完了のお知らせ

このメールは、名城大学学術論文投稿システムのパスワードリセット完了をお知らせするためのものです。

お客様のパスワードが正常にリセットされました。

リセット日時：2026年5月18日 13:47:22

このメールに心当たりがない場合は、直ちに情報基盤センター（it-support@meijo-u.ac.jp）にご連絡ください。

※このメールは自動配信されています。このメールへの返信には対応できません。

名城大学 学術論文投稿システム`,
    dateLabel: '5月18日',
    fullDateLabel: '2026年5月18日 13:47',
    isRead: true,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
  {
    id: '10',
    from: '国際交流サークル JINS',
    fromEmail: 'jins-circle@st.meijo-u.ac.jp',
    to: 'あなた',
    subject: '前期活動報告会の日程について（6月開催）',
    preview: '今年度前期の活動報告会の日程が確定しましたのでお知らせします。発表希望の方はご連絡を。',
    body: `前期活動報告会の日程について

JINS会員の皆さんへ

お疲れ様です。JINS代表の鈴木です。

今年度前期の活動報告会の日程が確定しましたのでお知らせします。

【活動報告会】
日時：2026年6月20日（土）13:00〜16:00
場所：大学会館 多目的ホール

発表希望の方は6月10日までにLINEグループにてお知らせください。また、当日は軽食を用意する予定ですので、参加・不参加を問わず6月5日までに出欠をお知らせいただけると助かります。

今年度も楽しい活動を一緒に作っていきましょう！

JINS代表 鈴木`,
    dateLabel: '5月14日',
    fullDateLabel: '2026年5月14日 19:30',
    isRead: true,
    folder: 'inbox',
    hasAttachment: false,
    isTrap: false,
  },
]

const inboxUnread = EMAILS.filter((e) => !e.isRead && e.folder === 'inbox').length

export const FOLDERS: Folder[] = [
  { id: 'inbox', label: '受信トレイ', unreadCount: inboxUnread },
  { id: 'drafts', label: '下書き', unreadCount: 1 },
  { id: 'sent', label: '送信済み', unreadCount: 0 },
  { id: 'junk', label: '迷惑メール', unreadCount: 0 },
  { id: 'trash', label: 'ゴミ箱', unreadCount: 0 },
]
