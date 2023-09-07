<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const targetElement = ref<HTMLDivElement>()

const onScroll = () => {
  const element = targetElement.value
  if (element && window.innerHeight - 50 >= element.getBoundingClientRect().y) {
    visible.value = true
  }
}

onMounted(() => {
  // スクロールイベントリスナーを追加
  window.addEventListener('scroll', onScroll)
  onScroll()
})

onUnmounted(() => {
  // スクロールイベントリスナーを削除
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div :class="{ fadeIn: visible, hidden: !visible }" ref="targetElement">
    <slot></slot>
  </div>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}
.fadeIn {
  animation: fadeIn 2s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(200px);
    transition-delay: 0.5s;
    transition-duration: 0.7s;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 0.5s;
    transition-duration: 0.7s;
  }
}
</style>
