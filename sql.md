# Supabase SQL — FLE実験システム

## 1. sessions テーブル

```sql
CREATE TABLE sessions (
  id                   UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_code     TEXT         NOT NULL UNIQUE,
  ui_lang              TEXT         NOT NULL,
  l1_lang              TEXT         NOT NULL,
  condition            TEXT         NOT NULL CHECK (condition IN ('L1', 'L2')),
  email_set_id         TEXT         NOT NULL,
  started_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
  completed_at         TIMESTAMPTZ,
  screen_recording_url TEXT
);
```

## 2. experiment_logs テーブル

```sql
CREATE TABLE experiment_logs (
  id             BIGSERIAL    PRIMARY KEY,
  session_id     UUID         NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  email_id       TEXT         NOT NULL,
  email_lang     TEXT         NOT NULL,   -- そのメールの言語（= lang）
  event_type     TEXT         NOT NULL,
  duration_ms    INTEGER,
  value          TEXT,
  slot_index     INTEGER,                 -- 提示スロット 1〜16
  exposure_index INTEGER,                 -- 罠の提示回数 1/2（通常メールは NULL）
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);
```

### 既存DBへの ALTER（カウンターバランス対応で追加）

`email_set_id` は既に `TEXT` のため **変更不要**（割当JSONをそのまま保存できる。
CHECK制約も付いていないため影響なし）。

`experiment_logs` に以下2列を追加する（どちらも NULL 許容。`email_lang` が
「そのメールの言語(lang)」を兼ねるため lang 列の追加は不要）：

```sql
ALTER TABLE experiment_logs ADD COLUMN IF NOT EXISTS slot_index     INTEGER;
ALTER TABLE experiment_logs ADD COLUMN IF NOT EXISTS exposure_index INTEGER;
```

### sessions.email_set_id に保存する JSON 形式

```json
{
  "v": 1,
  "seed": 2863311530,
  "trapFirstLang": { "1": "l1", "2": "ja", "3": "ja", "4": "l1" },
  "frontTrapOrder": [3, 1, 4, 2],
  "backTrapOrder":  [2, 4, 1, 3]
}
```

`seed` が正であり、再構築（`buildAssignment(seed)`）で同一の割当が得られる。
リロード時は保存済みの `seed` から再構築するため、常に同じ並びが再現される。

## 3. インデックス

```sql
CREATE INDEX idx_experiment_logs_session_id ON experiment_logs(session_id);
CREATE INDEX idx_experiment_logs_event_type ON experiment_logs(event_type);
CREATE INDEX idx_experiment_logs_email_id   ON experiment_logs(email_id);
```

## 4. Row Level Security（RLS 無効化）

実験システムはユーザー認証を行わないため、RLS は無効化する。
Supabase anon キー自体がアクセス制御の役割を担う。

```sql
ALTER TABLE sessions        DISABLE ROW LEVEL SECURITY;
ALTER TABLE experiment_logs DISABLE ROW LEVEL SECURITY;
```

## 5. RLS エラーが出た場合のリセット手順

既存ポリシーを全削除してから RLS を無効化する：

```sql
DROP POLICY IF EXISTS "service_role_only" ON sessions;
DROP POLICY IF EXISTS "service_role_only" ON experiment_logs;
DROP POLICY IF EXISTS "anon_insert"       ON sessions;
DROP POLICY IF EXISTS "anon_insert"       ON experiment_logs;

ALTER TABLE sessions        DISABLE ROW LEVEL SECURITY;
ALTER TABLE experiment_logs DISABLE ROW LEVEL SECURITY;
```

## 2026-11-04 母語にドイツ語(de)を追加する際の、制約の確認(変更なし)

目的: 母語としてドイツ語(コード 'de')を使えるか、sessions の CHECK 制約を確認した。
結果: 変更は不要(すでに許可されていた)。

確認時の制約:
- sessions_l1_lang_check: l1_lang IN ('ja','en','de','zh','ko','it','vi','es','pl','no','fi')
- sessions_ui_lang_check: ui_lang IN ('ja','en','de','zh','ko','it','vi','es','pl','no','fi')
