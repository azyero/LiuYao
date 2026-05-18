<script setup lang="ts">
import type { Hexagram } from '@/types'

defineProps<{
  hexagram: Hexagram
  compact?: boolean
}>()
</script>

<template>
  <div
    class="card p-4 cursor-pointer hover:border-gold/40 transition-all duration-300 group"
    :class="compact ? 'p-3' : 'p-4'"
  >
    <div class="text-center">
      <div class="text-gold text-2xl mb-1 group-hover:scale-110 transition-transform">
        {{ hexagram.name }}
      </div>
      <div class="text-rice/80 text-sm">{{ hexagram.fullName }}</div>
      <div class="text-ink-500 text-xs mt-1">
        {{ hexagram.upperTrigram }}上{{ hexagram.lowerTrigram }}下
      </div>
    </div>
  </div>
</template>
