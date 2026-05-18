<script setup lang="ts">
import type { Hexagram } from '@/types'
import HexagramLine from './HexagramLine.vue'
import { trigramNames } from '@/data/hexagrams'

defineProps<{
  hexagram: Hexagram | null
}>()

const emit = defineEmits<{
  close: []
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
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="hexagram" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 backdrop-blur-md"
          style="background: rgba(0,0,0,0.6);"
          @click="emit('close')" />

        <div class="relative w-full max-w-lg card p-8 animate-fade-in max-h-[90vh] overflow-y-auto">
          <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style="background: linear-gradient(90deg, var(--gold-dark), var(--gold-color), var(--gold-light));" />

          <button
            class="absolute top-4 right-4 transition-colors duration-300"
            style="color: var(--text-muted);"
            @click="emit('close')"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="text-center mb-8">
            <div class="text-5xl mb-2" style="color: var(--gold-color);">
              {{ hexagram.name }}
            </div>
            <div class="text-xl" style="color: var(--text-primary);">
              {{ hexagram.fullName }}
            </div>
            <div class="text-sm mt-1" style="color: var(--text-muted);">
              {{ hexagram.upperTrigram }}（{{ trigramNames[hexagram.upperTrigram] }}）上 ·
              {{ hexagram.lowerTrigram }}（{{ trigramNames[hexagram.lowerTrigram] }}）下
            </div>
            <div class="w-20 h-px mx-auto mt-4"
              style="background: linear-gradient(90deg, transparent, var(--gold-color), transparent);" />
          </div>

          <div class="flex justify-center mb-8">
            <div class="space-y-2 p-4 rounded-xl"
              style="background-color: var(--bg-secondary);">
              <HexagramLine
                v-for="(value, index) in getHexagramLines(hexagram).slice().reverse()"
                :key="5 - index"
                :value="value"
                :is-moving="false"
                :position="5 - index"
              />
            </div>
          </div>

          <div class="space-y-5">
            <div>
              <h4 class="text-sm mb-2 font-medium" style="color: var(--gold-color);">卦辞</h4>
              <p class="leading-relaxed" style="color: var(--text-primary);">
                {{ hexagram.judgment }}
              </p>
            </div>

            <div>
              <h4 class="text-sm mb-2 font-medium" style="color: var(--gold-color);">象辞</h4>
              <p class="text-sm leading-relaxed" style="color: var(--text-secondary);">
                {{ hexagram.image }}
              </p>
            </div>

            <div class="border-t pt-5" style="border-color: var(--border-color-light);">
              <h4 class="text-sm mb-3 font-medium" style="color: var(--gold-color);">爻辞</h4>
              <div class="space-y-2.5">
                <p
                  v-for="(line, index) in hexagram.lines"
                  :key="index"
                  class="text-sm leading-relaxed"
                  style="color: var(--text-secondary);"
                >
                  {{ line }}
                </p>
              </div>
            </div>

            <div class="border-t pt-5" style="border-color: var(--border-color-light);">
              <div class="text-sm leading-relaxed" style="color: var(--text-secondary);">
                {{ hexagram.modernExplanation }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
