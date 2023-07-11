<script setup lang="ts">
import Header from './components/Header.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<style scoped lang="scss">
html,
body,
a {
  // cursor: none;
  background-color: black;
}
</style>
