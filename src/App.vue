<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import MouseStalker from './components/MouseStalker.vue'

const showSplashScreen = ref(true)

onMounted(() => {
  setTimeout(() => {
    showSplashScreen.value = false
  }, 6000)
})
</script>

<template>
  <SplashScreen v-if="showSplashScreen" />
  <RouterView v-else></RouterView>
</template>

<style scoped lang="scss">
html,
body,
a {
  // cursor: none;
  background-color: #121212;
}
</style>
