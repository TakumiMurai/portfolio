<script setup lang="ts">
import Header from './components/Header.vue'
import MouseStalker from './components/MouseStalker.vue'
import { RouterLink, RouterView } from 'vue-router'

const callChildMethod = () => {}
</script>

<template>
  <div id="app" @mousemove="callChildMethod()">
    <MouseStalker></MouseStalker>
    <Header></Header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/aboutMe">AboutMe</RouterLink>
        <RouterLink to="/mySkills">MySkills</RouterLink>
        <RouterLink to="/whatsThisSite">WhatsThisSite</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </div>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
html,
body,
a {
  cursor: none;
}
</style>
