import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { randomInt } from 'crypto'
import type { Language, Condition } from '@/types'
import { buildAssignment, serializeAssignment } from '@/data/counterbalance'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

// POST /api/session
// Body: { participant_code, ui_lang, l1_lang, condition }
// サーバー側でシードを生成し、割当情報(JSON)を email_set_id に保存してセッションを作成する。
// Response: { id, seed, email_set_id }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { participant_code, ui_lang, l1_lang, condition } = body as {
      participant_code?: string
      ui_lang?: Language
      l1_lang?: Language
      condition?: Condition
    }

    if (!participant_code || !ui_lang || !l1_lang || !condition) {
      return NextResponse.json(
        { error: 'participant_code, ui_lang, l1_lang, condition are required' },
        { status: 400 },
      )
    }

    // 32bit シードをサーバー側で生成し、割当情報を決定論的に構築
    const seed = randomInt(0, 0x100000000) // 0 .. 2^32-1
    const assignment = buildAssignment(seed)
    const emailSetId = serializeAssignment(assignment)

    const db = getAdminClient()
    const { data, error } = await db
      .from('sessions')
      .insert({
        participant_code,
        ui_lang,
        l1_lang,
        condition,
        email_set_id: emailSetId,
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json(
        { error: `DB error: ${error.message}${error.hint ? ` (hint: ${error.hint})` : ''}` },
        { status: 500 },
      )
    }

    return NextResponse.json({ id: data.id, seed, email_set_id: emailSetId })
  } catch (err) {
    console.error('[session API]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 },
    )
  }
}
