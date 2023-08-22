<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import SideNavigator from '@/components/SideNavigator.vue'
// 表示するページのインデックス
const currentContentIndex: Ref<number> = ref(0)
const char: Ref<Array<string>> = ref([])
const isMouseOver: Ref<boolean> = ref(false)
const imageSrcArray = [
  'https://webseisaku.webtame.jp/dcms_media/image/free_material_site_collection_cover_thum.jpg',
  'https://aipict.com/wp-content/uploads/2022/09/beach01.png',
  'https://www.pakutaso.com/shared/img/thumb/aig-ai221017197-xl.jpg'
]
const targetElement = ref<HTMLImageElement | null>(null)

// ページ名リスト
const contentNameList: Array<String> = ['ABOUT ME', 'MY SKILLS', 'ABOUT THIS SITE']

// マウスホイール動作時のイベント
const handleWheel = (event: WheelEvent) => {
  const totalContent: number = contentNameList.length
  hide()
  if (event.deltaY > 0) {
    currentContentIndex.value = (currentContentIndex.value + 1) % totalContent
  } else {
    currentContentIndex.value = (currentContentIndex.value - 1 + totalContent) % totalContent
  }
  setTimeout(() => {
    show()
  }, 1500)
}

const show = () => {
  const text = contentNameList[currentContentIndex.value]
  console.log(currentContentIndex.value)

  const letters = text.split('')
  const callback = (letter: string) => {
    char.value.push(letter)
  }

  intervalForEach(callback, letters, 60)
}

const hide = () => {
  const text = contentNameList[currentContentIndex.value]
  console.log(currentContentIndex.value)
  const letters = text.split('')

  const callback = () => {
    char.value.pop()
  }

  intervalForEach(callback, letters, 60)
}

const intervalForEach = (callback: Function, array: Array<string>, intervalTime: number) => {
  const length = array.length

  let index = 0

  const intervalId = window.setInterval(() => {
    if (index > length - 1) {
      clearInterval(intervalId)
    } else {
      callback(array[index])
      index += 1
    }
  }, intervalTime)
}

const handleClick = (index: number): void => {
  hide()
  currentContentIndex.value = index
  setTimeout(() => {
    show()
  }, 1500)
}

const onMouseOver = () => {
  isMouseOver.value = true
}

const onMouseLeave = () => {
  isMouseOver.value = false
}

onMounted(() => {
  show()
})
</script>

<template>
  <div class="wrapperHome">
    <div @wheel="handleWheel">
      <SideNavigator
        :contentNameList="contentNameList"
        :currentContentIndex="currentContentIndex"
        @onClickNavigator="handleClick"
      ></SideNavigator>
      <div
        class="pageContent"
        v-for="(_, index) in contentNameList"
        v-show="currentContentIndex === index"
      >
        <div class="transition-container">
          <transition-group name="list">
            <div v-for="letter in char" :key="letter" class="transition-letters">
              {{ letter }}
            </div>
          </transition-group>
        </div>
      </div>
      <div class="image-container-all" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
        <div class="image-container-left">
          <div
            ref="targetElement"
            class="image-left"
            :class="isMouseOver ? 'image-left-active' : ''"
          ></div>
        </div>
        <div class="image-container-right">
          <div
            ref="targetElement"
            class="image-right"
            :class="isMouseOver ? 'image-right-active' : ''"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapperHome {
  height: 100vh;
  width: 100vw;
}

.pageContent {
  position: relative;
  height: 100vh;
  width: 100vw;
}

.transition-container {
  position: absolute;
  bottom: calc(2rem + 4vw);
  left: 3rem;
  display: flex;
  overflow: hidden;
  z-index: 500;
}

.transition-letters {
  font-weight: 900;
  font-size: calc(1.3rem + 4vw);
  height: calc(1.3rem + 4vw);
  line-height: 0.7;
  color: #fff;
  margin: 0;
  margin: 0;
  white-space: pre;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  transform: translateY(80px);
}

.image-container-all {
  position: absolute;
  left: 25%;
  top: 15%;
  width: 50%;
  height: 70%;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}

.image-container-left {
  position: absolute;
  left: 0;
  top: -25px;
  width: 50.1%;
  height: 100%;
  padding: 0;
  margin: 0;
  min-width: 12.5rem;
  transform-origin: top;
  overflow: hidden;
  will-change: transform;
}
.image-container-right {
  position: absolute;
  left: 50%;
  top: 25px;
  width: 50.1%;
  height: 100%;
  padding: 0;
  margin: 0;
  min-width: 12.5rem;
  transform-origin: top;
  overflow: hidden;
  will-change: transform;
}

.image-left {
  background-image: url(https://webseisaku.webtame.jp/dcms_media/image/free_material_site_collection_cover_thum.jpg);
  position: absolute;
  left: 0;
  top: 0;
  width: 50vw;
  height: 100%;
  background-size: cover;
  background-position: 50%;
  transform: translateY(-25px);
  transition: all 0.4s;
  will-change: transform;
}
.image-right {
  background-image: url(https://webseisaku.webtame.jp/dcms_media/image/free_material_site_collection_cover_thum.jpg);
  position: absolute;
  left: -25vw;
  top: 0;
  width: 50vw;
  height: 100%;
  background-size: cover;
  background-position: 50%;
  transform: translateY(-25px);
  transition: all 0.4s;
  will-change: transform;
}

.image-left-active {
  background-position: center 25px;
}

.image-right-active {
  background-position: center -25px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(80px);
}
</style>
