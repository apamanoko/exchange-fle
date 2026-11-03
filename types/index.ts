/**
 * 対応言語
 */
export type Language = 'ja' | 'en' | 'de' | 'zh' | 'ko' | 'it' | 'vi' | 'es' | 'pl' | 'no' | 'fi'

/**
 * 実験条件
 * L1: 母語条件（ui_lang と email_lang が一致）
 * L2: 外国語条件（ui_lang と email_lang が異なる）
 */
export type Condition = 'L1' | 'L2'

/**
 * 罠の種類（IPAベース4攻撃タイプに対応）
 * domain   : タイポスクワッティング等のドメイン偽装
 * extension: 二重拡張子（.pdf.exe）による拡張子偽装
 * link     : 表示URLとhrefが異なるリンク偽装
 * urgency  : 心理的緊急性による圧力
 * authority: 権威者・組織へのなりすまし
 */
export type TrapType = 'domain' | 'extension' | 'link' | 'urgency' | 'authority'

/**
 * 行動ログのイベント種別
 * ※ action_report_phishing は需要特性排除のため意図的に含めない
 */
export type EventType =
  | 'email_open'        // メール開封
  | 'hover_sender'      // 差出人アドレスホバー（ドメイン検証の試み）
  | 'hover_link'        // リンクホバー（ステータスバーで実URLを確認）
  | 'hover_attachment'  // 添付ファイルホバー（拡張子確認の試み）
  | 'text_select'       // テキスト選択（真偽検証の試み）
  | 'text_copy'         // テキストコピー（真偽検証の試み）
  | 'link_click'        // リンククリック（不審リンクへのアクセス）
  | 'attachment_open'   // 添付ファイルを開く（疑似マルウェア実行）
  | 'action_reply'      // 返信アクション（信頼して対応）
  | 'action_ignore'     // 既読にして放置（判断保留）
  | 'action_block'      // ブロック・報告（危険と判断）
  | 'tab_hidden'        // タブ非アクティブ化（TTA計測から除外するため記録）
  | 'tab_visible'       // タブ再アクティブ化
  | 'devtools_open'     // DevTools 起動検知

/**
 * 添付ファイル
 */
export type Attachment = {
  /** ファイルの実際の名前（例: report_final.pdf.exe） */
  name: string
  /** UIに表示する名前（例: report_final.pdf）← 拡張子偽装に使用 */
  displayName: string
  /** MIMEタイプ（例: application/pdf）← アイコン偽装に使用 */
  mimeType: string
  /** 罠として仕込まれた添付ファイルかどうか */
  isTrapped: boolean
}

/**
 * メールオブジェクト
 */
export type Email = {
  /** メール識別子（例: trap-1-ja, normal-3-en） */
  id: string
  /** このメールの言語 */
  lang: Language
  /** 罠メールかどうか */
  isTrap: boolean
  /** 仕込まれている罠の種類（複数可。正規メールは空配列） */
  traps: TrapType[]
  /** 差出人情報 */
  from: {
    /** 表示名（例: 吉川 教授） */
    display: string
    /** メールアドレス（例: notice@meijo-u-portal.net） */
    address: string
  }
  /** 宛先情報（表示名 + 実アドレス。表示は「表示名 <address>」） */
  to: {
    /** 表示名（例: あなた（TA）） */
    display: string
    /** 実アドレス（例: ta-guest@ccmailg.meijo-u.ac.jp） */
    address: string
  }
  /** 件名（{{D+n}} / {{D-n}} 日付トークンを含められる） */
  subject: string
  /** 本文HTML（{{D+n}} / {{D-n}} トークン可。クライアント側で DOMPurify によるサニタイズ・後処理される） */
  bodyHtml: string
  /** ヘッダ受信日の相対オフセット（今日=0, 昨日=-1）。表示時に baseDate から展開する */
  dateOffsetDays: number
  /** ヘッダ受信時刻（例: '15:00'） */
  dateTime: string
  /** 添付ファイル一覧（添付なしの場合は省略可） */
  attachments?: Attachment[]
}

/**
 * Supabase `sessions` テーブルの行型（SELECT結果の完全な型）
 */
export type Session = {
  /** UUID PK: gen_random_uuid() */
  id: string
  /** システム生成の識別コード。Googleフォームとの結合キー（例: EXP-A3K9Z1） */
  participant_code: string
  /** UIの表示言語（SUPPORTED_LANGS に準拠） */
  ui_lang: Language
  /** 実験内で使用するL1言語（SUPPORTED_LANGS に準拠） */
  l1_lang: Language
  /** 実験条件。ui_lang === l1_lang なら "L1"、異なれば "L2" */
  condition: Condition
  /** 使用したメールセットの識別子 */
  email_set_id: string
  /** セッション開始時刻（ISO 8601文字列） */
  started_at: string
  /** セッション完了時刻（null = 未完了） */
  completed_at: string | null
  /** 画面録画ファイルURL（null = 未録画） */
  screen_recording_url: string | null
}

/** sessions テーブルへのINSERT型（DB自動生成カラムを除く） */
export type SessionInsert = Omit<Session, 'id' | 'started_at'>

/**
 * Supabase `experiment_logs` テーブルへのINSERT型（id・created_at はDB自動生成）
 */
export type ExperimentLogInsert = {
  /** 対応するセッションのUUID（sessions.id への外部キー） */
  session_id: string
  /** メール識別子（Email.id と一致） */
  email_id: string
  /** そのメールの表示言語 */
  email_lang: string
  /** イベント種別 */
  event_type: EventType
  /** ホバー系イベントの継続時間（ms）。hover_sender / hover_link / hover_attachment のみ。それ以外は null */
  duration_ms?: number | null
  /** link_click のURL、text_copy のテキスト等。それ以外は null */
  value?: string | null
  /** そのメールのスロット番号（1〜16）。提示順の特定に使用 */
  slot_index?: number | null
  /** 罠の提示回数（1回目=1 / 2回目=2）。通常メールは null */
  exposure_index?: number | null
}

/**
 * ITリテラシースコア
 * 「結果（騙されたか）」ではなく「プロセス（どう確認したか）」で評価する
 * 重み: domain30% + link25% + urgency25% + extension10% + text10% = 100%
 */
export type LiteracyScore = {
  /** ドメイン検証スコア（重み30%）: hover_sender合計ms ÷ 閾値2000ms × 100 */
  domainVerification: number
  /** リンク検証スコア（重み25%）: リンク罠メールに対するhover_linkイベント発生比率 */
  linkInspection: number
  /** 焦り耐性スコア（重み25%）: 罠メールTTAの中央値（≥8000ms→100点、<2000ms→0点） */
  urgencyResistance: number
  /** 拡張子確認スコア（重み10%）: 拡張子罠メールでhover_attachmentが発生したか */
  extensionAwareness: number
  /** テキスト検証スコア（重み10%）: text_selectまたはtext_copyが1件以上あるか */
  textVerification: number
  /** 重み付き総合スコア（0〜100） */
  overallScore: number
}

/**
 * 罠メールごとの最終結果
 */
export type TrapResult = {
  /** 罠メールの ID（例: trap-1-ja） */
  trapId: string
  /** 攻撃タイプ（1〜4） */
  attackType: number
  /** そのメールの言語（例: 'ja', 'en'） */
  lang: string
  /** 提示スロット（1〜16）。同一 email_id のログの非null行から取得 */
  slotIndex: number | null
  /** 罠の提示回数（1回目=1 / 2回目=2）。非null行から取得 */
  exposureIndex: number | null
  /** 最終的に選択したアクション（replied=返信 / ignored=判断保留 / blocked=正しく排除） */
  finalAction: 'replied' | 'ignored' | 'blocked'
  /** 最終アクションまでの TTA（ms） */
  ttaMs: number
  /** 罠にかかったか = 同一メールに link_click または attachment_open が1件でもあれば true */
  fellForTrap: boolean
  /** 罠に返信したか（reply）。fell とは別に記録する */
  repliedToTrap: boolean
}
