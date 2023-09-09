<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import SideNavigator from '@/components/SideNavigator.vue'
import router from '@/router'
import aboutMePicture from '@/assets/about-me.jpg'
import mySkillsPicture from '@/assets/my-skills.jpg'
import myFavoritePicture from '@/assets/my-favorite.jpg'

const LETTER_ANIMATION_INTERVAL_TIME: number = 20

// 表示するページのインデックス
const currentContentIndex: Ref<number> = ref(0)
const char: Ref<Array<string>> = ref([])
const pageContents: Ref<Array<{ title: string; pageName: string; src: string }>> = ref([
  {
    title: 'ABOUT ME',
    pageName: 'aboutMe',
    src: aboutMePicture
  },
  { title: 'MY SKILLS', pageName: 'mySkills', src: mySkillsPicture },
  {
    title: 'MY FAVORITE',
    pageName: 'myFavorite',
    src: myFavoritePicture
  }
])
const isMouseOver: Ref<boolean> = ref(false)
const canClick: Ref<boolean> = ref(true)
const canScroll: Ref<boolean> = ref(true)
const isActiveOverlay: Ref<boolean> = ref(true)

// マウスホイール動作時のイベント
const handleWheel = (event: WheelEvent): void => {
  if (canScroll.value) {
    canScroll.value = false
    const totalContent: number = pageContents.value.length
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

const show = (): void => {
  const text = pageContents.value[currentContentIndex.value].title

  const letters = text.split('')
  const callback = (letter: string) => {
    char.value.push(letter)
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
}

const hide = (): void => {
  const text = pageContents.value[currentContentIndex.value].title
  const letters = text.split('')

  const callback = () => {
    char.value.pop()
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
}

const intervalForEach = (callback: Function, array: Array<string>, intervalTime: number): void => {
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

const onMouseOver = (): void => {
  isMouseOver.value = true
}

const onMouseLeave = (): void => {
  isMouseOver.value = false
}

const onclick = (pageName: string): void => {
  isActiveOverlay.value = true
  setTimeout(() => {
    router.push(pageName)
  }, 1000)
}

const setFillHeight = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

// 画面のサイズ変動があった時に高さを再計算する
window.addEventListener('resize', setFillHeight)

// 初期化
setFillHeight()

onMounted(() => {
  isActiveOverlay.value = false
  show()
})
</script>

<template>
  <div class="home__wrapper">
    <transition name="overlay-green">
      <div class="overlay-green" v-if="isActiveOverlay"></div>
    </transition>
    <transition name="overlay-black">
      <div class="overlay-black" v-if="isActiveOverlay"></div>
    </transition>
    <div @wheel="handleWheel">
      <SideNavigator
        :pageContents="pageContents"
        :currentContentIndex="currentContentIndex"
        @onClickNavigator="handleClick"
      ></SideNavigator>
      <div
        class="content__wrapper"
        v-for="(pageContent, index) in pageContents"
        v-show="currentContentIndex === index"
        :key="pageContent.title"
      >
        <div class="slide-letters__wrapper">
          <transition-group name="list">
            <div v-for="letter in char" :key="letter" class="slide-letters__inner">
              {{ letter }}
            </div>
          </transition-group>
        </div>
      </div>
      <div
        class="image__wrapper-all"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
        @click="onclick(pageContents[currentContentIndex].pageName)"
      >
        <div class="image__wrapper-left">
          <transition-group name="slide">
            <div
              v-for="(pageContent, index) in pageContents"
              :key="pageContent.src"
              v-show="index === currentContentIndex"
              class="image__inner-left"
              :class="isMouseOver ? 'image__inner-left--active' : ''"
              :style="{ backgroundImage: 'url(' + pageContent.src + ')' }"
            ></div>
          </transition-group>
        </div>
        <div class="image__wrapper-right">
          <transition-group name="slide-delay">
            <div
              v-for="(pageContent, index) in pageContents"
              :key="pageContent.title"
              v-show="index === currentContentIndex"
              class="image__inner-right"
              :class="isMouseOver ? 'image__inner-right--active' : ''"
              :style="{ backgroundImage: 'url(' + pageContent.src + ')' }"
            ></div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home__wrapper {
  min-height: 100vh; /* Fallback */
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  overflow: hidden;
}
.content__wrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
}
.slide-letters {
  &__wrapper {
    position: absolute;
    display: flex;
    overflow: hidden;
    z-index: 1;
  }
  &__inner {
    font-weight: 900;
    font-size: calc(1.3rem + 4vw);
    height: calc(1.3rem + 4vw);
    line-height: 0.7;
    color: #fff;
    margin: 0;
    white-space: pre;
  }
}
.image {
  &__wrapper {
    &-all {
      position: absolute;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      will-change: transform;
    }
    &-left {
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
    &-right {
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
  }
  &__inner {
    &-left {
      position: absolute;
      left: 0;
      background-size: cover;
      transition: all 0.4s;
      will-change: transform;
    }
    &-right {
      position: absolute;
      bottom: 0;
      left: auto;
      right: 0;
      background-size: cover;
      transition: all 0.4s;
      will-change: transform;
    }
  }
}
@media screen and (max-width: 768.98px) {
  .slide-letters__wrapper {
    bottom: auto;
    left: 50%;
    top: 70%;
    transform: translateX(-50%);
  }
  .image {
    &__wrapper {
      &-all {
        top: 15%;
        width: calc(100% - 3rem);
        height: 50%;
        left: 1.5rem;
      }
    }
    &__inner {
      &-left {
        width: calc(100vw - 3rem);
        height: 100%;
        background-position: 50%;
      }
      &-right {
        width: calc(100vw - 3rem);
        height: 100%;
        background-position: 50%;
      }
    }
  }
}
@media screen and (min-width: 769px) {
  .slide-letters__wrapper {
    bottom: calc(2rem + 4vw);
    left: 3rem;
  }
  .image {
    &__wrapper {
      &-all {
        position: absolute;
        width: 70%;
        left: 15%;
        top: 20%;
        height: 60%;
      }
    }
    &__inner {
      &-left {
        transform: translateY(-50px);
        width: 70vw;
        height: 100%;
        background-position: center 50px;
      }
      &-right {
        transform: translateY(50px);
        width: 70vw;
        height: 100%;
        background-position: center -50px;
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .slide-letters__wrapper {
    bottom: calc(2rem + 4vw);
    left: 3rem;
  }
  .image {
    &__wrapper {
      &-all {
        left: 25%;
        top: 15%;
        width: 50%;
        height: 70%;
      }
    }
    &__inner {
      &-left {
        width: 50vw;
        height: 100%;
        background-position: 50%;
        transform: translateY(-50px);
        background-position: 50%;
        &--active {
          background-position: center 50px;
        }
      }
      &-right {
        width: 50vw;
        height: 100%;
        transform: translateY(50px);
        background-position: 50%;
        &--active {
          background-position: center -50px;
        }
      }
    }
  }
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
  height: 0;
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
  height: 0;
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
