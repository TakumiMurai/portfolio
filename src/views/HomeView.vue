<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import Header from '@/components/Header.vue'
import SideNavigator from '@/components/SideNavigator.vue'
import router from '@/router'
// 表示するページのインデックス
const currentContentIndex: Ref<number> = ref(0)
const char: Ref<Array<string>> = ref([])
const imageSrcArray = [
  {
    pageName: 'aboutMe',
    src: 'https://webseisaku.webtame.jp/dcms_media/image/free_material_site_collection_cover_thum.jpg'
  },
  { pageName: 'mySkills', src: 'https://aipict.com/wp-content/uploads/2022/09/beach01.png' },
  {
    pageName: 'myFavorite',
    src: 'https://www.pakutaso.com/shared/img/thumb/aig-ai221017197-xl.jpg'
  }
]
const LETTER_ANIMATION_INTERVAL_TIME = 20

// ページ名リスト
const contentNameList: Array<String> = ['ABOUT ME', 'MY SKILLS', 'MY FAVORITE']

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
  }, 1000)
}

const show = () => {
  const text = contentNameList[currentContentIndex.value]
  console.log(currentContentIndex.value)

  const letters = text.split('')
  const callback = (letter: string) => {
    char.value.push(letter)
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
}

const hide = () => {
  const text = contentNameList[currentContentIndex.value]
  console.log(currentContentIndex.value)
  const letters = text.split('')

  const callback = () => {
    char.value.pop()
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
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
  }, 1000)
}

const isMouseOver = ref(false)

const onMouseOver = () => {
  isMouseOver.value = true
}

const onMouseLeave = () => {
  isMouseOver.value = false
}

const onclick = (pageName: string) => {
  router.push(pageName)
}

onMounted(() => {
  show()
})
</script>

<template>
  <div class="wrapperHome">
    <Header></Header>
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
      <div
        class="image-wrapper-all"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
        @click="onclick(imageSrcArray[currentContentIndex].pageName)"
      >
        <div class="image-wrapper-left">
          <transition-group name="slide">
            <div
              v-for="(image, index) in imageSrcArray"
              :key="index"
              v-show="index === currentContentIndex"
              class="image-left"
              :class="isMouseOver ? 'image-left-active' : ''"
              :style="{ backgroundImage: 'url(' + image.src + ')' }"
            ></div>
          </transition-group>
        </div>
        <div class="image-wrapper-right">
          <transition-group name="slide-delay">
            <div
              v-for="(image, index) in imageSrcArray"
              :key="index"
              v-show="index === currentContentIndex"
              class="image-right"
              :class="isMouseOver ? 'image-right-active' : ''"
              :style="{ backgroundImage: 'url(' + image.src + ')' }"
            ></div>
          </transition-group>
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
  white-space: pre;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter-from {
  transform: translateY(calc(1.3rem + 4vw));
}
.list-leave-to {
  transform: translateY(calc(-1.3rem - 4vw));
}

.image-wrapper-all {
  position: absolute;
  left: 25%;
  top: 15%;
  width: 50%;
  height: 70%;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}

.image-wrapper-left {
  position: absolute;
  left: 0;
  width: 50.1%;
  height: 100%;
  padding: 0;
  margin: 0;
  min-width: 12.5rem;
  transform-origin: top;
  overflow: hidden;
  will-change: transform;
}
.image-wrapper-right {
  position: absolute;
  left: auto;
  right: 0;
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
  background-image: url(https://skuwana.info/wp-content/uploads/2019/02/sean-o-KMn4VEeEPR8-unsplash.jpg);
  position: absolute;
  left: 0;
  width: 50vw;
  height: 100%;
  background-size: cover;
  background-position: 50%;
  transform: translateY(-50px);
  transition: all 0.4s;
  will-change: transform;
}

.image-right {
  background-image: url(https://skuwana.info/wp-content/uploads/2019/02/sean-o-KMn4VEeEPR8-unsplash.jpg);
  position: absolute;
  bottom: 0;
  left: auto;
  right: 0;
  transform: translateY(50px);
  width: 50vw;
  height: 100%;
  background-size: cover;
  background-position: 50%;
  transition: all 0.4s;
  will-change: transform;
}

.image-left-active {
  background-position: center 50px;
}

.image-right-active {
  background-position: center -50px;
}

.slide-enter-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0) 1s;
}
.slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0);
}
.slide-enter-from {
  transform: translateY(100%);
}
.slide-leave-to {
  transform: translateY(-100%);
}
.slide-delay-enter-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0) 1.1s;
}
.slide-delay-leave-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0) 0.1s;
}
.slide-delay-enter-from {
  transform: translateY(100%);
}
.slide-delay-leave-to {
  transform: translateY(-100%);
}
</style>
