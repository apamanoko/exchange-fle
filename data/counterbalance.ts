// ─────────────────────────────────────────────────────────────────────────────
// data/counterbalance.ts
// 参加者ごとのシード付きカウンターバランス（純粋ロジックのみ）。
//
// メール構成（1人あたり計16通）:
//   罠8通 … 攻撃タイプ4種(1〜4) × {母語版(l1), 日本語版(ja)} を各1回
//   通常8通 … 母語4通 + 日本語4通
//
// 本モジュールは実際のメールデータに依存しない（型のみ import）。そのため
// 単体テスト（test/counterbalance.test.ts）から直接 import して検証できる。
// ─────────────────────────────────────────────────────────────────────────────

// 罠メールの「先行言語」。'l1' = 母語版が先、'ja' = 日本語版が先。
export type TrapFirstLang = 'l1' | 'ja'

// スロットの種別（罠 or 通常）。参加者によらず固定のパターンで配置する。
export type SlotKind = 'N' | 'T'

/**
 * スロットの罠(T)/通常(N)パターン。参加者によらず罠の位置は一定。
 * 前半8スロット + 後半8スロット = 16スロット。
 * ここを書き換えれば配置パターンを変更できる（T/N がそれぞれ前半後半で4つずつ必要）。
 */
export const FRONT_SLOT_PATTERN: readonly SlotKind[] = ['N', 'T', 'N', 'N', 'T', 'T', 'N', 'T']
export const BACK_SLOT_PATTERN:  readonly SlotKind[] = ['T', 'N', 'N', 'T', 'N', 'T', 'T', 'N']

/**
 * 通常メールの配置計画（言語 + シナリオ番号）。
 * 前半・後半それぞれに母語2通・日本語2通。シナリオは固定でよい（仕様）。
 * 母語4通(1〜4)・日本語4通(1〜4)をちょうど1回ずつ使用する。
 */
const FRONT_NORMAL_PLAN: ReadonlyArray<{ lang: TrapFirstLang; normalIndex: number }> = [
  { lang: 'ja', normalIndex: 1 },
  { lang: 'l1', normalIndex: 1 },
  { lang: 'ja', normalIndex: 2 },
  { lang: 'l1', normalIndex: 2 },
]
const BACK_NORMAL_PLAN: ReadonlyArray<{ lang: TrapFirstLang; normalIndex: number }> = [
  { lang: 'l1', normalIndex: 3 },
  { lang: 'ja', normalIndex: 3 },
  { lang: 'l1', normalIndex: 4 },
  { lang: 'ja', normalIndex: 4 },
]

/** 攻撃タイプ（IPAベース4種） */
export const TRAP_TYPES = [1, 2, 3, 4] as const

/** 参加者ごとの割当情報。seed から完全に再構築可能。 */
export type EmailAssignment = {
  /** スキーマバージョン */
  v: number
  /** 乱数シード（32bit 符号なし） */
  seed: number
  /** 各タイプ(キー '1'〜'4')の先行言語 */
  trapFirstLang: Record<string, TrapFirstLang>
  /** 前半Tスロットに入る罠タイプの出現順（[1,2,3,4] の並べ替え） */
  frontTrapOrder: number[]
  /** 後半Tスロットに入る罠タイプの出現順（[1,2,3,4] の並べ替え） */
  backTrapOrder: number[]
}

/** 1スロットの配置計画（メールデータに依存しない記述） */
export type SlotPlan = {
  /** スロット番号 1〜16 */
  slotIndex: number
  /** 罠 or 通常 */
  kind: 'trap' | 'normal'
  /** 罠タイプ 1〜4（通常は null） */
  trapType: number | null
  /** 通常シナリオ番号 1〜4（罠は null） */
  normalIndex: number | null
  /** このメールの言語区分 */
  lang: TrapFirstLang
  /** 罠の提示回数: 1回目=1 / 2回目=2（通常は null） */
  exposureIndex: number | null
}

// ─── シード付き PRNG（mulberry32）────────────────────────────────────────────

/**
 * mulberry32: 32bit シードの決定論的 PRNG。[0,1) の値を返す。
 * 同じシードなら必ず同じ数列になる（Math.random は使わない）。
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Fisher–Yates シャッフル（渡した rng を使用。元配列は変更しない） */
function shuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

// ─── 割当の構築 ────────────────────────────────────────────────────────────

/**
 * seed から割当情報を決定論的に構築する。
 * - 先行言語: ['l1','l1','ja','ja'] をシャッフルしてタイプ1〜4へ割当 → 必ず母語先2・日本語先2。
 * - 前半/後半それぞれの罠タイプ出現順を別々にシャッフル。
 */
export function buildAssignment(seed: number): EmailAssignment {
  const rng = mulberry32(seed)

  const langPattern = shuffle<TrapFirstLang>(['l1', 'l1', 'ja', 'ja'], rng)
  const trapFirstLang: Record<string, TrapFirstLang> = {}
  for (let i = 0; i < TRAP_TYPES.length; i++) {
    trapFirstLang[String(TRAP_TYPES[i])] = langPattern[i]
  }

  const frontTrapOrder = shuffle([...TRAP_TYPES], rng)
  const backTrapOrder = shuffle([...TRAP_TYPES], rng)

  return { v: 1, seed: seed >>> 0, trapFirstLang, frontTrapOrder, backTrapOrder }
}

// ─── スロット配置の算出 ────────────────────────────────────────────────────

const otherLang = (l: TrapFirstLang): TrapFirstLang => (l === 'l1' ? 'ja' : 'l1')

/**
 * 割当情報から16スロットの配置計画を算出する純粋関数。
 * 前半Tスロット = 各タイプの1回目（先行言語）、後半Tスロット = 2回目（反対の言語）。
 */
export function planSlots(assignment: EmailAssignment): SlotPlan[] {
  const plans: SlotPlan[] = []

  // 前半（スロット1〜8）: 罠は exposure=1（先行言語）
  let ft = 0
  let fn = 0
  FRONT_SLOT_PATTERN.forEach((kind, i) => {
    const slotIndex = i + 1
    if (kind === 'T') {
      const trapType = assignment.frontTrapOrder[ft++]
      plans.push({
        slotIndex, kind: 'trap', trapType, normalIndex: null,
        lang: assignment.trapFirstLang[String(trapType)], exposureIndex: 1,
      })
    } else {
      const { lang, normalIndex } = FRONT_NORMAL_PLAN[fn++]
      plans.push({ slotIndex, kind: 'normal', trapType: null, normalIndex, lang, exposureIndex: null })
    }
  })

  // 後半（スロット9〜16）: 罠は exposure=2（反対の言語）
  let bt = 0
  let bn = 0
  BACK_SLOT_PATTERN.forEach((kind, i) => {
    const slotIndex = 9 + i
    if (kind === 'T') {
      const trapType = assignment.backTrapOrder[bt++]
      plans.push({
        slotIndex, kind: 'trap', trapType, normalIndex: null,
        lang: otherLang(assignment.trapFirstLang[String(trapType)]), exposureIndex: 2,
      })
    } else {
      const { lang, normalIndex } = BACK_NORMAL_PLAN[bn++]
      plans.push({ slotIndex, kind: 'normal', trapType: null, normalIndex, lang, exposureIndex: null })
    }
  })

  return plans
}

/**
 * email_set_id 文字列（割当JSON）から割当情報を復元する。
 * seed を正とし、そこから再構築することでリロード時も同一セットを再現する。
 * レガシー値（'ja-l2' 等）や不正値では null を返す。
 */
export function parseAssignment(raw: string | null | undefined): EmailAssignment | null {
  if (!raw) return null
  try {
    const obj = JSON.parse(raw) as { seed?: unknown }
    if (typeof obj.seed === 'number' && Number.isFinite(obj.seed)) {
      return buildAssignment(obj.seed)
    }
  } catch {
    // JSON でない（レガシー）→ null
  }
  return null
}

/** email_set_id に保存する JSON 文字列を生成する */
export function serializeAssignment(assignment: EmailAssignment): string {
  return JSON.stringify(assignment)
}
