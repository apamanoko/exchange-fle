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
  id           BIGSERIAL    PRIMARY KEY,
  session_id   UUID         NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  email_id     TEXT         NOT NULL,
  email_lang   TEXT         NOT NULL,
  event_type   TEXT         NOT NULL,
  duration_ms  INTEGER,
  value        TEXT,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);
```

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
