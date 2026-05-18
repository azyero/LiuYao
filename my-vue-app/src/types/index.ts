export interface Hexagram {
  number: number
  name: string
  fullName: string
  upperTrigram: string
  lowerTrigram: string
  judgment: string
  image: string
  lines: string[]
  modernExplanation: string
}

export interface YaoLine {
  position: number
  value: 6 | 7 | 8 | 9
  isMoving: boolean
}

export interface DivinationResult {
  lines: YaoLine[]
  originalHexagram: Hexagram
  changedHexagram: Hexagram | null
  movingLinePositions: number[]
}

export type DivinationPhase = 'idle' | 'preparation' | 'tossing' | 'result'
