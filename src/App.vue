<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'

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
  background-color: #121212;
}

.expand-enter-active,
.expand-leave-active {
  transition: transform 0.5s ease-in-out, background-color 0.5s ease-in-out;
}
.expand-enter, .expand-leave-to /* .expand-leave-active in <2.1.8 */ {
  transform: translateY(100%);
  background-color: #121212;
}
</style>
