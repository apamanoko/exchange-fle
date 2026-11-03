import { createClient } from '@supabase/supabase-js'
import { Lock } from 'lucide-react'
import AdminDashboard from './AdminDashboard'
import { buildTrialRows, type LogRow, type TrialRow } from '@/lib/scoring'
import { getAssignedEmailsFromSetId } from '@/data/emailUtils'
import type { Language } from '@/types'

// ─── 型 ──────────────────────────────────────────────────────────────────────

export type SessionRow = {
  id: string
  participant_code: string
  ui_lang: string
  l1_lang: string
  condition: 'L1' | 'L2'
  email_set_id: string
  started_at: string
  completed_at: string | null
}

export type SessionWithCount = SessionRow & { logCount: number }

// ─── サーバーコンポーネント ───────────────────────────────────────────────────

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params     = await searchParams
  const provided   = typeof params.admin_key === 'string' ? params.admin_key : ''
  const expected   = process.env.ADMIN_KEY ?? ''

  // アクセス制御
  if (!expected || provided !== expected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center max-w-sm w-full">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <Lock className="w-7 h-7 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">403 Forbidden</h1>
          <p className="text-sm text-gray-500">
            有効な管理キーが必要です。<br />
            <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">?admin_key=</code> を付加してアクセスしてください。
          </p>
        </div>
      </div>
    )
  }

  // Supabase（サービスロールキーを優先）
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  // ① セッション一覧取得
  const { data: sessions, error: sessErr } = await db
    .from('sessions')
    .select('id, participant_code, ui_lang, l1_lang, condition, email_set_id, started_at, completed_at')
    .order('started_at', { ascending: false })

  if (sessErr) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <p className="text-red-600 text-sm font-mono">DB error: {sessErr.message}</p>
      </div>
    )
  }

  // ② 全ログを取得（件数カウント + 試行単位エクスポートに使用）
  //    select('*') は新列(slot_index/exposure_index)が無い古いDBでもエラーにならない
  const { data: logRowsRaw } = await db
    .from('experiment_logs')
    .select('*')

  const allLogs = (logRowsRaw ?? []) as LogRow[]

  // セッションごとにログをまとめる
  const logsBySession: Record<string, LogRow[]> = {}
  for (const l of allLogs) (logsBySession[l.session_id] ??= []).push(l)

  const sessionRows = (sessions ?? []) as SessionRow[]

  const sessionsWithCount: SessionWithCount[] = sessionRows.map((s) => ({
    ...s,
    logCount: logsBySession[s.id]?.length ?? 0,
  }))

  // ③ 試行単位の行（1セッション×1メール=1行）を生成
  const trialRows: TrialRow[] = []
  for (const s of sessionRows) {
    const assigned = getAssignedEmailsFromSetId(
      s.ui_lang as Language,
      s.l1_lang as Language,
      s.email_set_id,
    )
    trialRows.push(...buildTrialRows(s.id, assigned, logsBySession[s.id] ?? []))
  }

  return (
    <AdminDashboard
      sessions={sessionsWithCount}
      trialRows={trialRows}
      adminKey={provided}
    />
  )
}
