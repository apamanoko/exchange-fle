import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// 開発環境以外は 404 を返す
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ session_id: string }> },
) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { session_id } = await params

  const supabaseUrl         = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey      = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY is not configured' },
      { status: 500 },
    )
  }

  const admin = createClient(supabaseUrl, serviceRoleKey)

  const { data, error } = await admin
    .from('experiment_logs')
    .select('*')
    .eq('session_id', session_id)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ session_id, logs: data, count: data.length })
}
