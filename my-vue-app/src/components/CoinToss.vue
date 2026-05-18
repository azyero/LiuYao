<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  animating: boolean
  coinResults: [number, number, number] | null
  coinRotations: [number, number, number]
}>()

const isInitial = computed(() => props.coinResults === null)

const textBagua = ['乾', '兑', '离', '震', '坤', '艮', '坎', '巽']
const symbolBagua = ['☰', '☱', '☲', '☳', '☷', '☶', '☵', '☴']

function getCirclePos(index: number) {
  const angle = index * 45
  const radius = 34
  return {
    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-5">
    <div
      v-for="index in 3"
      :key="index"
      class="coin-wrapper"
    >
      <div
        class="coin"
        :style="{ transform: `rotateY(${coinRotations[index - 1]}deg)` }"
      >
        <div class="coin-face front">
          <div class="center-hole"></div>
          <template v-if="!isInitial">
            <span
              v-for="(char, i) in textBagua"
              :key="'t'+i"
              class="bagua-item text-size"
              :style="getCirclePos(i)"
            >
              {{ char }}
            </span>
          </template>
        </div>

        <div class="coin-face back">
          <div class="center-hole"></div>
          <template v-if="!isInitial">
            <span
              v-for="(symbol, i) in symbolBagua"
              :key="'s'+i"
              class="bagua-item symbol-size"
              :style="getCirclePos(i)"
            >
              {{ symbol }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coin-wrapper {
  perspective: 1000px;
  width: 120px;
  height: 120px;
}

.coin {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1.8s cubic-bezier(0.15, 0.9, 0.15, 1.05);
}

.coin-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 50% 50%, #5a4d41 0%, #44392e 60%, #2b231b 100%);
  border: 10px solid;
  border-color: #c9944a;
  box-shadow:
    inset 0 0 0 2px rgba(180, 130, 60, 0.4),
    inset 0 0 16px rgba(0, 0, 0, 0.9),
    inset 0 0 3px rgba(255, 255, 255, 0.15),
    0 0 0 1px rgba(100, 70, 30, 0.6),
    0 10px 22px rgba(0,0,0,0.45);
  overflow: hidden;
}

.back {
  transform: rotateY(180deg);
}

.center-hole {
  position: absolute;
  width: 24px;
  height: 24px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-primary);
  border: 3px solid #c9944a;
  box-shadow:
    0 0 6px rgba(0,0,0,0.8),
    inset 0 2px 4px rgba(0,0,0,0.6);
  z-index: 2;
}

.bagua-item {
  position: absolute;
  left: 50%;
  top: 50%;
  font-family: "LiSu", "STLiti", "STKaiti", "Kaiti", "Noto Serif SC", serif;
  font-weight: bold;
  color: #c9944a;
  opacity: 0.95;
  text-shadow:
    1px 1px 1.5px rgba(0,0,0,0.9),
    -0.5px -0.5px 0.5px rgba(255,255,255,0.3);
}

.text-size {
  font-size: 14px;
}

.symbol-size {
  font-size: 13px;
  font-weight: 900;
}
</style>
