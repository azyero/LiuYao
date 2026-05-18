<script setup lang="ts">
import { computed } from 'vue'
import { getLineType } from '@/utils/liuyao'

const props = defineProps<{
  value: number
  isMoving: boolean
  showLabel?: boolean
  position?: number
}>()

const lineType = computed(() => getLineType(props.value))

const positionNames = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻']
</script>

<template>
  <div class="flex items-center gap-3 py-1.5">
    <span v-if="showLabel" class="text-xs w-8 text-right" style="color: var(--text-placeholder);">
      {{ positionNames[position ?? 0] }}
    </span>

    <div class="flex-1 flex items-center justify-center">
      <div class="relative">
        <template v-if="lineType === 'yang' || lineType === 'moving-yang'">
          <div
            class="h-2 rounded-full transition-all duration-500 animate-line-draw"
            :style="{
              width: isMoving ? '120px' : '100px',
              backgroundColor: isMoving ? 'var(--moving-color)' : 'var(--text-primary)',
              boxShadow: isMoving ? '0 0 10px var(--moving-glow)' : 'none',
              animationDelay: `${(position ?? 0) * 0.1}s`,
            }"
          />
        </template>
        <template v-else>
          <div
            class="flex items-center gap-2 animate-line-draw"
            :style="{ animationDelay: `${(position ?? 0) * 0.1}s` }"
          >
            <div
              class="h-2 rounded-full transition-all duration-500"
              :style="{
                width: '44px',
                backgroundColor: isMoving ? 'var(--moving-color)' : 'var(--text-primary)',
                boxShadow: isMoving ? '0 0 10px var(--moving-glow)' : 'none',
              }"
            />
            <div
              class="h-2 rounded-full transition-all duration-500"
              :style="{
                width: '44px',
                backgroundColor: isMoving ? 'var(--moving-color)' : 'var(--text-primary)',
                boxShadow: isMoving ? '0 0 10px var(--moving-glow)' : 'none',
              }"
            />
          </div>
        </template>

        <span
          v-if="isMoving"
          class="absolute -right-6 top-1/2 -translate-y-1/2 text-xs"
          style="color: var(--moving-color);"
        >
          {{ lineType === 'moving-yang' ? '○' : '×' }}
        </span>
      </div>
    </div>

    <span v-if="showLabel" class="text-xs w-6"
      :style="{ color: isMoving ? 'var(--moving-color)' : 'var(--text-placeholder)' }">
      {{ value }}
    </span>
  </div>
</template>
