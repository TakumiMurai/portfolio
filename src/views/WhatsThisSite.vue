<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>
<template>
  <Header></Header>
  <div class="about">
    <h1>This is an what's this site page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
