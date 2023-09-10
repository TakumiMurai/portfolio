<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'

const showSplashScreen = ref(true)

onMounted(() => {
  setTimeout(() => {
    showSplashScreen.value = false
  }, 4500)
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
  overflow: hidden;
  background-color: #121212;
}

ul {
  list-style-type: none;
}
</style>
