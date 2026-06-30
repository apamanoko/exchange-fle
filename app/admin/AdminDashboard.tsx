'use client'

import { useMemo } from 'react'
import {
  Download, Users, CheckCircle2, Clock, BarChart2,
  Globe, Database,
} from 'lucide-react'
import type { SessionWithCount } from './page'

// ─── ユーティリティ ──────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

function pct(n: number, total: number): string {
  if (total === 0) return '—'
  return `${Math.round((n / total) * 100)}%`
}

// ─── CSV エクスポート ─────────────────────────────────────────────────────────

function buildCsv(sessions: SessionWithCount[]): string {
  const header = [
    'session_id',
    'participant_code',
    'ui_lang',
    'l1_lang',
    'condition',
    'started_at',
    'completed_at',
    'log_count',
    'is_complete',
  ].join(',')

  const rows = sessions.map((s) => [
    s.id,
    s.participant_code,
    s.ui_lang,
    s.l1_lang,
    s.condition,
    s.started_at,
    s.completed_at ?? '',
    s.logCount,
    s.completed_at ? 'TRUE' : 'FALSE',
  ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))

  return [header, ...rows].join('\r\n')
}

function downloadCsv(sessions: SessionWithCount[]): void {
  const csv  = buildCsv(sessions)
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `fle_sessions_${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── サマリーカード ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, sub,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─── 言語別サマリーテーブル ───────────────────────────────────────────────────

function LangSummary({ sessions }: { sessions: SessionWithCount[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, { total: number; completed: number }>()
    for (const s of sessions) {
      const key = `${s.ui_lang} / ${s.l1_lang}`
      const cur = map.get(key) ?? { total: 0, completed: 0 }
      map.set(key, {
        total:     cur.total + 1,
        completed: cur.completed + (s.completed_at ? 1 : 0),
      })
    }
    return Array.from(map.entries()).sort((a, b) => b[1].total - a[1].total)
  }, [sessions])

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-800">言語別セッション数</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 font-medium">
              <th className="text-left px-5 py-2.5">UI言語 / L1言語</th>
              <th className="text-right px-5 py-2.5">総数</th>
              <th className="text-right px-5 py-2.5">完了</th>
              <th className="text-right px-5 py-2.5">完了率</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {groups.map(([key, { total, completed }]) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-mono text-xs text-gray-700">{key}</td>
                <td className="px-5 py-3 text-right font-semibold">{total}</td>
                <td className="px-5 py-3 text-right text-green-700 font-semibold">{completed}</td>
                <td className="px-5 py-3 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    parseInt(pct(completed, total)) >= 80
                      ? 'bg-green-100 text-green-700'
                      : parseInt(pct(completed, total)) >= 50
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {pct(completed, total)}
                  </span>
                </td>
              </tr>
            ))}
            {groups.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-400">
                  セッションデータがありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── セッション一覧テーブル ───────────────────────────────────────────────────

function SessionTable({ sessions }: { sessions: SessionWithCount[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <Database className="w-4 h-4 text-gray-500" />
        <h2 className="text-sm font-semibold text-gray-800">ログ品質確認</h2>
        <span className="ml-auto text-xs text-gray-400">{sessions.length} 件</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 font-medium">
              <th className="text-left px-4 py-2.5 sticky left-0 bg-gray-50 z-10">参加者コード</th>
              <th className="text-left px-4 py-2.5">UI言語</th>
              <th className="text-left px-4 py-2.5">L1言語</th>
              <th className="text-left px-4 py-2.5">条件</th>
              <th className="text-right px-4 py-2.5">イベント数</th>
              <th className="text-left px-4 py-2.5">完了状況</th>
              <th className="text-left px-4 py-2.5">開始日時</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessions.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-2.5 sticky left-0 bg-white font-mono text-xs font-semibold text-gray-700">
                  {s.participant_code}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">{s.ui_lang}</td>
                <td className="px-4 py-2.5 font-mono text-xs">{s.l1_lang}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    s.condition === 'L1'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {s.condition}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums">
                  <span className={`font-semibold ${s.logCount < 5 ? 'text-red-600' : 'text-gray-800'}`}>
                    {s.logCount}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  {s.completed_at ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      完了
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-yellow-600 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      未完了
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-xs text-gray-500 font-mono">
                  {fmtDate(s.started_at)}
                </td>
              </tr>
            ))}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400">
                  セッションデータがありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── AdminDashboard（メイン） ─────────────────────────────────────────────────

export default function AdminDashboard({
  sessions,
  adminKey,
}: {
  sessions: SessionWithCount[]
  adminKey: string
}) {
  const totalSessions   = sessions.length
  const completed       = sessions.filter((s) => s.completed_at).length
  const completionRate  = pct(completed, totalSessions)
  const totalEvents     = sessions.reduce((sum, s) => sum + s.logCount, 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6 pb-16">

        {/* ── ヘッダー ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-blue-600" />
              研究者ダッシュボード
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">FLE Phishing Experiment</p>
          </div>
          <button
            onClick={() => downloadCsv(sessions)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            CSVをダウンロード
          </button>
        </div>

        {/* ── サマリーカード ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            icon={Users}
            label="総セッション数"
            value={totalSessions}
          />
          <StatCard
            icon={CheckCircle2}
            label="完了セッション"
            value={completed}
            sub={`完了率 ${completionRate}`}
          />
          <StatCard
            icon={Clock}
            label="未完了セッション"
            value={totalSessions - completed}
          />
          <StatCard
            icon={Database}
            label="総ログイベント数"
            value={totalEvents.toLocaleString()}
          />
        </div>

        {/* ── 言語別サマリー ────────────────────────────────────────────────── */}
        <LangSummary sessions={sessions} />

        {/* ── セッションテーブル ────────────────────────────────────────────── */}
        <SessionTable sessions={sessions} />

        {/* ── フッター ──────────────────────────────────────────────────────── */}
        <p className="text-xs text-center text-gray-300 font-mono">
          admin_key: {adminKey.slice(0, 4)}{'*'.repeat(Math.max(0, adminKey.length - 4))}
        </p>

      </div>
    </div>
  )
}
