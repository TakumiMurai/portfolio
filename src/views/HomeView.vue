<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import SideNavigator from '@/components/SideNavigator.vue'
// 表示するページのインデックス
const currentContentIndex: Ref<number> = ref(0)

// ページ名リスト
const contentNameList: Array<String> = ['ABOUT ME', 'MY SKILLS', 'ABOUT THIS SITE']

// マウスホイール動作時のイベント
const handleWheel = (event: WheelEvent) => {
  const totalContent: number = contentNameList.length
  if (event.deltaY > 0) {
    currentContentIndex.value = (currentContentIndex.value + 1) % totalContent
  } else {
    currentContentIndex.value = (currentContentIndex.value - 1 + totalContent) % totalContent
  }
}

const handleClick = (index: number): void => {
  currentContentIndex.value = index
}
</script>

<template>
  <div class="wrapperHome">
    <SideNavigator
      :contentNameList="contentNameList"
      :currentContentIndex="currentContentIndex"
      @onClickNavigator="handleClick"
    ></SideNavigator>
    <div @wheel="handleWheel">
      <div
        class="pageContent"
        v-for="(contentName, index) in contentNameList"
        v-show="currentContentIndex === index"
      >
        <div class="contentText" :class="{ 'contentText-active': currentContentIndex === index }">
          {{ contentName }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapperHome {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.pageContent {
  height: 100vh;
  width: 100vw;
}

.contentText {
  font-weight: 900;
  font-size: calc(1.3rem + 4vw);
  text-transform: uppercase;
  line-height: 0.8;
  color: #fff;
  margin: 0;
}
</style>
