import type { YaoLine, Hexagram, DivinationResult } from '@/types'
import { hexagrams, trigramNames } from '@/data/hexagrams'

const trigramToLines: Record<string, [number, number, number]> = {
  '乾': [1, 1, 1],
  '坤': [0, 0, 0],
  '震': [0, 0, 1],
  '坎': [0, 1, 0],
  '艮': [1, 0, 0],
  '巽': [1, 1, 0],
  '离': [1, 0, 1],
  '兑': [0, 1, 1],
}

export function tossCoin(): 2 | 3 {
  return Math.random() < 0.5 ? 2 : 3
}

export function tossThreeCoins(): YaoLine {
  const coins = [tossCoin(), tossCoin(), tossCoin()]
  const sum = coins[0] + coins[1] + coins[2] as 6 | 7 | 8 | 9
  return {
    position: 0,
    value: sum,
    isMoving: sum === 6 || sum === 9,
  }
}

export function generateSixLines(): YaoLine[] {
  const lines: YaoLine[] = []
  for (let i = 0; i < 6; i++) {
    const line = tossThreeCoins()
    line.position = i
    lines.push(line)
  }
  return lines
}

function getTrigramsFromLines(lines: YaoLine[]): { upper: string; lower: string } {
  const lowerLines = lines.slice(0, 3).map(l => l.value % 2 === 0 ? 0 : 1)
  const upperLines = lines.slice(3, 6).map(l => l.value % 2 === 0 ? 0 : 1)

  let lower = ''
  let upper = ''

  for (const [name, pattern] of Object.entries(trigramToLines)) {
    if (pattern[0] === lowerLines[0] && pattern[1] === lowerLines[1] && pattern[2] === lowerLines[2]) {
      lower = name
    }
    if (pattern[0] === upperLines[0] && pattern[1] === upperLines[1] && pattern[2] === upperLines[2]) {
      upper = name
    }
  }

  return { upper, lower }
}

export function getHexagramFromLines(lines: YaoLine[]): Hexagram | undefined {
  const { upper, lower } = getTrigramsFromLines(lines)
  return hexagrams.find(h => h.upperTrigram === upper && h.lowerTrigram === lower)
}

export function getChangedLines(lines: YaoLine[]): YaoLine[] {
  return lines.map(line => {
    if (!line.isMoving) return { ...line }
    const newValue = line.value === 6 ? 7 : line.value === 9 ? 8 : line.value
    return {
      ...line,
      value: newValue as 6 | 7 | 8 | 9,
      isMoving: false,
    }
  })
}

export function getChangedHexagram(lines: YaoLine[]): Hexagram | undefined {
  const changedLines = getChangedLines(lines)
  return getHexagramFromLines(changedLines)
}

export function getYaoName(position: number, value: number): string {
  const positionNames = ['初', '二', '三', '四', '五', '上']
  const yinYang = value % 2 === 0 ? '六' : '九'
  return positionNames[position] + yinYang
}

export function getLineType(value: number): 'yang' | 'yin' | 'moving-yang' | 'moving-yin' {
  switch (value) {
    case 7: return 'yang'
    case 8: return 'yin'
    case 9: return 'moving-yang'
    case 6: return 'moving-yin'
    default: return 'yang'
  }
}

export function performDivination(lines: YaoLine[]): DivinationResult {
  const originalHexagram = getHexagramFromLines(lines)
  const movingLinePositions = lines
    .filter(l => l.isMoving)
    .map(l => l.position)

  const hasMovingLines = movingLinePositions.length > 0
  const changedHexagram = hasMovingLines ? getChangedHexagram(lines) : null

  return {
    lines,
    originalHexagram: originalHexagram!,
    changedHexagram: changedHexagram || null,
    movingLinePositions,
  }
}

export function getTrigramName(trigram: string): string {
  return trigramNames[trigram] || trigram
}
