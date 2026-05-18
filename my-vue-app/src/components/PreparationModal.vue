<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  confirm: [question: string]
}>()

import { ref } from 'vue'

const questionText = ref('')

function handleConfirm() {
  emit('confirm', questionText.value)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 backdrop-blur-md"
          style="background: rgba(0,0,0,0.7);" />
        <div class="relative w-full max-w-sm card p-8 animate-fade-in">
          <div class="text-center mb-8">
            <div class="text-4xl mb-4" style="color: var(--gold-dim);">☯</div>
            <h2 class="text-xl font-serif tracking-[0.2em]" style="color: var(--text-primary);">
              六爻占卜
            </h2>
            <div class="w-12 h-px mx-auto mt-3" style="background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);" />
          </div>

          <div class="space-y-5 text-center">
            <p class="text-sm leading-relaxed" style="color: var(--text-muted);">
              请先静心，深呼吸三次...
            </p>
            <p class="text-xs leading-relaxed" style="color: var(--text-placeholder);">
              在心中默念你想问的事情，专注于此。<br />心诚则灵，意念专注。
            </p>

            <div class="pt-2">
              <textarea
                v-model="questionText"
                placeholder="我想问的事情是...（可选）"
                rows="3"
                class="input-field resize-none text-sm"
              />
            </div>

            <button
              class="btn-primary w-full tracking-[0.2em]"
              @click="handleConfirm"
            >
              心已静，开始摇卦
            </button>
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
