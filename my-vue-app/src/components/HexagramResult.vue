<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DivinationResult } from '@/types'
import HexagramView from './HexagramView.vue'
import { getYaoName } from '@/utils/liuyao'

const props = defineProps<{
  result: DivinationResult
  question?: string
}>()

const showPrompt = ref(false)
const copied = ref(false)

const promptText = computed(() => {
  const lines: string[] = []
  lines.push('我求测的事情是：' + (props.question || '未说明'))
  lines.push('本卦：' + props.result.originalHexagram.fullName)
  if (props.result.changedHexagram) {
    lines.push('变卦：' + props.result.changedHexagram.fullName)
  }
  if (props.result.movingLinePositions.length > 0) {
    const movingNames = props.result.movingLinePositions
      .map(pos => getYaoName(pos, props.result.lines[pos].value))
      .join('、')
    lines.push('动爻：' + movingNames)
  }
  return lines.join('\n')
})

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(promptText.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = promptText.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<template>
  <div class="animate-fade-in">
    <div v-if="question" class="text-center mb-8">
      <p class="text-xs mb-1 tracking-wider" style="color: var(--text-muted);">所问之事</p>
      <p class="text-lg" style="color: var(--text-primary);">{{ question }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-center text-xs mb-3 tracking-[0.2em]" style="color: var(--gold-dim);">
          本 卦
        </h3>
        <HexagramView
          :hexagram="result.originalHexagram"
          :moving-line-positions="result.movingLinePositions"
        />
      </div>

      <div v-if="result.changedHexagram">
        <h3 class="text-center text-xs mb-3 tracking-[0.2em]" style="color: var(--gold-dim);">
          变 卦
        </h3>
        <HexagramView
          :hexagram="result.changedHexagram"
        />
      </div>
    </div>

    <div v-if="result.movingLinePositions.length > 0" class="mt-6 card p-4">
      <h4 class="text-xs mb-2 tracking-wider" style="color: var(--gold-dim);">动爻</h4>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="pos in result.movingLinePositions"
          :key="pos"
          class="px-3 py-1 rounded-md text-sm"
          style="background-color: rgba(138, 112, 32, 0.1); color: var(--moving-color);"
        >
          {{ getYaoName(pos, result.lines[pos].value) }}
        </span>
      </div>
    </div>

    <div class="mt-6 text-center">
      <button class="btn-outline" @click="showPrompt = true">
        <span>提示词</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showPrompt" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 backdrop-blur-md"
            style="background: rgba(0,0,0,0.7);"
            @click="showPrompt = false" />
          <div class="relative w-full max-w-md card p-6 animate-fade-in">
            <button
              class="absolute top-3 right-3 transition-colors duration-300"
              style="color: var(--text-muted);"
              @click="showPrompt = false"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 class="text-sm mb-4" style="color: var(--text-secondary);">
              复制以下内容发送给AI解读
            </h3>

            <textarea
              :value="promptText"
              readonly
              rows="5"
              class="input-field resize-none text-sm"
            />

            <button
              class="mt-4 w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
              :style="{
                background: copied
                  ? 'linear-gradient(135deg, #065f46, #059669)'
                  : 'linear-gradient(135deg, var(--accent-dark), var(--accent-color), var(--accent-light))',
                color: '#e8e0d0',
              }"
              @click="copyPrompt"
            >
              {{ copied ? '已复制 ✓' : '复制' }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
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
