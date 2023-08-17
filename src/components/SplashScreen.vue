<script setup lang="ts">
import { ref, onMounted } from 'vue'

const text = ref('TAKUMI MURAI') // 表示するテキスト
const text2 = ref('FRONTEND ENGINEER') // 二行目のテキスト
const currentText = ref('') // 現在の表示テキスト（1行目）
const currentText2 = ref('') // 現在の表示テキスト（2行目）
const showCursor = ref(true) // カーソル表示制御
const showCursor2 = ref(false) // カーソル表示制御

onMounted(() => {
  typeText(0)
})

function typeText(index: number) {
  if (index < text.value.length) {
    currentText.value = text.value.slice(0, index + 1)
    setTimeout(() => {
      typeText(index + 1)
    }, 100)
  } else if (index === text.value.length) {
    setTimeout(() => {}, 300)
    showCursor.value = false
    showCursor2.value = true
    typeText2(0)
  }
}

function typeText2(index: number) {
  if (index < text2.value.length) {
    currentText2.value = text2.value.slice(0, index + 1)
    setTimeout(() => {
      typeText2(index + 1)
    }, 100)
  } else {
    setTimeout(() => {}, 300)
    showCursor2.value = false
  }
}
</script>

<template>
  <div class="splash-screen">
    <div class="typing-text">
      <span class="typed-text">{{ currentText }}</span>
      <span class="cursor" v-show="showCursor">|</span><br />
      <span class="typed-text">{{ currentText2 }}</span>
      <span class="cursor" v-show="showCursor2">|</span>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  overflow: hidden;
}

.typing-text {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  font-weight: 900;
  font-size: calc(1.3rem + 4vw);
  text-transform: uppercase;
  line-height: 0.8;
  color: #fff;
}

.typed-text {
  opacity: 1;
  font-weight: 900;
  font-size: calc(1.3rem + 4vw);
  text-transform: uppercase;
  line-height: 0.8;
  color: #fff;
  animation: typingAnimation 5s steps(30, end);
}

.cursor {
  display: inline-block;
  opacity: 1;
  animation: cursorAnimation 0.8s infinite;
}

@keyframes typingAnimation {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes cursorAnimation {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
