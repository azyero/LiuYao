import { ref, computed } from 'vue'
import type { YaoLine, DivinationResult, DivinationPhase } from '@/types'
import { tossThreeCoins, performDivination } from '@/utils/liuyao'

export function useDivination() {
  const phase = ref<DivinationPhase>('idle')
  const question = ref('')
  const currentLineIndex = ref(0)
  const lines = ref<YaoLine[]>([])
  const result = ref<DivinationResult | null>(null)
  const isAnimating = ref(false)
  const coinResults = ref<[2 | 3, 2 | 3, 2 | 3] | null>(null)
  const coinRotations = ref<[number, number, number]>([0, 0, 0])

  const progress = computed(() => currentLineIndex.value)
  const canToss = computed(() => phase.value === 'tossing' && currentLineIndex.value < 6)
  const isComplete = computed(() => phase.value === 'result')

  function startDivination() {
    phase.value = 'preparation'
    question.value = ''
  }

  function confirmPreparation(q: string) {
    question.value = q
    phase.value = 'tossing'
    currentLineIndex.value = 0
    lines.value = []
    result.value = null
    coinResults.value = null
    coinRotations.value = [0, 0, 0]
  }

  async function toss(): Promise<void> {
    if (!canToss.value || isAnimating.value) return

    isAnimating.value = true

    const c1 = Math.random() < 0.5 ? 2 : 3 as 2 | 3
    const c2 = Math.random() < 0.5 ? 2 : 3 as 2 | 3
    const c3 = Math.random() < 0.5 ? 2 : 3 as 2 | 3

    const baseSpins = 1080
    const newRotations: [number, number, number] = [0, 0, 0]
    const results = [c1, c2, c3]

    results.forEach((result, i) => {
      let target = coinRotations.value[i] + baseSpins
      if (result === 2) {
        target = target - (target % 360)
      } else {
        target = target - (target % 360) + 180
      }
      newRotations[i] = target
    })

    coinRotations.value = newRotations

    await new Promise(resolve => setTimeout(resolve, 100))

    coinResults.value = [c1, c2, c3]

    await new Promise(resolve => setTimeout(resolve, 1800))

    const newLine = tossThreeCoins()
    newLine.position = currentLineIndex.value
    lines.value = [...lines.value, newLine]

    isAnimating.value = false
    currentLineIndex.value++

    if (currentLineIndex.value >= 6) {
      result.value = performDivination(lines.value)
      phase.value = 'result'
    }
  }

  function reset() {
    phase.value = 'idle'
    question.value = ''
    currentLineIndex.value = 0
    lines.value = []
    result.value = null
    isAnimating.value = false
    coinResults.value = null
    coinRotations.value = [0, 0, 0]
  }

  return {
    phase,
    question,
    currentLineIndex,
    lines,
    result,
    isAnimating,
    coinResults,
    coinRotations,
    progress,
    canToss,
    isComplete,
    startDivination,
    confirmPreparation,
    toss,
    reset,
  }
}
