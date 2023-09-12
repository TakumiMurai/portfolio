<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue/dist/vue.js'

const isActiveOverlay: Ref<boolean> = ref(true)

const showOverlay = (): void => {
  console.log('show')
  isActiveOverlay.value = true
}
const hideOverlay = (): void => {
  console.log('hide')
  isActiveOverlay.value = false
}

defineExpose({ showOverlay, hideOverlay })
</script>

<template>
  <transition name="overlay-green">
    <div class="overlay-green" v-if="isActiveOverlay"></div>
  </transition>
  <transition name="overlay-black">
    <div class="overlay-black" v-if="isActiveOverlay"></div>
  </transition>
</template>

<style scoped lang="scss">
.overlay-green {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #47ba87;
  z-index: 2;
}
.overlay-green-enter-active {
  transition: height 0.5s ease;
}
.overlay-green-leave-active {
  transition: height 0.5s ease 0.1s;
}
.overlay-green-enter-from,
.overlay-green-leave-to {
  height: 0;
}
.overlay-black {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #121212;
  z-index: 2;
}
.overlay-black-enter-active {
  transition: height 0.5s ease 0.1s;
}
.overlay-black-leave-active {
  transition: height 0.5s ease;
}
.overlay-black-enter-from,
.overlay-black-leave-to {
  height: 0;
}
</style>
