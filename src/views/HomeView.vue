<script setup lang="ts">
import { ref } from 'vue'
const pageNumber = ref(0)
const pageLinkList = ['ABOUT ME', 'MY SKILLS', 'WHATS THIS SITE']
</script>

<template>
  <div v-for="pageLink in pageLinkList">{{ pageLink }}</div>
</template>

<style scoped lang="scss"></style>
