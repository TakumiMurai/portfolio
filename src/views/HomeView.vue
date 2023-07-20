<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
const currentContentIndex: Ref<number> = ref(0)
const contentNameList: Array<String> = ['ABOUT ME', 'MY SKILLS', 'ABOUT THIS SITE']

const handleWheel = (event: WheelEvent) => {
  console.log('wheel')
  const totalContent: number = contentNameList.length
  if (event.deltaY > 0) {
    console.log('wheel down')
    currentContentIndex.value = (currentContentIndex.value + 1) % totalContent
  } else {
    console.log('wheel up')
    currentContentIndex.value = (currentContentIndex.value - 1 + totalContent) % totalContent
  }
}
</script>

<template>
  <div @wheel="handleWheel">
    <div
      class="wrapper"
      v-for="(contentName, index) in contentNameList"
      v-show="currentContentIndex === index"
    >
      {{ contentName }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  width: 100%;
}
</style>
