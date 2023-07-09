<script setup lang="ts">
const items = ['About', 'Skills', 'Contact']
</script>

<template>
  <div class="wrapper">
    <div>Home</div>
    <div v-for="item in items">
      {{ item }}
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
}
</style>
