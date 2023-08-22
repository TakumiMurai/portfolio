<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)
const positionX = ref(0)
const positionY = ref(0)
const opacityA = ref(0)
const opacityB = ref(0)

const onMouseMove = (event: MouseEvent) => {
  console.log('mousemove')
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}
</script>

<template>
  <div class="mouse-stalker-wrapper" @mousemove="onMouseMove">
    <div class="cursor" :style="{ top: mouseY + 'px', left: mouseX + 'px' }"></div>
    <div class="cursor-follower"></div>
  </div>
</template>

<style>
.mouse-stalker-wrapper {
  height: 100%;
  width: 100%;
}

.cursor {
  position: absolute;
  background-color: #fff;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  transition: transform 0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33),
    opacity 0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33);
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: scale(1);
  mix-blend-mode: screen;
}

.cursor-follower {
  position: absolute;
  background-color: #bb86fc;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  transition: transform 0.4s cubic-bezier(0.75, -1.27, 0.3, 2.33),
    opacity 0.2s cubic-bezier(0.75, -0.27, 0.3, 1.33);
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  transform: translate(5px, 5px);
  mix-blend-mode: screen;
}
</style>
