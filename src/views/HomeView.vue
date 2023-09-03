<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import SideNavigator from '@/components/SideNavigator.vue'
import router from '@/router'
import aboutMePicture from '@/assets/about-me.jpg'
import mySkillsPicture from '@/assets/my-skills.jpg'
import myFavoritePicture from '@/assets/my-favorite.jpg'
// 表示するページのインデックス
const currentContentIndex: Ref<number> = ref(0)
const char: Ref<Array<string>> = ref([])
const imageSrcArray = [
  {
    pageName: 'aboutMe',
    src: aboutMePicture
  },
  { pageName: 'mySkills', src: mySkillsPicture },
  {
    pageName: 'myFavorite',
    src: myFavoritePicture
  }
]
const LETTER_ANIMATION_INTERVAL_TIME = 20
// ページ名リスト
const contentNameList: Array<String> = ['ABOUT ME', 'MY SKILLS', 'MY FAVORITE']
const canClick: Ref<boolean> = ref(true)
const canScroll: Ref<boolean> = ref(true)
const isActiveOverlay: Ref<boolean> = ref(true)

// マウスホイール動作時のイベント
const handleWheel = (event: WheelEvent) => {
  if (canScroll.value) {
    canScroll.value = false
    const totalContent: number = contentNameList.length
    hide()
    if (event.deltaY > 0) {
      currentContentIndex.value = (currentContentIndex.value + 1) % totalContent
    } else {
      currentContentIndex.value = (currentContentIndex.value - 1 + totalContent) % totalContent
    }
    setTimeout(() => {
      show()
      setTimeout(() => {
        canScroll.value = true
      }, 1000)
    }, 1000)
  }
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
  if (canClick.value) {
    canClick.value = false
    hide()
    currentContentIndex.value = index
    setTimeout(() => {
      show()
      setTimeout(() => {
        canClick.value = true
      }, 1000)
    }, 1000)
  }
}

const isMouseOver = ref(false)

const onMouseOver = () => {
  isMouseOver.value = true
}

const onMouseLeave = () => {
  isMouseOver.value = false
}

const onclick = (pageName: string) => {
  isActiveOverlay.value = true
  setTimeout(() => {
    router.push(pageName)
  }, 1000)
}

onMounted(() => {
  isActiveOverlay.value = false
  show()
})
</script>

<template>
  <div class="wrapperHome">
    <transition name="overlay-green">
      <div class="overlay-green" v-if="isActiveOverlay"></div>
    </transition>
    <transition name="overlay-black">
      <div class="overlay-black" v-if="isActiveOverlay"></div>
    </transition>
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
  overflow: hidden;
}
.overlay-green {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #47ba87;
  z-index: 2;
}
.overlay-green-enter-active {
  transition: all 0.5s ease;
}
.overlay-green-leave-active {
  transition: all 0.5s ease 0.1s;
}
.overlay-green-enter-from,
.overlay-green-leave-to {
  transform: translateY(100%);
}
.overlay-black {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #121212;
  z-index: 2;
}
.overlay-black-enter-active {
  transition: all 0.5s ease 0.1s;
}
.overlay-black-leave-active {
  transition: all 0.5s ease;
}
.overlay-black-enter-from,
.overlay-black-leave-to {
  transform: translateY(100%);
}
.pageContent {
  position: relative;
  height: 100vh;
  width: 100vw;
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
@media screen and (max-width: 768px) {
  .image-wrapper-all {
    position: absolute;
    top: 15%;
    width: calc(100% - 3rem);
    height: 50%;
    left: 1.5rem;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
  }
  .image-left {
    position: absolute;
    left: 0;
    width: calc(100vw - 3rem);
    height: 100%;
    background-size: cover;
    transition: all 0.4s;
    will-change: transform;
    background-position: 50%;
  }
  .image-right {
    position: absolute;
    bottom: 0;
    left: auto;
    right: 0;
    width: calc(100vw - 3rem);
    height: 100%;
    background-size: cover;
    transition: all 0.4s;
    will-change: transform;
    background-position: 50%;
  }
  .transition-container {
    position: absolute;
    bottom: auto;
    left: 50%;
    top: 70%;
    display: flex;
    overflow: hidden;
    transform: translateX(-50%);
  }
}
@media screen and (min-width: 769px) {
  .image-wrapper-all {
    position: absolute;
    width: 70%;
    left: 15%;
    top: 20%;
    height: 60%;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
  }
  .image-left {
    position: absolute;
    left: 0;
    width: 70vw;
    height: 100%;
    background-size: cover;
    transform: translateY(-50px);
    transition: all 0.4s;
    will-change: transform;
    background-position: center 50px;
  }
  .image-right {
    position: absolute;
    bottom: 0;
    left: auto;
    right: 0;
    transform: translateY(50px);
    width: 70vw;
    height: 100%;
    background-size: cover;
    transition: all 0.4s;
    will-change: transform;
    background-position: center -50px;
  }
  .transition-container {
    position: absolute;
    bottom: calc(2rem + 4vw);
    left: 3rem;
    display: flex;
    overflow: hidden;
    z-index: 1;
  }
}
@media screen and (min-width: 1025px) {
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
  .image-left {
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
  .transition-container {
    position: absolute;
    bottom: calc(2rem + 4vw);
    left: 3rem;
    display: flex;
    overflow: hidden;
    z-index: 1;
  }
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
