// ─────────────────────────────────────────────────────────────────────────────
// mailStore.ts  —  Phase 1-C
// ─────────────────────────────────────────────────────────────────────────────
import { create } from 'zustand'
import type { FolderId, EmailAction } from '../types'

export type { FolderId, EmailAction }
export type EmailId = string

type MailStore = {
  selectedFolder: FolderId
  selectedId: EmailId | null
  // 未処理の受信トレイメールキュー（実験タスクの進捗管理）
  pendingIds: EmailId[]
  // 処理済み記録: emailId → アクション種別
  processedMap: Record<EmailId, EmailAction>

  setSelectedFolder: (id: FolderId) => void
  selectEmail: (id: EmailId) => void
  // メールデータ確定時に初期キューを設定（MailLayout の useEffect から呼ぶ）
  initPending: (ids: EmailId[]) => void
  // アクション実行: pendingIds から除去し次メールを自動選択
  processEmail: (id: EmailId, action: EmailAction) => void
}

export const useMailStore = create<MailStore>((set, get) => ({
  selectedFolder: 'inbox',
  selectedId: null,
  pendingIds: [],
  processedMap: {},

  setSelectedFolder: (folder) =>
    set({ selectedFolder: folder, selectedId: null }),

  selectEmail: (id) => set({ selectedId: id }),

  initPending: (ids) =>
    set((s) => ({
      pendingIds: ids,
      selectedId: s.selectedId ?? (ids[0] ?? null),
    })),

  processEmail: (id, action) => {
    const { pendingIds, processedMap } = get()
    const idx = pendingIds.indexOf(id)
    if (idx === -1) return

    const next = pendingIds.filter((pid) => pid !== id)
    const nextIdx = Math.min(idx, next.length - 1)
    const nextSelectedId = next.length > 0 ? next[nextIdx] : null

    set({
      pendingIds: next,
      processedMap: { ...processedMap, [id]: action },
      selectedId: nextSelectedId,
    })
  },
}))
