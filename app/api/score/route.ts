import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import type { Language } from '@/types'
import { computeScore, type LogRow } from '@/lib/scoring'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { session_id } = body as { session_id?: string }

    if (!session_id) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 })
    }

    const db = getAdminClient()

    const { data: session, error: sessionErr } = await db
      .from('sessions')
      .select('ui_lang, l1_lang')
      .eq('id', session_id)
      .single()

    if (sessionErr || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const { data: logsRaw, error: logsErr } = await db
      .from('experiment_logs')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true })

    if (logsErr) {
      return NextResponse.json({ error: logsErr.message }, { status: 500 })
    }

    const logs = (logsRaw ?? []) as LogRow[]
    const { score, trapResults } = computeScore(
      logs,
      session.ui_lang as Language,
      session.l1_lang as Language,
    )

    return NextResponse.json({
      session_id,
      score,
      trapResults,
      meta: {
        totalLogs:      logs.length,
        trapEmailCount: trapResults.length,
        scoredAt:       new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('[score API]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 },
    )
  }
}
