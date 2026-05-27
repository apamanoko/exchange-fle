import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '大学メールシステム',
  description: '名城大学 学内メールシステム',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  )
}
