// ─────────────────────────────────────────────────────────────────────────────
// i18n.ts  —  Phase 3-A 仮実装
// Phase 1-A（Next.js + i18n基盤）で本番実装に差し替える
// ─────────────────────────────────────────────────────────────────────────────

export const SUPPORTED_LANGS = ['ja', 'en', 'zh', 'ko', 'vi', 'id', 'de'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]

export type Translations = {
  // ── アクションボタン（Phase 3-A 最重要: 3種のみ）──────────────────────
  reply: string
  forward: string
  delete: string
  // ── フォルダ名 ──────────────────────────────────────────────────────────
  inbox: string
  sent: string
  deleted: string
  // ── メール本文ペイン ────────────────────────────────────────────────────
  from: string
  to: string
  date: string
  attachmentCount: (n: number) => string
  // ── リスト / 空状態 ─────────────────────────────────────────────────────
  noEmailSelected: string
  selectPrompt: string
  // ── ヘッダー / サイドバー ───────────────────────────────────────────────
  appTitle: string
  compose: string
  unread: string
  storageUsed: string
}

const translations: Record<Lang, Translations> = {
  ja: {
    reply: '返信',
    forward: '転送',
    delete: '削除',
    inbox: '受信トレイ',
    sent: '送信済み',
    deleted: '削除済み',
    from: '差出人',
    to: '宛先',
    date: '日時',
    attachmentCount: (n) => `添付ファイル（${n}件）`,
    noEmailSelected: 'メールを選択してください',
    selectPrompt: '左のリストからメールを選択して内容を表示します',
    appTitle: '大学メールシステム',
    compose: '新規作成',
    unread: '未読',
    storageUsed: '使用容量',
  },
  en: {
    reply: 'Reply',
    forward: 'Forward',
    delete: 'Delete',
    inbox: 'Inbox',
    sent: 'Sent',
    deleted: 'Deleted',
    from: 'From',
    to: 'To',
    date: 'Date',
    attachmentCount: (n) => `${n} Attachment${n !== 1 ? 's' : ''}`,
    noEmailSelected: 'No email selected',
    selectPrompt: 'Select an email from the list to view its contents',
    appTitle: 'University Mail',
    compose: 'Compose',
    unread: 'Unread',
    storageUsed: 'Storage',
  },
  zh: {
    reply: '回复',
    forward: '转发',
    delete: '删除',
    inbox: '收件箱',
    sent: '已发送',
    deleted: '已删除',
    from: '发件人',
    to: '收件人',
    date: '日期',
    attachmentCount: (n) => `附件（${n}个）`,
    noEmailSelected: '请选择邮件',
    selectPrompt: '从左侧列表中选择邮件以查看内容',
    appTitle: '大学邮件系统',
    compose: '撰写',
    unread: '未读',
    storageUsed: '存储空间',
  },
  ko: {
    reply: '답장',
    forward: '전달',
    delete: '삭제',
    inbox: '받은 편지함',
    sent: '보낸 편지함',
    deleted: '삭제된 항목',
    from: '보낸 사람',
    to: '받는 사람',
    date: '날짜',
    attachmentCount: (n) => `첨부 파일（${n}개）`,
    noEmailSelected: '이메일을 선택하세요',
    selectPrompt: '목록에서 이메일을 선택하여 내용을 확인하세요',
    appTitle: '대학 메일 시스템',
    compose: '새로 작성',
    unread: '읽지 않음',
    storageUsed: '저장 공간',
  },
  vi: {
    reply: 'Trả lời',
    forward: 'Chuyển tiếp',
    delete: 'Xóa',
    inbox: 'Hộp thư đến',
    sent: 'Đã gửi',
    deleted: 'Đã xóa',
    from: 'Từ',
    to: 'Đến',
    date: 'Ngày',
    attachmentCount: (n) => `Tệp đính kèm（${n}）`,
    noEmailSelected: 'Chưa chọn email',
    selectPrompt: 'Chọn email từ danh sách để xem nội dung',
    appTitle: 'Hệ thống mail đại học',
    compose: 'Soạn thư',
    unread: 'Chưa đọc',
    storageUsed: 'Dung lượng',
  },
  id: {
    reply: 'Balas',
    forward: 'Teruskan',
    delete: 'Hapus',
    inbox: 'Kotak Masuk',
    sent: 'Terkirim',
    deleted: 'Dihapus',
    from: 'Dari',
    to: 'Kepada',
    date: 'Tanggal',
    attachmentCount: (n) => `Lampiran（${n}）`,
    noEmailSelected: 'Belum ada email dipilih',
    selectPrompt: 'Pilih email dari daftar untuk melihat isinya',
    appTitle: 'Sistem Email Universitas',
    compose: 'Buat Baru',
    unread: 'Belum dibaca',
    storageUsed: 'Penyimpanan',
  },
  de: {
    reply: 'Antworten',
    forward: 'Weiterleiten',
    delete: 'Löschen',
    inbox: 'Posteingang',
    sent: 'Gesendet',
    deleted: 'Gelöscht',
    from: 'Von',
    to: 'An',
    date: 'Datum',
    attachmentCount: (n) => `${n} Anhang${n !== 1 ? 'häge' : ''}`,
    noEmailSelected: 'Keine E-Mail ausgewählt',
    selectPrompt: 'Wählen Sie eine E-Mail aus der Liste aus',
    appTitle: 'Universitäts-E-Mail',
    compose: 'Verfassen',
    unread: 'Ungelesen',
    storageUsed: 'Speicher',
  },
}

export function getT(lang: Lang): Translations {
  return translations[lang] ?? translations.ja
}
