'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/app/lib/supabase'

// DevTools が開くと outer と inner のサイズ差が広がる（サイドバー/下部パネル）
const THRESHOLD_PX = 160

function isDevToolsOpen(): boolean {
  return (
    window.outerWidth  - window.innerWidth  > THRESHOLD_PX ||
    window.outerHeight - window.innerHeight > THRESHOLD_PX
  )
}

export function useDevToolsGuard(sessionId: string): void {
  const prevOpen = useRef(false)

  useEffect(() => {
    if (!sessionId) return

    async function logOpen() {
      try {
        await supabase.from('experiment_logs').insert({
          session_id:  sessionId,
          email_id:    '',
          email_lang:  '',
          event_type:  'devtools_open' as const,
          duration_ms: null,
          value:       null,
        })
      } catch (err) {
        console.error('[useDevToolsGuard] log error:', err)
      }
    }

    function check() {
      const open = isDevToolsOpen()
      if (open && !prevOpen.current) {
        // closed → open の遷移時のみ記録
        logOpen()
      }
      prevOpen.current = open
    }

    // マウント時の初回チェック
    check()

    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [sessionId])
}
