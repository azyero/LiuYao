<script setup lang="ts">
import type { Hexagram } from '@/types'
import HexagramLine from './HexagramLine.vue'
import { trigramNames } from '@/data/hexagrams'

defineProps<{
  hexagram: Hexagram
  movingLinePositions?: number[]
}>()

const trigramLineMap: Record<string, number[]> = {
  '乾': [1, 1, 1],
  '坤': [0, 0, 0],
  '震': [0, 0, 1],
  '坎': [0, 1, 0],
  '艮': [1, 0, 0],
  '巽': [1, 1, 0],
  '离': [1, 0, 1],
  '兑': [0, 1, 1],
}

function getHexagramLines(hexagram: Hexagram): number[] {
  const lower = trigramLineMap[hexagram.lowerTrigram] || [0, 0, 0]
  const upper = trigramLineMap[hexagram.upperTrigram] || [0, 0, 0]
  return [...lower, ...upper].map(v => v === 1 ? 7 : 8)
}
</script>

<template>
  <div class="card p-6 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
      style="background: linear-gradient(to bottom, var(--gold-color), transparent);" />

    <div class="text-center mb-5">
      <div class="text-3xl mb-1" style="color: var(--gold-color);">
        {{ hexagram.name }}
      </div>
      <div class="text-sm" style="color: var(--text-secondary);">
        {{ hexagram.fullName }}
      </div>
    </div>

    <div class="space-y-1 mb-5">
      <HexagramLine
        v-for="(value, index) in getHexagramLines(hexagram).slice().reverse()"
        :key="5 - index"
        :value="movingLinePositions?.includes(5 - index) ? (value === 7 ? 9 : 6) : value"
        :is-moving="!!movingLinePositions?.includes(5 - index)"
        :position="5 - index"
        :show-label="true"
      />
    </div>

    <div class="border-t pt-4 mt-4" style="border-color: var(--border-color-light);">
      <p class="text-sm leading-relaxed" style="color: var(--text-secondary);">
        {{ hexagram.judgment }}
      </p>
    </div>
  </div>
</template>
