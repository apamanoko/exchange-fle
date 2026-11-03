// 通常メール割当（v2）の検証テスト
// 実行: node --experimental-strip-types test/counterbalance-normal.test.ts
//
// seed を100個変えて確認する:
//   (a) 同じシナリオの2版が必ず前半(1〜8)と後半(9〜16)に分かれる
//   (b) 同じシナリオの2版がスロット差で4以上離れている
//   (c) 前半・後半それぞれ 母語2・日本語2
//   (d) 同じ seed で再現される
//   (e) 罠の割当は変更前（v1 = drawTrapAssignment のみ）と同一

import {
  buildAssignment, buildAssignmentV1, planSlots, parseAssignment, serializeAssignment,
  type SlotPlan,
} from '../data/counterbalance.ts'

let failures = 0
function check(cond: boolean, msg: string) {
  if (!cond) { failures++; console.error('  ✗ ' + msg) }
}

const SEEDS = Array.from({ length: 100 }, (_, i) => (i * 2654435761) % 0xffffffff)

for (const seed of SEEDS) {
  const asg = buildAssignment(seed)
  check(asg.v === 2, `seed ${seed}: v が2でない`)

  const plan = planSlots(asg)
  const normals = plan.filter((p) => p.kind === 'normal')
  check(normals.length === 8, `seed ${seed}: 通常が8通でない (${normals.length})`)

  // シナリオ番号ごとに2版をまとめる
  for (const sc of [1, 2, 3, 4]) {
    const versions = normals
      .filter((p) => p.normalIndex === sc)
      .sort((a, b) => a.slotIndex - b.slotIndex)
    check(versions.length === 2, `seed ${seed}: normal-${sc} が2版でない (${versions.length})`)
    if (versions.length === 2) {
      const [a, b] = versions
      // (a) 前半/後半に分かれる
      check(a.slotIndex <= 8 && b.slotIndex >= 9, `seed ${seed}: normal-${sc} が前半/後半に分かれていない (${a.slotIndex}, ${b.slotIndex})`)
      // (b) スロット差4以上
      check(b.slotIndex - a.slotIndex >= 4, `seed ${seed}: normal-${sc} のスロット差が4未満 (${a.slotIndex}→${b.slotIndex})`)
      // 2版は別言語
      check(a.lang !== b.lang, `seed ${seed}: normal-${sc} の2版が同一言語`)
    }
  }

  // (c) 前半・後半それぞれ 母語2・日本語2
  const front = normals.filter((p) => p.slotIndex <= 8)
  const back = normals.filter((p) => p.slotIndex >= 9)
  check(
    front.filter((p) => p.lang === 'l1').length === 2 && front.filter((p) => p.lang === 'ja').length === 2,
    `seed ${seed}: 前半通常が 母語2/日本語2 でない`,
  )
  check(
    back.filter((p) => p.lang === 'l1').length === 2 && back.filter((p) => p.lang === 'ja').length === 2,
    `seed ${seed}: 後半通常が 母語2/日本語2 でない`,
  )

  // 通常8通が重複なし (normalIndex, lang) × 8
  const nkeys = new Set(normals.map((p) => `${p.normalIndex}:${p.lang}`))
  check(nkeys.size === 8, `seed ${seed}: 通常メールが重複している (${nkeys.size}/8)`)

  // (d) 再現性
  const plan2 = planSlots(buildAssignment(seed))
  check(JSON.stringify(plan) === JSON.stringify(plan2), `seed ${seed}: 同一seedで再現されない`)

  // (e) 罠の割当が v1（=変更前）と同一
  const v1 = buildAssignmentV1(seed)
  check(JSON.stringify(asg.trapFirstLang) === JSON.stringify(v1.trapFirstLang), `seed ${seed}: trapFirstLang が変更前と不一致`)
  check(JSON.stringify(asg.frontTrapOrder) === JSON.stringify(v1.frontTrapOrder), `seed ${seed}: frontTrapOrder が変更前と不一致`)
  check(JSON.stringify(asg.backTrapOrder) === JSON.stringify(v1.backTrapOrder), `seed ${seed}: backTrapOrder が変更前と不一致`)
  // 罠スロット（T）の配置も v1 と完全一致することを確認
  const trapPlanV2 = planSlots(asg).filter((p) => p.kind === 'trap')
  const trapPlanV1 = planSlots(v1).filter((p) => p.kind === 'trap')
  check(JSON.stringify(trapPlanV2) === JSON.stringify(trapPlanV1), `seed ${seed}: 罠スロット配置が変更前と不一致`)
}

// 後方互換: 保存済み v:1 JSON はそのまま（従来の固定配置で）再構築される
{
  const seed = 123456789
  const v1raw = serializeAssignment(buildAssignmentV1(seed))
  const parsed = parseAssignment(v1raw)
  check(parsed !== null && parsed.v === 1, `v1 JSON が v1 として再構築されない`)
  check(
    parsed !== null && JSON.stringify(planSlots(parsed)) === JSON.stringify(planSlots(buildAssignmentV1(seed))),
    `v1 JSON の再構築結果が従来配置と異なる`,
  )
  // v:2 JSON は v2 として再構築される
  const v2raw = serializeAssignment(buildAssignment(seed))
  const parsed2 = parseAssignment(v2raw)
  check(parsed2 !== null && parsed2.v === 2, `v2 JSON が v2 として再構築されない`)
  check(
    parsed2 !== null && JSON.stringify(planSlots(parsed2)) === JSON.stringify(planSlots(buildAssignment(seed))),
    `v2 JSON の再構築結果が不一致`,
  )
}

// normalFirstLang が seed で分かれること（前半/後半の入替えが機能している）
const firstLangs = new Set(SEEDS.map((s) => buildAssignment(s).normalFirstLang))
check(firstLangs.size === 2, `normalFirstLang が両方の値を取らない（${[...firstLangs].join(',')}）`)

// 通常の並びが seed によって変化すること（シャッフルが効いている）
const arrangements = new Set(
  SEEDS.map((s) => JSON.stringify(planSlots(buildAssignment(s)).filter((p: SlotPlan) => p.kind === 'normal'))),
)
check(arrangements.size > 1, `全seedで通常の並びが同一（シャッフルが効いていない）`)

if (failures === 0) {
  console.log(`✓ 全テスト合格（${SEEDS.length} seeds, 通常の並び ${arrangements.size} 種, normalFirstLang ${firstLangs.size} 種）`)
  process.exit(0)
} else {
  console.error(`✗ ${failures} 件の失敗`)
  process.exit(1)
}
