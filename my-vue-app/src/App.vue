<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDivination } from '@/composables/useDivination'
import { useTheme } from '@/composables/useTheme'
import { getRandomQuote } from '@/data/quotes'
import type { Hexagram } from '@/types'
import PreparationModal from '@/components/PreparationModal.vue'
import CoinToss from '@/components/CoinToss.vue'
import HexagramResult from '@/components/HexagramResult.vue'
import HexagramDictionary from '@/components/HexagramDictionary.vue'
import HexagramDetail from '@/components/HexagramDetail.vue'

const {
  phase,
  question,
  currentLineIndex,
  lines,
  result,
  isAnimating,
  coinResults,
  coinRotations,
  startDivination,
  confirmPreparation,
  toss,
  reset,
} = useDivination()

const { theme, toggleTheme } = useTheme()

const activeTab = ref<'divination' | 'dictionary'>('divination')
const selectedHexagram = ref<Hexagram | null>(null)

const positionNames = ['初', '二', '三', '四', '五', '上']

const quote = getRandomQuote()

const tossingHints = [
  '凝神静气，心注一境',
  '意念集中，气沉丹田',
  '心无杂念，专注所问',
  '诚意正心，感而遂通',
  '静观其变，卦象将成',
  '最后一爻，即将显现',
]

const currentHint = computed(() => {
  if (question.value) return `问：${question.value}`
  return tossingHints[currentLineIndex.value] || tossingHints[0]
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-40 backdrop-blur-md border-b"
      style="background-color: var(--bg-card); border-color: var(--border-color-light);">
      <div class="max-w-5xl mx-auto px-4">
        <div class="flex items-center justify-between h-14">
          <h1 class="text-lg font-serif tracking-[0.25em]" style="color: var(--gold-color);">
            六爻排盘
          </h1>

          <nav class="flex items-center gap-1">
            <button
              class="px-3 py-1.5 rounded-md text-sm transition-all duration-300"
              :style="{
                backgroundColor: activeTab === 'divination' ? 'rgba(138,112,32,0.1)' : 'transparent',
                color: activeTab === 'divination' ? 'var(--gold-color)' : 'var(--text-muted)',
              }"
              @click="activeTab = 'divination'"
            >
              起卦
            </button>
            <button
              class="px-3 py-1.5 rounded-md text-sm transition-all duration-300"
              :style="{
                backgroundColor: activeTab === 'dictionary' ? 'rgba(138,112,32,0.1)' : 'transparent',
                color: activeTab === 'dictionary' ? 'var(--gold-color)' : 'var(--text-muted)',
              }"
              @click="activeTab = 'dictionary'"
            >
              卦典
            </button>

            <div class="w-px h-5 mx-2" style="background-color: var(--border-color);" />

            <button
              class="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300"
              style="color: var(--text-muted);"
              @click="toggleTheme"
              :title="theme === 'dark' ? '切换亮色' : '切换暗色'"
            >
              <svg v-if="theme === 'dark'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
      <div v-if="activeTab === 'divination'">
        <div v-if="phase === 'idle'" class="flex flex-col items-center justify-center min-h-[75vh]">
          <div class="relative mb-12">
            <div class="text-6xl animate-float" style="color: var(--gold-dim);">☯</div>
            <div class="absolute inset-0 -m-16 rounded-full animate-breathe"
              style="background: radial-gradient(circle, var(--moving-glow), transparent 70%); z-index: -1;" />
          </div>

          <h2 class="text-2xl font-serif mb-8 tracking-[0.2em]" style="color: var(--text-primary);">
            六爻排盘
          </h2>

          <p class="text-sm tracking-[0.15em] mb-12" style="color: var(--text-muted);">
            静心三息 · 默念所问之事 · 卦象即将显现
          </p>

          <button class="btn-primary px-12 py-3.5" @click="startDivination">
            起 卦
          </button>

          <div class="mt-20 flex items-center justify-center gap-4 w-full max-w-xs">
            <div class="h-px flex-1" style="background: linear-gradient(to right, transparent, var(--border-color));" />
            <span class="text-xs" style="color: var(--text-placeholder);">☯</span>
            <div class="h-px flex-1" style="background: linear-gradient(to left, transparent, var(--border-color));" />
          </div>

          <blockquote class="mt-6 max-w-md text-center">
            <p class="text-xs italic leading-relaxed" style="color: var(--text-muted);">
              「{{ quote.text }}」
            </p>
            <cite class="block mt-1.5 text-xs not-italic" style="color: var(--text-placeholder);">
              —— {{ quote.source }}
            </cite>
          </blockquote>
        </div>

        <div v-else-if="phase === 'tossing'" class="space-y-8 max-w-lg mx-auto">
          <div class="text-center">
            <p class="text-sm mb-3 tracking-wider" style="color: var(--text-muted);">
              {{ currentHint }}
            </p>
            <p class="text-xs" style="color: var(--text-placeholder);">
              第 <span class="text-base font-medium" style="color: var(--gold-dim);">{{ currentLineIndex }}</span> / 6 爻
            </p>
          </div>

          <div class="flex justify-center gap-2">
            <div
              v-for="i in 6"
              :key="i"
              class="h-1 rounded-full transition-all duration-500"
              :style="{
                width: i <= currentLineIndex ? '28px' : '20px',
                backgroundColor: i <= currentLineIndex ? 'var(--gold-dim)' : 'var(--border-color)',
              }"
            />
          </div>

          <div class="card p-10">
            <CoinToss :animating="isAnimating" :coin-results="coinResults" :coin-rotations="coinRotations" />
          </div>

          <div v-if="lines.length > 0" class="card p-4">
            <div class="space-y-1">
              <div
                v-for="i in 6"
                :key="i"
                class="flex items-center gap-3 py-1"
              >
                <span class="text-xs w-6 text-right" style="color: var(--text-placeholder);">
                  {{ positionNames[i - 1] }}
                </span>
                <div class="flex-1 flex items-center justify-center">
                  <template v-if="lines[6 - i]">
                    <div class="flex items-center gap-2">
                      <template v-if="lines[6 - i].value % 2 === 1">
                        <div
                          class="h-2 rounded-full transition-all duration-500"
                          :style="{
                            width: lines[6 - i].isMoving ? '120px' : '100px',
                            backgroundColor: lines[6 - i].isMoving ? 'var(--moving-color)' : 'var(--text-primary)',
                            boxShadow: lines[6 - i].isMoving ? '0 0 10px var(--moving-glow)' : 'none',
                          }"
                        />
                      </template>
                      <template v-else>
                        <div class="flex gap-2">
                          <div
                            class="h-2 rounded-full transition-all duration-500"
                            :style="{
                              width: '44px',
                              backgroundColor: lines[6 - i].isMoving ? 'var(--moving-color)' : 'var(--text-primary)',
                              boxShadow: lines[6 - i].isMoving ? '0 0 10px var(--moving-glow)' : 'none',
                            }"
                          />
                          <div
                            class="h-2 rounded-full transition-all duration-500"
                            :style="{
                              width: '44px',
                              backgroundColor: lines[6 - i].isMoving ? 'var(--moving-color)' : 'var(--text-primary)',
                              boxShadow: lines[6 - i].isMoving ? '0 0 10px var(--moving-glow)' : 'none',
                            }"
                          />
                        </div>
                      </template>
                      <span
                        v-if="lines[6 - i].isMoving"
                        class="text-xs ml-1"
                        style="color: var(--moving-color);"
                      >
                        {{ lines[6 - i].value === 9 ? '○' : '×' }}
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="w-24 h-2 rounded-full" style="background-color: var(--border-color);" />
                  </template>
                </div>
                <span class="text-xs w-6" :style="{ color: lines[6 - i]?.isMoving ? 'var(--moving-color)' : 'var(--text-placeholder)' }">
                  {{ lines[6 - i]?.value ?? '' }}
                </span>
              </div>
            </div>
          </div>

          <div class="text-center">
            <button
              :disabled="isAnimating"
              :class="['btn-primary px-10 py-3', isAnimating ? 'opacity-50 cursor-not-allowed' : '']"
              @click="toss"
            >
              {{ isAnimating ? '起卦中...' : '起 卦' }}
            </button>
          </div>
        </div>

        <div v-else-if="phase === 'result' && result" class="space-y-6 max-w-2xl mx-auto">
          <HexagramResult :result="result" :question="question" />

          <div class="text-center pt-4">
            <button class="btn-primary" @click="reset">
              再次起卦
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'dictionary'">
        <HexagramDictionary @select="selectedHexagram = $event" />
      </div>
    </main>

    <PreparationModal
      :visible="phase === 'preparation'"
      @confirm="confirmPreparation"
    />

    <HexagramDetail
      :hexagram="selectedHexagram"
      @close="selectedHexagram = null"
    />
  </div>
</template>
