import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import type { Language } from '@/types'
import { computeScore, type LogRow } from '@/lib/scoring'
import { feedbackProvider } from '@/lib/ai'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

// POST /api/feedback
// Body: { session_id: string }
// Response: { score, trapResults, feedback }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { session_id } = body as { session_id?: string }

    if (!session_id) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 })
    }

    const db = getAdminClient()

    // ① sessions テーブルから ui_lang / l1_lang を取得
    const { data: session, error: sessionErr } = await db
      .from('sessions')
      .select('ui_lang, l1_lang')
      .eq('id', session_id)
      .single()

    if (sessionErr || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // ② experiment_logs を全件取得
    const { data: logsRaw, error: logsErr } = await db
      .from('experiment_logs')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true })

    if (logsErr) {
      return NextResponse.json({ error: logsErr.message }, { status: 500 })
    }

    const logs    = (logsRaw ?? []) as LogRow[]
    const uiLang  = session.ui_lang as Language
    const l1Lang  = session.l1_lang as Language

    // ③ スコアリング（共通ロジック）
    const { score, trapResults } = computeScore(logs, uiLang, l1Lang)

    // ④ AI フィードバック生成
    const feedback = await feedbackProvider.generateFeedback({
      score,
      trapResults,
      uiLang,
    })

    return NextResponse.json({
      session_id,
      ui_lang: uiLang,
      score,
      trapResults,
      feedback,
      meta: {
        totalLogs: logs.length,
        provider:  'gemini-2.5-flash',
        scoredAt:  new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('[feedback API]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 },
    )
  }
}
