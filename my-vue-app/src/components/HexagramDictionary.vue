<script setup lang="ts">
import { ref, computed } from 'vue'
import { hexagrams, searchHexagrams } from '@/data/hexagrams'
import type { Hexagram } from '@/types'

const emit = defineEmits<{
  select: [hexagram: Hexagram]
}>()

const keyword = ref('')

const filteredHexagrams = computed(() => {
  return searchHexagrams(keyword.value)
})
</script>

<template>
  <div>
    <div class="mb-8 relative">
      <div class="absolute left-4 top-1/2 -translate-y-1/2" style="color: var(--text-placeholder);">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        v-model="keyword"
        type="text"
        placeholder="搜索卦名..."
        class="input-field pl-12"
      />
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
      <button
        v-for="hexagram in filteredHexagrams"
        :key="hexagram.number"
        class="card-hover p-3 text-center group"
        @click="emit('select', hexagram)"
      >
        <div class="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300"
          style="color: var(--gold-color);">
          {{ hexagram.name }}
        </div>
        <div class="text-xs leading-tight" style="color: var(--text-muted);">
          {{ hexagram.fullName }}
        </div>
      </button>
    </div>

    <div v-if="filteredHexagrams.length === 0" class="text-center py-16"
      style="color: var(--text-placeholder);">
      未找到匹配的卦象
    </div>
  </div>
</template>
