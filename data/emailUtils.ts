import type { Email, Language } from '@/types'
import {
  emailsJa, emailsEn,
  emailsKo, emailsZh, emailsIt, emailsVi, emailsEs,
  emailsPl, emailsNo, emailsFi,
} from '@/data/emails'

/**
 * 実験セッションで使用するメールセットを返す
 *
 * @param uiLang    被験者のUI言語（sessions.ui_lang）
 * @param l1Lang    被験者の母語（sessions.l1_lang）
 * @returns         日本語メール8通 + L2メール8通 = 計16通
 *
 * 振り分けルール：
 * - 全被験者：母語（L1）に対応する配列 + emailsJa（日本語8通・L2）
 *   en → emailsEn / ko → emailsKo / zh → emailsZh / it → emailsIt
 *   vi → emailsVi / es → emailsEs / pl → emailsPl / no → emailsNo / fi → emailsFi
 *   その他 → emailsEn（フォールバック）
 */
export function getEmailSet(uiLang: Language, l1Lang: Language): Email[] {
  const l1Emails = getL2Emails(uiLang, l1Lang)
  return interleaveEmails(l1Emails, emailsJa)
}

/**
 * L2言語のメール配列を返す
 */
export function getL2Emails(uiLang: Language, l1Lang: Language): Email[] {
  const map: Partial<Record<Language, Email[]>> = {
    en: emailsEn,
    ko: emailsKo,
    zh: emailsZh,
    it: emailsIt,
    vi: emailsVi,
    es: emailsEs,
    pl: emailsPl,
    no: emailsNo,
    fi: emailsFi,
  }
  return map[l1Lang] ?? emailsEn
}

/**
 * 日本語メールとL2メールを自然に混在させる
 * 固定順序で全被験者が同一シーケンスを体験する
 *
 * 出力順（16通）：
 * normal-ja, normal-l2, normal-ja, normal-l2,
 * trap-ja,   normal-l2, normal-ja, trap-l2,
 * trap-ja,   normal-l2, normal-ja, trap-l2,
 * trap-ja,   trap-l2,   trap-ja,   trap-l2
 */
export function interleaveEmails(ja: Email[], l2: Email[]): Email[] {
  const jaNormal = ja.filter(e => !e.isTrap)
  const jaTrap   = ja.filter(e => e.isTrap)
  const l2Normal = l2.filter(e => !e.isTrap)
  const l2Trap   = l2.filter(e => e.isTrap)

  return [
    jaNormal[0], l2Normal[0],
    jaNormal[1], l2Normal[1],
    jaTrap[0],   l2Normal[2],
    jaNormal[2], l2Trap[0],
    jaTrap[1],   l2Normal[3],
    jaNormal[3], l2Trap[1],
    jaTrap[2],   l2Trap[2],
    jaTrap[3],   l2Trap[3],
  ].filter((e): e is Email => e !== undefined)
}

/**
 * メールIDから特定のメールを取得する
 */
export function getEmailById(id: string, emails: Email[]): Email | undefined {
  return emails.find(e => e.id === id)
}

/**
 * 罠メールのみを返す
 */
export function getTrapEmails(emails: Email[]): Email[] {
  return emails.filter(e => e.isTrap)
}

/**
 * メールデータの整合性を検証する（開発時チェック用）
 */
export function validateEmailData(): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const allSets = [
    { name: 'emailsJa', data: emailsJa },
    { name: 'emailsEn', data: emailsEn },
    { name: 'emailsKo', data: emailsKo },
    { name: 'emailsZh', data: emailsZh },
    { name: 'emailsIt', data: emailsIt },
    { name: 'emailsVi', data: emailsVi },
    { name: 'emailsEs', data: emailsEs },
    { name: 'emailsPl', data: emailsPl },
    { name: 'emailsNo', data: emailsNo },
    { name: 'emailsFi', data: emailsFi },
  ]

  for (const { name, data } of allSets) {
    if (data.length !== 8) {
      errors.push(`${name}: expected 8 emails, got ${data.length}`)
    }
    const traps = data.filter(e => e.isTrap)
    if (traps.length !== 4) {
      errors.push(`${name}: expected 4 trap emails, got ${traps.length}`)
    }
    const trapIds = traps.map(e => e.id)
    if (!trapIds.some(id => id.startsWith('trap-1'))) {
      errors.push(`${name}: missing trap-1 (BEC vendor)`)
    }
    if (!trapIds.some(id => id.startsWith('trap-2'))) {
      errors.push(`${name}: missing trap-2 (authority impersonation)`)
    }
    if (!trapIds.some(id => id.startsWith('trap-3'))) {
      errors.push(`${name}: missing trap-3 (thread hijacking)`)
    }
    if (!trapIds.some(id => id.startsWith('trap-4'))) {
      errors.push(`${name}: missing trap-4 (infrastructure phishing)`)
    }
    // リンク罠に data-display-url が含まれているか確認
    const linkTraps = traps.filter(e => e.traps.includes('link'))
    for (const trap of linkTraps) {
      if (!trap.bodyHtml.includes('data-display-url')) {
        errors.push(`${trap.id}: missing data-display-url in link trap`)
      }
    }
    // 拡張子罠に .exe 添付があるか確認
    const extTraps = traps.filter(e => e.traps.includes('extension'))
    for (const trap of extTraps) {
      const hasExe = trap.attachments?.some(a => a.name.endsWith('.exe'))
      if (!hasExe) {
        errors.push(`${trap.id}: missing .exe attachment in extension trap`)
      }
    }
  }

  return { valid: errors.length === 0, errors }
}
