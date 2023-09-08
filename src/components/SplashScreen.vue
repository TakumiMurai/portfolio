<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'

const firstText: Ref<string> = ref('TAKUMI MURAI') // 表示するテキスト
const secondText: Ref<string> = ref('FRONTEND ENGINEER') // 二行目のテキスト
const transitionLetters: Ref<Array<string>> = ref([])
const LETTER_ANIMATION_INTERVAL_TIME: number = 20

const show = (text: string): void => {
  const letters = text.split('')

  const callback = (letter: string) => {
    transitionLetters.value.push(letter)
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
}

const hide = (text: string): void => {
  const letters = text.split('')

  const callback = () => {
    transitionLetters.value.pop()
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
}

const intervalForEach = (callback: Function, array: Array<string>, intervalTime: number): void => {
  const length = array.length
  let index = 0

  const intervalId = window.setInterval(() => {
    if (index > length - 1) {
      clearInterval(intervalId)
    } else {
      callback(array[index])
      index += 1
    }
  }, intervalTime)
}

onMounted(() => {
  show(firstText.value)
  setTimeout(() => {
    hide(firstText.value)
  }, 1000)
  setTimeout(() => {
    show(secondText.value)
  }, 2250)
  setTimeout(() => {
    hide(secondText.value)
  }, 3250)
})
</script>

<template>
  <div class="splash-screen__wrapper">
    <transition-group name="list">
      <div
        v-for="transitionLetter in transitionLetters"
        :key="transitionLetter"
        class="splash-screen__letters"
      >
        {{ transitionLetter }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.splash-screen {
  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    overflow: hidden;
  }
  &__letters {
    font-weight: 900;
    font-size: calc(1.3rem + 4vw);
    height: calc(1.3rem + 4vw);
    line-height: 0.7;
    color: #fff;
    margin: 0;
    white-space: pre;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter-from {
  transform: translateY(calc(1.3rem + 4vw));
}
.list-leave-to {
  transform: translateY(calc(-1.3rem - 4vw));
}
</style>
