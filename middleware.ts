import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  // /inbox へのアクセス：session_id がなければトップにリダイレクト
  if (pathname === '/inbox') {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.redirect(new URL('/?error=no_session', req.url))
    }
  }

  // /result へのアクセス：session_id がなければトップにリダイレクト
  if (pathname === '/result') {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.redirect(new URL('/?error=no_session', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/inbox', '/result'],
}
