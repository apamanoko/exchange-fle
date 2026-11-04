import type { Email, Language } from '@/types'
import {
  emailsJa, emailsEn,
  emailsKo, emailsZh, emailsIt, emailsVi, emailsEs,
  emailsPl, emailsNo, emailsFi,
} from '@/data/emails'
import {
  planSlots, buildAssignment, parseAssignment, serializeAssignment,
  type EmailAssignment, type TrapFirstLang,
} from '@/data/counterbalance'

export {
  mulberry32, buildAssignment, planSlots, parseAssignment, serializeAssignment,
  FRONT_SLOT_PATTERN, BACK_SLOT_PATTERN, TRAP_TYPES,
  type EmailAssignment, type SlotPlan, type TrapFirstLang,
} from '@/data/counterbalance'

// ─── 相対日付トークンの展開 ────────────────────────────────────────────────────

/** 各言語の BCP 47 ロケール（曜日・月名の自然表記に使用） */
const LOCALE_MAP: Record<Language, string> = {
  ja: 'ja-JP', en: 'en-US', de: 'de-DE', zh: 'zh-CN', ko: 'ko-KR',
  it: 'it-IT', vi: 'vi-VN', es: 'es-ES', pl: 'pl-PL', no: 'nb-NO', fi: 'fi-FI',
}

/** baseDate から offsetDays 日だけずらした Date を返す（元の Date は変更しない） */
function addDays(base: Date, offsetDays: number): Date {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate())
  d.setDate(d.getDate() + offsetDays)
  return d
}

/**
 * 「今日 ± n 日」を各言語の自然な曜日・月日表記に展開する純粋関数。
 *   ja: 「11月3日（月）」   zh: 「11月3日（周一）」   ko: 「11월 3일 (월)」
 *   en/他: Intl による「Mon, Nov 3」形式
 */
export function formatRelativeDate(
  offsetDays: number,
  lang: Language,
  baseDate: Date,
): string {
  const d = addDays(baseDate, offsetDays)
  const locale = LOCALE_MAP[lang] ?? 'en-US'

  if (lang === 'ja' || lang === 'zh') {
    const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d)
    return `${d.getMonth() + 1}月${d.getDate()}日（${weekday}）`
  }
  if (lang === 'ko') {
    const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d)
    return `${d.getMonth() + 1}월 ${d.getDate()}일 (${weekday})`
  }
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short', month: 'short', day: 'numeric',
  }).format(d)
}

/**
 * テキスト中の {{D+n}} / {{D-n}} トークンを「今日 ± n 日」の表記へ展開する純粋関数。
 *
 * @param text     本文・件名など、トークンを含みうる文字列
 * @param lang     表示言語
 * @param baseDate 参加者のセッション開始日（これを「今日」として相対展開する）
 */
export function renderDateTokens(text: string, lang: Language, baseDate: Date): string {
  return text.replace(
    /\{\{D([+-]?\d+)\}\}/g,
    (_, offset: string) => formatRelativeDate(parseInt(offset, 10), lang, baseDate),
  )
}

/**
 * ヘッダ用の受信日時文字列（相対日付 + 時刻）を展開する。
 * 例: 「11月3日（月） 15:00」 / 「Mon, Nov 3 15:00」
 */
export function formatEmailHeaderDate(email: Email, lang: Language, baseDate: Date): string {
  const date = formatRelativeDate(email.dateOffsetDays, lang, baseDate)
  return email.dateTime ? `${date} ${email.dateTime}` : date
}

/**
 * 母語（L1）側のメール配列を返す。
 *   en → emailsEn / ko → emailsKo / zh → emailsZh / it → emailsIt
 *   vi → emailsVi / es → emailsEs / pl → emailsPl / no → emailsNo / fi → emailsFi
 *   その他 → emailsEn（フォールバック）
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
 * スコアリング等で使う「その参加者が見た16通の集合」を返す（順序非依存）。
 * 母語版8通 + 日本語版8通。カウンターバランスは順序だけを変えるため、
 * 集合としては全参加者で同一であり、採点はこの集合だけで足りる。
 */
export function getEmailSet(uiLang: Language, l1Lang: Language): Email[] {
  return [...getL2Emails(uiLang, l1Lang), ...emailsJa]
}

/** スロット情報を付与した、順序確定済みのメール（inbox 表示・ログ用） */
export type AssignedEmail = Email & {
  /** スロット番号 1〜16 */
  slotIndex: number
  /** 罠の提示回数: 1回目=1 / 2回目=2（通常メールは null） */
  exposureIndex: number | null
}

/**
 * 割当情報に従って、参加者固有の順序・メタ情報付きの16通を返す。
 * 罠は母語版/日本語版、通常は母語/日本語の各シナリオを planSlots の計画で解決する。
 */
export function getAssignedEmails(
  uiLang: Language,
  l1Lang: Language,
  assignment: EmailAssignment,
): AssignedEmail[] {
  const l1Set = getL2Emails(uiLang, l1Lang)
  const jaSet = emailsJa
  const pickSet = (lang: TrapFirstLang): Email[] => (lang === 'ja' ? jaSet : l1Set)

  return planSlots(assignment).map((p) => {
    const set = pickSet(p.lang)
    const email =
      p.kind === 'trap'
        ? set.find((e) => e.id.startsWith(`trap-${p.trapType}-`))
        : set.find((e) => e.id.startsWith(`normal-${p.normalIndex}-`))
    if (!email) {
      throw new Error(
        `getAssignedEmails: email not found (slot ${p.slotIndex}, ${p.kind}, lang=${p.lang})`,
      )
    }
    return { ...email, slotIndex: p.slotIndex, exposureIndex: p.exposureIndex }
  })
}

/**
 * email_set_id（割当JSON）から順序確定済みのメールを復元する。
 * 解析できない（レガシー/不正）場合は seed=0 の既定割当にフォールバックする。
 */
export function getAssignedEmailsFromSetId(
  uiLang: Language,
  l1Lang: Language,
  emailSetId: string | null | undefined,
): AssignedEmail[] {
  const assignment = parseAssignment(emailSetId) ?? buildAssignment(0)
  return getAssignedEmails(uiLang, l1Lang, assignment)
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

// ─── 言語版の構造一致チェック（差し替え済みの言語だけを対象にする）─────────────
//
// 差し替えが完了した言語セットだけを、日本語セット（基準）と構造比較する。
// 旧構造のままの言語（ko, zh, it, vi, es, pl, no, fi）は、ここに追加するまで対象外。
// 差し替えが済んだ言語から、この配列に足していく。
const STRUCTURE_CHECKED_LANGS: Language[] = ['ja', 'en', 'ko', 'it']

/** メールID から言語サフィックス（-ja / -en …）を除いた共通キー（normal-1 など） */
function emailKey(id: string): string {
  return id.replace(/-[a-z]{2}$/, '')
}

/** 本文HTMLから <a> を出現順に取り出し、URL系属性だけを抜き出す（翻訳で変わらない構造部分） */
function extractLinks(html: string): { href: string; display: string; phished: string }[] {
  const out: { href: string; display: string; phished: string }[] = []
  const tagRe = /<a\b[^>]*>/gi
  let m: RegExpExecArray | null
  while ((m = tagRe.exec(html)) !== null) {
    const tag = m[0]
    const href    = tag.match(/\bhref\s*=\s*"([^"]*)"/i)?.[1] ?? ''
    const display = tag.match(/\bdata-display-url\s*=\s*"([^"]*)"/i)?.[1] ?? ''
    const phished = tag.match(/\bdata-phished-url\s*=\s*"([^"]*)"/i)?.[1] ?? ''
    out.push({ href, display, phished })
  }
  return out
}

/** 日付トークン {{D±n}} を出現順に取り出す */
function extractDateTokens(text: string): string[] {
  return text.match(/\{\{D[+-]\d+\}\}/g) ?? []
}

/** ファイル名末尾の実拡張子（.pdf.exe → .exe、.pdf → .pdf） */
function realExtension(name: string): string {
  const i = name.lastIndexOf('.')
  return i >= 0 ? name.slice(i).toLowerCase() : ''
}

/**
 * 1通ぶんの構造を、基準（日本語）と比較して不一致を errors に積む。
 * 翻訳で変わってよい項目（表示名・件名・本文テキスト・添付の名前本体）は比較しない。
 */
function compareEmailStructure(ref: Email, tgt: Email, errors: string[]): void {
  const where = `${tgt.id} vs ${ref.id}`

  if (ref.isTrap !== tgt.isTrap) {
    errors.push(`${where}: isTrap mismatch (${ref.isTrap} vs ${tgt.isTrap})`)
  }

  const refTraps = [...ref.traps].sort().join(',')
  const tgtTraps = [...tgt.traps].sort().join(',')
  if (refTraps !== tgtTraps) {
    errors.push(`${where}: traps mismatch ([${refTraps}] vs [${tgtTraps}])`)
  }

  if (ref.from.address !== tgt.from.address) {
    errors.push(`${where}: from.address mismatch (${ref.from.address} vs ${tgt.from.address})`)
  }
  if (ref.to.address !== tgt.to.address) {
    errors.push(`${where}: to.address mismatch (${ref.to.address} vs ${tgt.to.address})`)
  }

  if (ref.dateOffsetDays !== tgt.dateOffsetDays || ref.dateTime !== tgt.dateTime) {
    errors.push(`${where}: date mismatch (${ref.dateOffsetDays}/${ref.dateTime} vs ${tgt.dateOffsetDays}/${tgt.dateTime})`)
  }

  // リンク（href / data-display-url / data-phished-url）を出現順に比較
  const refLinks = extractLinks(ref.bodyHtml)
  const tgtLinks = extractLinks(tgt.bodyHtml)
  if (refLinks.length !== tgtLinks.length) {
    errors.push(`${where}: link count mismatch (${refLinks.length} vs ${tgtLinks.length})`)
  } else {
    refLinks.forEach((rl, i) => {
      const tl = tgtLinks[i]
      if (rl.href !== tl.href || rl.display !== tl.display || rl.phished !== tl.phished) {
        errors.push(`${where}: link[${i}] mismatch ` +
          `(href ${rl.href}|${tl.href} / display ${rl.display}|${tl.display} / phished ${rl.phished}|${tl.phished})`)
      }
    })
  }

  // 日付トークンの位置（件名・本文それぞれの出現順）と値を比較
  const refSubjTok = extractDateTokens(ref.subject)
  const tgtSubjTok = extractDateTokens(tgt.subject)
  if (refSubjTok.join(',') !== tgtSubjTok.join(',')) {
    errors.push(`${where}: subject date-token mismatch ([${refSubjTok}] vs [${tgtSubjTok}])`)
  }
  const refBodyTok = extractDateTokens(ref.bodyHtml)
  const tgtBodyTok = extractDateTokens(tgt.bodyHtml)
  if (refBodyTok.join(',') !== tgtBodyTok.join(',')) {
    errors.push(`${where}: body date-token mismatch ([${refBodyTok}] vs [${tgtBodyTok}])`)
  }

  // 添付：数・実拡張子・sizeKB・mimeType・isTrapped（名前本体は翻訳可）
  const refAtt = ref.attachments ?? []
  const tgtAtt = tgt.attachments ?? []
  if (refAtt.length !== tgtAtt.length) {
    errors.push(`${where}: attachment count mismatch (${refAtt.length} vs ${tgtAtt.length})`)
  } else {
    refAtt.forEach((ra, i) => {
      const ta = tgtAtt[i]
      if (realExtension(ra.name) !== realExtension(ta.name)) {
        errors.push(`${where}: attachment[${i}] extension mismatch (${realExtension(ra.name)} vs ${realExtension(ta.name)})`)
      }
      if (ra.sizeKB !== ta.sizeKB) {
        errors.push(`${where}: attachment[${i}] sizeKB mismatch (${ra.sizeKB} vs ${ta.sizeKB})`)
      }
      if (ra.mimeType !== ta.mimeType) {
        errors.push(`${where}: attachment[${i}] mimeType mismatch (${ra.mimeType} vs ${ta.mimeType})`)
      }
      if (ra.isTrapped !== ta.isTrapped) {
        errors.push(`${where}: attachment[${i}] isTrapped mismatch (${ra.isTrapped} vs ${ta.isTrapped})`)
      }
    })
  }
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

  // ── 言語版の構造一致チェック（差し替え済み言語のみ）─────────────────────────
  // 日本語セットを基準に、isTrap / traps / 送受信アドレス / 日付 /
  // リンク(href・data-display-url・data-phished-url) / 日付トークンの位置と値 /
  // 添付(数・実拡張子・sizeKB・mimeType・isTrapped) が一致しているかを検査する。
  const refByKey = new Map<string, Email>()
  for (const e of emailsJa) refByKey.set(emailKey(e.id), e)

  const checkedSets = allSets.filter(s => STRUCTURE_CHECKED_LANGS.includes(s.data[0]?.lang))
  for (const { name, data } of checkedSets) {
    if (data === emailsJa) continue // 基準自身はスキップ
    for (const email of data) {
      const ref = refByKey.get(emailKey(email.id))
      if (!ref) {
        errors.push(`${name}: no Japanese counterpart for ${email.id}`)
        continue
      }
      compareEmailStructure(ref, email, errors)
    }
  }

  // カウンターバランス後も16通が重複なく解決できることを確認
  // （代表として母語='en' を使用。seed を変えても構造は不変）
  try {
    const assigned = getAssignedEmails('en', 'en', buildAssignment(12345))
    if (assigned.length !== 16) {
      errors.push(`counterbalance: expected 16 assigned emails, got ${assigned.length}`)
    }
    const uniqueIds = new Set(assigned.map(e => e.id))
    if (uniqueIds.size !== 16) {
      errors.push(`counterbalance: assigned emails not unique (${uniqueIds.size}/16)`)
    }
    const slots = assigned.map(e => e.slotIndex).sort((a, b) => a - b)
    if (slots.join(',') !== Array.from({ length: 16 }, (_, i) => i + 1).join(',')) {
      errors.push(`counterbalance: slotIndex must be 1..16 without gaps`)
    }
  } catch (e) {
    errors.push(`counterbalance: ${e instanceof Error ? e.message : String(e)}`)
  }

  return { valid: errors.length === 0, errors }
}
