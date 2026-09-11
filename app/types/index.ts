// ─────────────────────────────────────────────────────────────────────────────
// app/types/index.ts  —  Phase 1-C
// 本番型定義。仮型（Provisional*）はすべてこのファイルに集約する。
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from '../lib/i18n'

/** 対応言語（i18n.ts の Lang 型と同一） */
export type Language = Lang

/**
 * IPAインシデント事例に基づく罠タイプ識別子。
 * 複数タイプの組み合わせ（例: T1+T3+T4）を Email.traps 配列で表現する。
 */
export type TrapType =
  | 'T1' // ドメイン偽装（タイポスクワッティング。例: meijo-u-portal.net）
  | 'T2' // 二重拡張子（.pdf.exe）+ PDFアイコン偽装
  | 'T3' // リンク偽装（表示URLとhrefが異なる。ステータスバーで検出可能）
  | 'T4' // 心理的圧力（緊急性・期限・アカウント停止脅迫）
  | 'T5' // 権威・同郷の悪用（権威者なりすまし・同国人コミュニティ騙り）

/** メール添付ファイル */
export interface Attachment {
  /** ファイル名（二重拡張子を含む完全な名前。例: "成績報告書_最終版.pdf.exe"） */
  name: string
  /** 表示用ファイルサイズ文字列（例: "3.2 MB"） */
  size: string
  /** T2トラップフラグ: .pdf.exe 等、ユーザーを欺く意図で設計された添付ファイル */
  isTrapped: boolean
}

/** メールデータ本体（実験セッションで使用する単一メールを表す） */
export interface Email {
  /** メール一意識別子（例: "e01"） */
  id: string
  /** このメールの表示言語 */
  lang: Language
  /** 罠メールフラグ（true = 実験用フィッシングメール） */
  isTrap: boolean
  /** 適用されているトラップタイプ。複数組み合わせ可。正規メールは空配列 */
  traps: TrapType[]
  /** 差出人情報 */
  from: {
    /** 表示名（例: "名城大学 情報サービスセンター"） */
    display: string
    /** メールアドレス（例: "notice@meijo-u-portal.net"） */
    address: string
  }
  /** 宛先表示名（例: "あなた"） */
  to: string
  /** 件名 */
  subject: string
  /** 本文HTML（クライアント側で processBodyHtml() によりサニタイズ・後処理される） */
  bodyHtml: string
  /** 表示用日時文字列（例: "2026年5月28日 11:47"） */
  date: string
  /** 添付ファイル一覧（添付なしの場合は省略可） */
  attachments?: Attachment[]
}

/** メールフォルダ識別子 */
export type FolderId = 'inbox' | 'sent' | 'deleted'

/**
 * メールに対するユーザーアクション種別。
 * action_report_phishing は Hawthorne 効果排除のため意図的に定義しない。
 */
export type EmailAction = 'replied' | 'ignored' | 'blocked'

/**
 * 行動ログのイベント種別（experiment_logs.event_type カラムに格納）。
 * action_report_phishing は研究設計上意図的に定義しない。
 */
export type EventType =
  | 'email_open'       // メール開封（MailBodyPane への表示切り替え）
  | 'hover_sender'     // 差出人アドレス上にホバー（ドメイン検証の試み）
  | 'hover_link'       // リンク上にホバー（ステータスバーで実URLを確認）
  | 'hover_attachment' // 添付ファイル上にホバー（拡張子確認の試み）
  | 'text_select'      // テキスト選択（真偽検証の試み）
  | 'text_copy'        // テキストコピー（真偽検証の試み）
  | 'link_click'       // リンククリック（不審リンクへのアクセス）
  | 'attachment_open'  // 添付ファイルを開く操作（疑似マルウェア実行）
  | 'action_reply'     // 返信アクション（信頼して対応）
  | 'action_ignore'    // 既読にして放置（判断保留）
  | 'action_block'     // ブロック・報告（危険と判断）
  | 'tab_hidden'       // タブ非アクティブ化（TTA計測から除外するため記録）
  | 'tab_visible'      // タブ再アクティブ化
  | 'devtools_open'    // DevTools 開検出（ウィンドウ内外サイズ差による推定）

/** Supabase `sessions` テーブルの行型（SELECT結果の完全な型） */
export interface Session {
  /** UUID PK: gen_random_uuid() */
  id: string
  /** システム生成の識別コード。Googleフォームとの結合キー（例: "EXP-A3K9Z1"） */
  participant_code: string
  /** UIの表示言語（SUPPORTED_LANGS に準拠） */
  ui_lang: string
  /** 実験内で使用するL1言語（SUPPORTED_LANGS に準拠） */
  l1_lang: string
  /** 実験条件。ui_lang === l1_lang なら "L1"、異なれば "L2" */
  condition: 'L1' | 'L2'
  /** 使用したメールセットの識別子（Phase 2-A で確定） */
  email_set_id: string
  /** セッション開始時刻（DEFAULT now()、ISO 8601文字列） */
  started_at: string
  /** セッション完了時刻（null = 未完了） */
  completed_at: string | null
  /** 画面録画ファイルURL（null = 未録画。将来の MediaRecorder 対応で使用） */
  screen_recording_url: string | null
}

/** Supabase `sessions` テーブルへのINSERT型（DB自動生成カラムを除く） */
export type SessionInsert = Omit<Session, 'id' | 'started_at'>

/** Supabase `experiment_logs` テーブルへのINSERT型（id・created_at はDB自動生成） */
export interface ExperimentLogInsert {
  /** 対応するセッションのUUID（sessions.id への外部キー） */
  session_id: string
  /** メール識別子（Email.id と一致） */
  email_id: string
  /** そのメールの表示言語 */
  email_lang: string
  /** イベント種別 */
  event_type: EventType
  /**
   * ホバー系イベントの継続時間（ms）。
   * hover_sender / hover_link / hover_attachment にのみセット。それ以外は null。
   */
  duration_ms: number | null
  /**
   * イベント補足情報。
   * link_click → クリックされたURL、text_copy → コピーされたテキスト、それ以外は null。
   */
  value: string | null
}

/** ITリテラシースコア（「結果」ではなく「プロセス」を評価する5軸スコア） */
export interface LiteracyScore {
  /**
   * ドメイン検証スコア（重み 30%）
   * 算出: 罠メールでの hover_sender 合計 ms ÷ 閾値 2000ms × 100（上限 100）
   */
  domainVerification: number
  /**
   * リンク検証スコア（重み 25%）
   * 算出: 罠メールのリンク数に対する hover_link イベント発生比率 × 100
   */
  linkInspection: number
  /**
   * 緊急性耐性スコア（重み 25%）
   * 算出: 罠メールTTAの中央値。≥8000ms → 100点、<2000ms → 0点、線形補間
   */
  urgencyResistance: number
  /**
   * 拡張子確認スコア（重み 10%）
   * 算出: 添付罠メールでの hover_attachment 発生 → 100、未発生 → 0
   */
  extensionAwareness: number
  /**
   * テキスト検証スコア（重み 10%）
   * 算出: text_select または text_copy の発生 → 100、未発生 → 0
   */
  textVerification: number
  /** 5軸の加重合計スコア（0〜100） */
  overallScore: number
}
