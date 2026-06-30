# 研究コンテキスト：多言語環境におけるフィッシング感受性の検証

> このファイルはプロジェクトの永続的なコンテキストとして保持される。

---

## 【研究の全容】

### 1. 研究テーマ

留学生のフィッシング感受性および脅威シミュレーションにおける**外国語効果（FLE: Foreign Language Effect）**の検証と、AI主導のITリテラシー向上システムの構築。

---

### 2. 研究の背景と最終ゴール

現代のサイバー攻撃において、母語（L1）と滞在国言語（L2）を使い分ける留学生などの「多言語話者」は、言語の切り替えが意思決定に影響を与える「外国語効果（FLE）」の影響を強く受ける。

#### 目的・最終ゴール


| #   | ゴール                        | 概要                                                                                     |
| --- | -------------------------- | -------------------------------------------------------------------------------------- |
| ①   | **認知的脆弱性の証明**              | 日本語・ドイツ語等「高資源言語」環境で実験し、技術的フィルタの不備というノイズを排除した上で、L1が心理的防御を突破する純粋なメカニズムを証明する              |
| ②   | **普遍的な防御ナッジの策定**           | インバウンド増加を見据え、外国人材を狙った標的型攻撃への言語非依存設計指針を策定する                                             |
| ③   | **【最終ゴール】ITリテラシーの精密測定と向上** | 実験（TA業務シミュレーション）をベースとし、被験者のITリテラシーを「結果（騙されたか）」ではなく「**プロセス（どう確認したか）**」で詳細に測定するシステムを構築する |
| ④   | **限界を超えたAIフィードバック**        | 詳細な行動ログ（確認作業の抜け漏れや心理的な焦り）に基づき、高度なAIフィードバックを提供し、実践的な知識定着と行動変容を促す                        |


---

### 3. 実験対象と統制条件

- **対象A**：日本在住の留学生（L1 ≠ 日本語）
- **対象B**：ドイツ在住の日本人学生（L1 ＝ 日本語）
- **統制**：語学力不足によるノイズを防ぐため、CEFRのB1相当以上に限定

---

### 4. 実験プロトコル【v3：言語混在セッション設計】

#### 4-1. 言語の自然な混在（カバーストーリー）

**設計方針**：日本語環境とL1環境を別セッションで分けるのではなく、**1回の実験セッション内で日本語メールとL1（母語等）メールをランダムに混在**させる。

**実験前に提示するカバーストーリー（必須）**：

> 「日本語と母語の両方でメールが送信されています。日本語が不得意な学生や、あなたと出身が同じ職場の友人からは、英語やあなたの母語でメールが送信されるためです。あらかじめご理解をお願いします。」

#### 4-2. 等価ペア設計（Matched Pairs）

FLEを正確に比較するため、L1とL2のメールは「完全に同一の文章の翻訳」ではなく、**「特性・要求レベルが等価な別シナリオ」**として設計する。全被験者が「同じ認知的難易度のタスク」を処理する状態を担保する。

#### 4-3. メール数設計（統計的妥当性）


| 種別              | 推奨数        |
| --------------- | ---------- |
| 通常メール（日本語）      | 5〜6通       |
| 通常メール（L1）       | 5〜6通       |
| 罠メール（日本語）× 4タイプ | 4通         |
| 罠メール（L1）× 4タイプ  | 4通         |
| **合計**          | **18〜20通** |


> **今後の課題**：検出力分析（Power Analysis）により、必要サンプル数とメール数を最終決定する。

---

### 5. トラップ（罠メール）設計要件【IPA事例ベース】

IPAが報告する「標的型攻撃」および「BEC」の実インシデントパターンを大学事務・TA業務の文脈に翻訳した4攻撃タイプを採用する。

#### 攻撃タイプ1：【BEC】取引先・海外ベンダーなりすまし


| 項目         | 内容                                            |
| ---------- | --------------------------------------------- |
| **ドメイン偽装** | タイポスクワッティング（例：`@oxf0rd-edu.com`）              |
| **文面**     | 「システム改修に伴い振込先口座を変更。確認書類を添付する」                 |
| **添付罠**    | 二重拡張子（`.pdf.exe`）の疑似マルウェア                     |
| **計測ポイント** | hover_sender・hover_attachment・attachment_open |


#### 攻撃タイプ2：【BEC】権威者なりすまし（CEO詐欺）


| 項目         | 内容                                                      |
| ---------- | ------------------------------------------------------- |
| **ドメイン偽装** | 表示名は本物、アドレスはフリーメール（例：`yoshikawa.nagoya.univ@gmail.com`） |
| **文面**     | 「海外出張中で電話不可。至急このリンクから個人情報を入力・共有してほしい」                   |
| **リンク罠**   | 表示URLは正規サービス、hrefは攻撃者の偽URL                              |
| **計測ポイント** | TTA・hover_sender・hover_link・link_click                  |


#### 攻撃タイプ3：【標的型】業務継続メールの乗っ取り


| 項目         | 内容                                     |
| ---------- | -------------------------------------- |
| **件名偽装**   | `Re: 奨学金の申請について`（過去業務の継続に見せかける）        |
| **文面**     | 「書類の不備を修正しました。パスワード付きZIPで再送。解凍PW：2024」 |
| **添付罠**    | 二重拡張子（`.pdf.exe`）＋PDFアイコン偽装            |
| **計測ポイント** | TTA・hover_attachment・attachment_open   |


#### 攻撃タイプ4：【フィッシング】インフラ・共通システム偽通知


| 項目         | 内容                                                                                |
| ---------- | --------------------------------------------------------------------------------- |
| **件名**     | 「【重要】全学メールシステムのセキュリティアップデートについて」                                                  |
| **リンク偽装**  | 表示：`https://portal.meijo-u.ac.jp/update`、href：`https://meijo-u-setting.com/login` |
| **ドメイン偽装** | `@meijo-u-setting.com`（正規は`@meijo-u.ac.jp`）                                       |
| **計測ポイント** | hover_sender・hover_link・text_select・link_click                                    |


#### 罠要素マトリクス


| 攻撃タイプ               | ドメイン偽装   | リンク偽装 | 拡張子偽装 | 緊急性 | 権威悪用 |
| ------------------- | -------- | ----- | ----- | --- | ---- |
| Type 1 BEC（ベンダー）    | ✓        |       | ✓     |     |      |
| Type 2 BEC（上長）      | ✓（Gmail） | ✓     |       | ✓   | ✓    |
| Type 3 標的型（乗っ取り）    |          |       | ✓     |     | ✓    |
| Type 4 フィッシング（インフラ） | ✓        | ✓     |       | ✓   | ✓    |


---

## 【システム開発要件】

### 1. 技術スタック


| 領域        | 技術                                                           |
| --------- | ------------------------------------------------------------ |
| フロントエンド   | Next.js (App Router), Tailwind CSS, TypeScript, lucide-react |
| バックエンド・DB | Supabase (PostgreSQL)                                        |
| ホスティング    | Vercel                                                       |
| 疑似マルウェア   | Windows用実行ファイル                                               |


---

### 2. コア機能要件

- **UI構成**：Outlook/Gmail風の3ペイン構成（左:トレイ、中央:メール一覧、右:本文+アクション）
- **アクションボタン**：「返信」「転送」「削除」の3種のみ。フィッシング報告ボタンは実装しない（需要特性・Hawthorne効果の排除）
- **実験の統制**：受信メールデータはJSONファイルとしてフロントエンドに静的にハードコード
- **言語混在設計**：1セッション内でL1・L2メールを自然に混在させる
- **対応言語**：日本語（ja）・英語（en）・ドイツ語（de）・中国語（zh）・韓国語（ko）・イタリア語（it）・スペイン語（es）の7言語

---

### 3. Googleフォームとのデータリンク設計【v5：entry ID確定】

事前・事後アンケートはGoogleフォームで実施し、システムの行動ログと `participant_code` を共通キーとして後からJOINする方式を採用する。被験者の `ui_lang` に応じて日本語/英語フォームを自動で振り分ける。

#### フォーム一覧（entry ID確定済み）


| フォーム     | 対象        | 短縮URL                       | Form ID                                                    | entry ID          |
| -------- | --------- | --------------------------- | ---------------------------------------------------------- | ----------------- |
| **事前EN** | 日本滞在の留学生  | forms.gle/HWs82eEQbQA1tnre6 | `1FAIpQLSe2N5KdG4G5FtFq8NXNDEuvr_WB8T4BwUa4If92vyQ2xv8wQw` | `entry.459914088` |
| **事後EN** | 日本滞在の留学生  | forms.gle/jsLC484Eif13UvB37 | `1FAIpQLSdiv2paseFunGmyeilajRiq_czY3gxQc9mh7Y9oCQfsXKiOeA` | `entry.561643019` |
| **事前JA** | ドイツ滞在の日本人 | forms.gle/BXKw1raMsau5s67k6 | `1FAIpQLSejpJjAmzrrpAqcljVXdzSAJBVac_O2mcirA7uRvKe1f6rZsA` | `entry.319892986` |
| **事後JA** | ドイツ滞在の日本人 | forms.gle/7VwdSF2mvqj1crVMA | `1FAIpQLScNxnhofGtlXRgDd9t1vGR5Cn1d4pwuAaZmFtJUf5xttvCo6w` | `entry.635950766` |


#### 振り分けロジック

`ui_lang === 'ja'` → 日本語フォームペア（事前JA・事後JA）  
`ui_lang` がそれ以外（en/de/zh/ko/it/es）→ 英語フォームペア（事前EN・事後EN）

#### 実装定数（/lib/formUrls.ts）

```typescript
const FORM_BASE = 'https://docs.google.com/forms/d/e'

export const FORM_URLS = {
  ja: {
    pre:  `${FORM_BASE}/1FAIpQLSejpJjAmzrrpAqcljVXdzSAJBVac_O2mcirA7uRvKe1f6rZsA/viewform`,
    post: `${FORM_BASE}/1FAIpQLScNxnhofGtlXRgDd9t1vGR5Cn1d4pwuAaZmFtJUf5xttvCo6w/viewform`,
    preEntryId:  'entry.319892986',
    postEntryId: 'entry.635950766',
  },
  en: {
    pre:  `${FORM_BASE}/1FAIpQLSe2N5KdG4G5FtFq8NXNDEuvr_WB8T4BwUa4If92vyQ2xv8wQw/viewform`,
    post: `${FORM_BASE}/1FAIpQLSdiv2paseFunGmyeilajRiq_czY3gxQc9mh7Y9oCQfsXKiOeA/viewform`,
    preEntryId:  'entry.459914088',
    postEntryId: 'entry.561643019',
  },
} as const

export function getFormUrls(uiLang: string, participantCode: string) {
  const f = uiLang === 'ja' ? FORM_URLS.ja : FORM_URLS.en
  return {
    preUrl:  `${f.pre}?usp=pp_url&${f.preEntryId}=${participantCode}`,
    postUrl: `${f.post}?usp=pp_url&${f.postEntryId}=${participantCode}`,
  }
}

```

#### システム側の実装要件

- 実験開始画面（`/`）でシステムが `participant_code` を自動生成（形式：`EXP-{6桁英数字}`）
- 事前アンケートのプリフィルURLを実験開始前に「こちらのフォームにご回答ください」として提示
- 事後アンケートのプリフィルURLを実験終了・フィードバック表示後に提示
- `participant_code` はSupabaseの `sessions` テーブルに保存し、外部JOINのキーとなる
- フォームは新しいタブで開く（実験画面を閉じさせない）

#### データ分析時のJOIN

```python
# Python（pandas）での結合例
df = pd.merge(
    supabase_df,   # sessions + experiment_logs
    form_df,       # Google Sheetsエクスポート
    left_on='participant_code',
    right_on='参加者コード',  # または 'Participant Code'
    how='inner'
)

```

---

### 4. 画面録画要件


| 方針      | 内容                                                                 |
| ------- | ------------------------------------------------------------------ |
| **推奨**  | MediaRecorder API（ブラウザ内蔵）でシステム内に実装。録画データはSupabase StorageまたはローカルDL |
| **代替**  | OBS Studio等の外部ツール（実験コスト低、データ管理は手動）                                 |
| **現時点** | 被験者数・ストレージコスト確定後に最終決定。**スキーマ上はscreen_recording_urlカラムを確保しておく**     |


プライバシー：インフォームドコンセントに録画の旨を明示し、研究目的以外の不使用を明記すること。

---

### 5. 行動トラッキング要件（超重要）

被験者の微細な行動をミリ秒単位で計測し、`experiment_logs` テーブルに非同期でインサートする。


| #   | 項目                  | 単位      | 目的                           |
| --- | ------------------- | ------- | ---------------------------- |
| ①   | TTA（Time To Action） | ms      | 開封〜アクションまでの総時間。タブ非アクティブ時間は除外 |
| ②   | 差出人アドレスホバー時間        | ms      | ドメイン検証の試み（250ms未満はノイズ除外）     |
| ③   | リンクURLインスペクト時間      | ms      | クリックせずツールチップで実URLを確認した時間     |
| ④   | 拡張子確認挙動             | ms      | 添付ファイルへのホバー時間                |
| ⑤   | テキスト選択・コピー          | Boolean | 真偽検証の意図                      |
| ⑥   | アクション結果             | Boolean | 不審リンククリック・疑似マルウェア実行の有無       |


**event_type定義**：

```
email_open, hover_sender, hover_link, hover_attachment,
text_select, text_copy, link_click, attachment_open,
action_reply, action_forward, action_delete,
tab_hidden, tab_visible

```

※ `action_report_phishing` は意図的に定義しない

---

### 6. Supabaseテーブル設計

#### テーブル構成

```
sessions              ← 実験セッション（participant_codeを保持し外部JOINキーとなる）
    ↓ 1:N
experiment_logs       ← 行動ログ（ミリ秒単位）

```

> **v4変更点**：`participants` テーブルは廃止。被験者属性はGoogleフォーム（Google Sheets）で管理し、`participant_code` でJOINする。システムDBはセッション・行動ログに専念してシンプルに保つ。

#### sessions テーブル


| カラム                    | 型           | 内容                             |
| ---------------------- | ----------- | ------------------------------ |
| `id`                   | UUID PK     | gen_random_uuid()              |
| `participant_code`     | TEXT UNIQUE | システム生成の識別コード（Googleフォームとの共通キー） |
| `ui_lang`              | TEXT        | UIの表示言語                        |
| `l1_lang`              | TEXT        | 実験内で使用するL1言語                   |
| `condition`            | TEXT        | L1 / L2（自動判定）                  |
| `email_set_id`         | TEXT        | 使用したメールセットの識別子                 |
| `started_at`           | TIMESTAMPTZ | DEFAULT now()                  |
| `completed_at`         | TIMESTAMPTZ | nullable                       |
| `screen_recording_url` | TEXT        | 録画ファイルURL（nullable）            |


#### experiment_logs テーブル


| カラム           | 型            | 内容                 |
| ------------- | ------------ | ------------------ |
| `id`          | BIGSERIAL PK |                    |
| `session_id`  | UUID FK      | → sessions.id      |
| `email_id`    | TEXT         | メール識別子             |
| `email_lang`  | TEXT         | そのメールの言語           |
| `event_type`  | TEXT         | 上記event_type定義に準拠  |
| `duration_ms` | INTEGER      | hover系のみ（nullable） |
| `value`       | TEXT         | クリックURL・コピーテキスト等   |
| `created_at`  | TIMESTAMPTZ  | DEFAULT now()      |


---

### 7. ITリテラシースコアリング設計

「結果（騙されたか）」ではなく「プロセス（どう確認したか）」で評価する。


| スコア項目              | 重み  | 算出方法                                     |
| ------------------ | --- | ---------------------------------------- |
| domainVerification | 30% | 罠メールでのhover_sender合計ms ÷ 閾値（2000ms）× 100 |
| linkInspection     | 25% | 罠メールのリンク数に対するhover_linkイベント発生比率          |
| urgencyResistance  | 25% | 罠メールTTAの中央値（≥8000ms→満点、<2000ms→0点）       |
| extensionAwareness | 10% | 拡張子罠メールでのhover_attachment発生有無            |
| textVerification   | 10% | text_selectまたはtext_copyイベントの発生有無         |


---

*最終更新：Googleフォームentry ID確定・振り分けロジック実装定数追加（v5）*