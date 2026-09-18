const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

// Run the actual TypeScript modules using the project's existing compiler.
const cache = new Map()
function load(relativePath) {
  const filename = path.resolve(__dirname, '../src', relativePath)
  if (cache.has(filename)) return cache.get(filename).exports
  const module = { exports: {} }
  cache.set(filename, module)
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  const localRequire = specifier => {
    if (specifier.startsWith('@/')) return load(specifier.slice(2) + '.ts')
    if (specifier.startsWith('.')) return load(path.relative(path.resolve(__dirname, '../src'), path.resolve(path.dirname(filename), specifier)) + '.ts')
    return require(specifier)
  }
  new Function('require', 'module', 'exports', code)(localRequire, module, module.exports)
  return module.exports
}

const utils = load('utils/liuyao.ts')
const { hexagrams } = load('data/hexagrams.ts')
const makeLines = values => values.map((value, position) => ({ value, position, isMoving: value === 6 || value === 9 }))

test('all 64 hexagrams agree with the yin/yang in their six canonical line names', () => {
  assert.equal(hexagrams.length, 64)
  for (const hexagram of hexagrams) {
    const values = hexagram.lines.map(line => line.split('：')[0].includes('九') ? 7 : 8)
    assert.equal(utils.getHexagramFromLines(makeLines(values)).number, hexagram.number, hexagram.fullName)
    assert.deepEqual(utils.getHexagramLines(hexagram), values, hexagram.fullName + ' drawing')
  }
})

test('family with third and fifth moving yang lines becomes mountain over thunder', () => {
  const result = utils.performDivination(makeLines([7, 8, 9, 8, 9, 7]))
  assert.equal(result.originalHexagram.fullName, '风火家人')
  assert.equal(result.changedHexagram.fullName, '山雷颐')
  assert.deepEqual(result.movingLinePositions, [2, 4])
})

test('reported raw cast is revolution changing to thunder', () => {
  const result = utils.performDivination(makeLines([7, 8, 9, 7, 9, 8]))
  assert.equal(result.originalHexagram.fullName, '泽火革')
  assert.equal(result.changedHexagram.fullName, '震为雷')
})

test('only moving lines flip and input remains unchanged', () => {
  const lines = makeLines([6, 7, 8, 9, 7, 8])
  assert.deepEqual(utils.getChangedLines(lines).map(line => line.value), [7, 7, 8, 8, 7, 8])
  assert.deepEqual(lines.map(line => line.value), [6, 7, 8, 9, 7, 8])
  assert.equal(utils.performDivination(makeLines([7, 8, 7, 8, 7, 8])).changedHexagram, null)
})

test('line names use 初九、九二…上九 and 初六、六二…上六', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5].map(p => utils.getYaoName(p, 9)), ['初九', '九二', '九三', '九四', '九五', '上九'])
  assert.deepEqual([0, 1, 2, 3, 4, 5].map(p => utils.getYaoName(p, 6)), ['初六', '六二', '六三', '六四', '六五', '上六'])
})

test('each cast records exactly the displayed coins and their face rotations', async t => {
  const { useDivination } = load('composables/useDivination.ts')
  const casting = useDivination()
  t.mock.method(global, 'setTimeout', callback => { queueMicrotask(callback); return 0 })
  let index = 0
  const sequence = [0.1, 0.1, 0.9, 0.9, 0.9, 0.9]
  t.mock.method(Math, 'random', () => sequence[index++ % sequence.length])
  casting.confirmPreparation('回归测试')
  for (let i = 0; i < 6; i++) {
    const pending = casting.toss()
    await casting.toss() // double clicks must not record a second line
    await pending
    const coins = casting.coinResults.value
    assert.equal(casting.lines.value[i].value, coins.reduce((a, b) => a + b, 0))
    assert.deepEqual(casting.coinRotations.value.map(angle => angle % 360), coins.map(value => value === 3 ? 0 : 180))
    assert.equal(casting.lines.value.length, i + 1)
  }
  assert.equal(index, 18)
  assert.equal(casting.phase.value, 'result')
  assert.ok(casting.result.value.originalHexagram)
  casting.reset()
  assert.equal(casting.lines.value.length, 0)
})
