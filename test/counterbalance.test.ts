// カウンターバランス検証テスト
// 実行: node --experimental-strip-types test/counterbalance.test.ts
//
// seed を100個変えて以下を確認する:
//   (a) 母語先(l1)が常に2タイプ・日本語先(ja)が2タイプ
//   (b) 同一タイプの2通が前半(1〜8)・後半(9〜16)に分かれる
//   (c) 全16通が重複なく並ぶ（スロット1〜16・メール内容の重複なし）
//   (d) 同じ seed なら必ず同じ並びになる

import { buildAssignment, planSlots, type SlotPlan } from '../data/counterbalance.ts'

let failures = 0
function check(cond: boolean, msg: string) {
  if (!cond) {
    failures++
    console.error('  ✗ ' + msg)
  }
}

const SEEDS = Array.from({ length: 100 }, (_, i) => i * 2654435761 % 0xffffffff)

for (const seed of SEEDS) {
  const asg = buildAssignment(seed)
  const plan = planSlots(asg)

  // (a) 先行言語の均等化: l1 が2・ja が2
  const firstLangs = Object.values(asg.trapFirstLang)
  const l1First = firstLangs.filter((l) => l === 'l1').length
  const jaFirst = firstLangs.filter((l) => l === 'ja').length
  check(l1First === 2 && jaFirst === 2, `seed ${seed}: 先行言語が 2/2 でない (l1=${l1First}, ja=${jaFirst})`)

  // 16スロット存在
  check(plan.length === 16, `seed ${seed}: スロット数が16でない (${plan.length})`)

  // (c-1) slotIndex が 1..16 で重複なし
  const slots = [...plan.map((p) => p.slotIndex)].sort((a, b) => a - b)
  check(
    slots.join(',') === Array.from({ length: 16 }, (_, i) => i + 1).join(','),
    `seed ${seed}: slotIndex が 1..16 を網羅していない`,
  )

  // 罠8・通常8
  const traps = plan.filter((p) => p.kind === 'trap')
  const normals = plan.filter((p) => p.kind === 'normal')
  check(traps.length === 8, `seed ${seed}: 罠が8通でない (${traps.length})`)
  check(normals.length === 8, `seed ${seed}: 通常が8通でない (${normals.length})`)

  // (b) 各タイプの2通が前半・後半に分かれ、exposure が 1/2
  for (const tp of [1, 2, 3, 4]) {
    const ex = traps.filter((p) => p.trapType === tp).sort((a, b) => a.slotIndex - b.slotIndex)
    check(ex.length === 2, `seed ${seed}: type${tp} が2通でない (${ex.length})`)
    if (ex.length === 2) {
      check(ex[0].slotIndex <= 8 && ex[1].slotIndex >= 9, `seed ${seed}: type${tp} が前半/後半に分かれていない`)
      check(ex[0].exposureIndex === 1 && ex[1].exposureIndex === 2, `seed ${seed}: type${tp} の exposure が 1→2 でない`)
      // 1回目=先行言語、2回目=反対の言語
      check(ex[0].lang === asg.trapFirstLang[String(tp)], `seed ${seed}: type${tp} の1回目言語が先行言語と不一致`)
      check(ex[0].lang !== ex[1].lang, `seed ${seed}: type${tp} の2通が同一言語`)
    }
  }

  // (c-2) メール内容の重複なし: (kind,trapType,normalIndex,lang) の組が16通りユニーク
  const keyOf = (p: SlotPlan) => `${p.kind}:${p.trapType}:${p.normalIndex}:${p.lang}`
  const uniq = new Set(plan.map(keyOf))
  check(uniq.size === 16, `seed ${seed}: メール内容が重複している (${uniq.size}/16 ユニーク)`)

  // 罠の (type,lang) が8通りユニーク
  const trapKeys = new Set(traps.map((p) => `${p.trapType}:${p.lang}`))
  check(trapKeys.size === 8, `seed ${seed}: 罠(type,lang)が8通りでない (${trapKeys.size})`)

  // 通常: 母語4・日本語4
  const nL1 = normals.filter((p) => p.lang === 'l1').length
  const nJa = normals.filter((p) => p.lang === 'ja').length
  check(nL1 === 4 && nJa === 4, `seed ${seed}: 通常の言語配分が 4/4 でない (l1=${nL1}, ja=${nJa})`)

  // 前半・後半それぞれに通常 母語2・日本語2
  const frontNormals = normals.filter((p) => p.slotIndex <= 8)
  const backNormals = normals.filter((p) => p.slotIndex >= 9)
  check(
    frontNormals.filter((p) => p.lang === 'l1').length === 2 &&
      frontNormals.filter((p) => p.lang === 'ja').length === 2,
    `seed ${seed}: 前半の通常が 母語2/日本語2 でない`,
  )
  check(
    backNormals.filter((p) => p.lang === 'l1').length === 2 &&
      backNormals.filter((p) => p.lang === 'ja').length === 2,
    `seed ${seed}: 後半の通常が 母語2/日本語2 でない`,
  )

  // (d) 再現性: 同じ seed で同じ並び
  const plan2 = planSlots(buildAssignment(seed))
  check(JSON.stringify(plan) === JSON.stringify(plan2), `seed ${seed}: 同一seedで再現されない`)
}

// 異なる seed では（少なくとも一部で）並びが変わることも確認
const distinctArrangements = new Set(SEEDS.map((s) => JSON.stringify(planSlots(buildAssignment(s)))))
check(distinctArrangements.size > 1, `全seedで同一の並びになっている（シャッフルが効いていない）`)

if (failures === 0) {
  console.log(`✓ 全テスト合格（${SEEDS.length} seeds, 異なる並び ${distinctArrangements.size} 種）`)
  process.exit(0)
} else {
  console.error(`✗ ${failures} 件の失敗`)
  process.exit(1)
}
