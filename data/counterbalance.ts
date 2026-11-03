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
  /** スキーマバージョン（1=通常メール固定配置 / 2=組A/組B分離＋シャッフル） */
  v: number
  /** 乱数シード（32bit 符号なし） */
  seed: number
  /** 各タイプ(キー '1'〜'4')の先行言語 */
  trapFirstLang: Record<string, TrapFirstLang>
  /** 前半Tスロットに入る罠タイプの出現順（[1,2,3,4] の並べ替え） */
  frontTrapOrder: number[]
  /** 後半Tスロットに入る罠タイプの出現順（[1,2,3,4] の並べ替え） */
  backTrapOrder: number[]
  /**
   * v2 のみ: 前半における組A{normal-1,2}の言語。
   * 'l1' なら前半=組A母語・組B日本語、後半はその逆（各シナリオの2版が前半/後半に分かれる）。
   */
  normalFirstLang?: TrapFirstLang
  /**
   * v2 のみ: 各半分の通常Nスロット(4つ)へセルを割り当てる並び順。
   * front/back とも [0,1,2,3] の並べ替え（セル定義は planSlots を参照）。
   */
  normalOrder?: { front: number[]; back: number[] }
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
 * 罠の割当に必要な乱数を引く（先行言語→前半順→後半順の順で rng を消費）。
 * この順序・回数は v1/v2 で共通であり、通常メール用の乱数は必ずこの後で引く。
 * そのため通常メールの割当を変えても罠の割当結果は一切変わらない。
 */
function drawTrapAssignment(rng: () => number): {
  trapFirstLang: Record<string, TrapFirstLang>
  frontTrapOrder: number[]
  backTrapOrder: number[]
} {
  const langPattern = shuffle<TrapFirstLang>(['l1', 'l1', 'ja', 'ja'], rng)
  const trapFirstLang: Record<string, TrapFirstLang> = {}
  for (let i = 0; i < TRAP_TYPES.length; i++) {
    trapFirstLang[String(TRAP_TYPES[i])] = langPattern[i]
  }
  const frontTrapOrder = shuffle([...TRAP_TYPES], rng)
  const backTrapOrder = shuffle([...TRAP_TYPES], rng)
  return { trapFirstLang, frontTrapOrder, backTrapOrder }
}

/**
 * v1 の割当（通常メールは FRONT_NORMAL_PLAN / BACK_NORMAL_PLAN の固定配置）。
 * 保存済み v:1 セッションの再構築に使用する（従来どおりの並び）。
 */
export function buildAssignmentV1(seed: number): EmailAssignment {
  const rng = mulberry32(seed)
  const trap = drawTrapAssignment(rng)
  return { v: 1, seed: seed >>> 0, ...trap }
}

/**
 * v2 の割当。罠の割当は v1 と同一（drawTrapAssignment を先に消費）。
 * その後に通常メール用の乱数を引く:
 *   1) normalFirstLang: 組A{1,2}を前半で母語にするか日本語にするか
 *   2) 前半Nスロットの並び順シャッフル
 *   3) 後半Nスロットの並び順シャッフル
 * さらに、前半最終Nスロット(slot7)と後半先頭Nスロット(slot10)に同一シナリオが
 * 来る（スロット差3）唯一の近接ケースを避けるため、必要なら後半の端どうしを入替える。
 */
export function buildAssignmentV2(seed: number): EmailAssignment {
  const rng = mulberry32(seed)
  const trap = drawTrapAssignment(rng)

  // ↓ 通常メール用の乱数は必ず罠の乱数の後で引く（罠結果を変えないため）
  const normalFirstLang: TrapFirstLang = rng() < 0.5 ? 'l1' : 'ja'
  const front = shuffle([0, 1, 2, 3], rng)

  // slot7(前半Nの4番目=front[3]) と slot10(後半Nの1番目=back[0]) が同一シナリオだと
  // スロット差3になる（唯一の近接ケース）。差≥4を保証するため back[0] !== front[3] を満たす
  // 並びだけ採用する。条件付きスワップは分布を歪める（front と一致する並びを人工的に増やす）ため、
  // 制約を満たすまで back を引き直すリジェクションサンプリングにする。これで採用される 18 通りの
  // 並びは一様になる（front と一致する確率は制約下の理論値 1/18 ≒ 5.56%）。
  let back = shuffle([0, 1, 2, 3], rng)
  while (back[0] === front[3]) {
    back = shuffle([0, 1, 2, 3], rng)
  }

  return {
    v: 2,
    seed: seed >>> 0,
    ...trap,
    normalFirstLang,
    normalOrder: { front, back },
  }
}

/** 新規セッション用の割当（現行は v2）。 */
export function buildAssignment(seed: number): EmailAssignment {
  return buildAssignmentV2(seed)
}

// ─── スロット配置の算出 ────────────────────────────────────────────────────

const otherLang = (l: TrapFirstLang): TrapFirstLang => (l === 'l1' ? 'ja' : 'l1')

type NormalCell = { lang: TrapFirstLang; normalIndex: number }

/**
 * v2 の通常メール配置計画を返す。
 * 組A={normal-1,2}, 組B={normal-3,4}。前半は「組A=firstLang・組B=反対」、後半はその逆。
 * これにより各シナリオの母語版/日本語版は必ず前半と後半に分かれる。
 * 各半分の4セルは normalOrder.front / normalOrder.back の並び順でNスロットへ割り当てる。
 * cell index は front/back とも index→シナリオ番号(index+1) が一致する。
 */
function normalCellsV2(firstLang: TrapFirstLang): { front: NormalCell[]; back: NormalCell[] } {
  const other = otherLang(firstLang)
  return {
    front: [
      { normalIndex: 1, lang: firstLang }, // 組A
      { normalIndex: 2, lang: firstLang }, // 組A
      { normalIndex: 3, lang: other },     // 組B
      { normalIndex: 4, lang: other },     // 組B
    ],
    back: [
      { normalIndex: 1, lang: other },     // 組A（前半の逆）
      { normalIndex: 2, lang: other },     // 組A
      { normalIndex: 3, lang: firstLang }, // 組B
      { normalIndex: 4, lang: firstLang }, // 組B
    ],
  }
}

/**
 * 割当情報から16スロットの配置計画を算出する純粋関数。
 * 前半Tスロット = 各タイプの1回目（先行言語）、後半Tスロット = 2回目（反対の言語）。
 * 通常メールは v2 では組A/組B分離＋シャッフル、v1 では従来の固定配置。
 */
export function planSlots(assignment: EmailAssignment): SlotPlan[] {
  const isV2 = assignment.v === 2 && !!assignment.normalFirstLang && !!assignment.normalOrder
  const cells = isV2 ? normalCellsV2(assignment.normalFirstLang as TrapFirstLang) : null
  const frontOrder = assignment.normalOrder?.front ?? [0, 1, 2, 3]
  const backOrder = assignment.normalOrder?.back ?? [0, 1, 2, 3]

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
      const cell = cells ? cells.front[frontOrder[fn]] : FRONT_NORMAL_PLAN[fn]
      fn++
      plans.push({
        slotIndex, kind: 'normal', trapType: null,
        normalIndex: cell.normalIndex, lang: cell.lang, exposureIndex: null,
      })
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
      const cell = cells ? cells.back[backOrder[bn]] : BACK_NORMAL_PLAN[bn]
      bn++
      plans.push({
        slotIndex, kind: 'normal', trapType: null,
        normalIndex: cell.normalIndex, lang: cell.lang, exposureIndex: null,
      })
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
    const obj = JSON.parse(raw) as { seed?: unknown; v?: unknown }
    if (typeof obj.seed === 'number' && Number.isFinite(obj.seed)) {
      // 保存済みバージョンに合わせて再構築する:
      //   v:1（従来の通常メール固定配置）はそのまま v1 で、それ以外は v2 で再構築。
      return obj.v === 1 ? buildAssignmentV1(obj.seed) : buildAssignmentV2(obj.seed)
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
