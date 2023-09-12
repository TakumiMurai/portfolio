<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import SideNavigator from '@/components/SideNavigator.vue'
import TransitionScreen from '@/components/TransitionScreen.vue'
import router from '@/router'
import aboutMePicture from '@/assets/about-me.jpg'
import mySkillsPicture from '@/assets/my-skills.jpg'
import myFavoritePicture from '@/assets/my-favorite.jpg'

const LETTER_ANIMATION_INTERVAL_TIME = 20
const IMAGE_TRANS_VECTOR_UP = 'up'
const IMAGE_TRANS_VECTOR_DOWN = 'down'

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
const canScroll: Ref<boolean> = ref(true)
const touchStartX: Ref<number | null> = ref(null)
const touchStartY: Ref<number | null> = ref(null)
const transVector: Ref<'up' | 'down'> = ref('up')
const transitionScreen = ref<InstanceType<typeof TransitionScreen> | null>(null)

// マウスホイール動作時のイベント
const handleWheel = (event: WheelEvent): void => {
  if (!canScroll.value) {
    return
  }
  canScroll.value = false
  const totalContent: number = pageContents.value.length
  hide()
  if (event.deltaY > 0) {
    transVector.value = IMAGE_TRANS_VECTOR_UP
    currentContentIndex.value = (currentContentIndex.value + 1) % totalContent
  } else {
    transVector.value = IMAGE_TRANS_VECTOR_DOWN
    currentContentIndex.value = (currentContentIndex.value - 1 + totalContent) % totalContent
  }
  setTimeout(() => {
    show()
    setTimeout(() => {
      canScroll.value = true
    }, 1000)
  }, 1000)
}

// 画面タップ時のイベント（SP）
const onTouchStart = (event: TouchEvent): void => {
  touchStartX.value = event.touches[0].clientX
  touchStartY.value = event.touches[0].clientY
}

// 画面スワイプ時のイベント
const onTouchMove = (event: TouchEvent) => {
  if (touchStartX.value === null || touchStartY.value === null) {
    return
  }

  if (!canScroll.value) {
    return
  }

  // タッチ開始位置の取得
  const currentX = event.touches[0].clientX
  const currentY = event.touches[0].clientY

  // スワイプ後の位置の取得
  const deltaX = currentX - touchStartX.value
  const deltaY = currentY - touchStartY.value

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // 右にスワイプ
      return
    } else {
      // 左にスワイプ
      return
    }
  } else {
    canScroll.value = false
    const totalContent: number = pageContents.value.length
    hide()
    if (deltaY > 0) {
      // 下にスワイプ
      transVector.value = IMAGE_TRANS_VECTOR_DOWN
      currentContentIndex.value = (currentContentIndex.value - 1 + totalContent) % totalContent
    } else {
      // 上にスワイプ
      transVector.value = IMAGE_TRANS_VECTOR_UP
      currentContentIndex.value = (currentContentIndex.value + 1) % totalContent
    }
    setTimeout(() => {
      show()
      setTimeout(() => {
        canScroll.value = true
      }, 1000)
    }, 1000)
  }

  // タッチ開始位置をリセット
  touchStartX.value = null
  touchStartY.value = null
}

// タッチ終了時のイベント
const onTouchEnd = (): void => {
  // タッチ開始位置をリセット
  touchStartX.value = null
  touchStartY.value = null
}

// ページ名の表示
const show = (): void => {
  const text = pageContents.value[currentContentIndex.value].title

  const letters = text.split('')
  const callback = (letter: string) => {
    char.value.push(letter)
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
}

// ページ名の非表示
const hide = (): void => {
  const text = pageContents.value[currentContentIndex.value].title
  const letters = text.split('')

  const callback = () => {
    char.value.pop()
  }

  intervalForEach(callback, letters, LETTER_ANIMATION_INTERVAL_TIME)
}

// 配列の要素全てに一定間隔でコールバック実行
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

// サイドナビゲータークリック時のイベント
const handleClick = (index: number): void => {
  if (!canScroll.value) {
    return
  }
  canScroll.value = false
  hide()
  if (currentContentIndex.value < index) {
    transVector.value = IMAGE_TRANS_VECTOR_UP
    currentContentIndex.value = index
  } else {
    transVector.value = IMAGE_TRANS_VECTOR_DOWN
    currentContentIndex.value = index
  }
  setTimeout(() => {
    show()
    setTimeout(() => {
      canScroll.value = true
    }, 1000)
  }, 1000)
}

// マウスホバー時
const onMouseOver = (): void => {
  isMouseOver.value = true
}

// マウスホバー解除時
const onMouseLeave = (): void => {
  isMouseOver.value = false
}

// 画像クリック時イベント
const onClickImage = (pageName: string): void => {
  // 遷移アニメーションを表示
  transitionScreen.value?.showOverlay()
  setTimeout(() => {
    router.push(pageName)
  }, 1000)
}

onMounted(() => {
  // 遷移アニメーションを非表示
  transitionScreen.value?.hideOverlay()

  // ページ名を表示
  show()
})
</script>

<template>
  <div class="home__wrapper">
    <TransitionScreen ref="transitionScreen"></TransitionScreen>
    <div
      @wheel="handleWheel"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
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
          <transition-group :name="`list-${transVector}`">
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
        @click="onClickImage(pageContents[currentContentIndex].pageName)"
      >
        <div class="image__wrapper-left">
          <transition-group :name="`slide-${transVector}`">
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
          <transition-group :name="`slide-${transVector}-delay`">
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
  height: 100vh; // フォールバック
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  touch-action: none;
}
.content__wrapper {
  position: relative;
  height: 100vh; // フォールバック
  height: 100dvh;
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
    line-height: 0.8;
    color: #fff;
    margin: 0;
    white-space: pre;
  }
}
.image {
  &__wrapper {
    &-all {
      cursor: pointer;
      position: absolute;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      will-change: transform;
    }
    &-left {
      position: absolute;
      left: 0;
      width: 50%;
      height: 100%;
      padding: 0;
      margin: 0;
      transform-origin: top;
      overflow: hidden;
      will-change: transform;
    }
    &-right {
      position: absolute;
      left: auto;
      right: 0;
      width: 50%;
      height: 100%;
      padding: 0;
      margin: 0;
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
      transition: transform 0.4s;
      will-change: transform;
    }
    &-right {
      position: absolute;
      bottom: 0;
      left: auto;
      right: 0;
      background-size: cover;
      transition: transform 0.4s;
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
        transition: background-position 0.3s ease;
        &--active {
          background-position: center 50px;
        }
      }
      &-right {
        width: 50vw;
        height: 100%;
        transform: translateY(50px);
        background-position: 50%;
        transition: background-position 0.3s ease;
        &--active {
          background-position: center -50px;
        }
      }
    }
  }
}
// ページ名のトランジション
.list-up-enter-active,
.list-up-leave-active,
.list-down-enter-active,
.list-down-leave-active {
  transition: transform 0.5s 0.3s;
}
.list-up-enter-from {
  transform: translateY(calc(1.3rem + 4vw));
}
.list-up-leave-to {
  transform: translateY(calc(-1.3rem - 4vw));
}
.list-down-enter-from {
  transform: translateY(calc(-1.3rem - 4vw));
}
.list-down-leave-to {
  transform: translateY(calc(1.3rem + 4vw));
}
// 画像スライドのトランジション
.slide-up-enter-active,
.slide-down-enter-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0) 1s;
}
.slide-up-leave-active,
.slide-down-leave-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0);
}
.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-leave-to {
  transform: translateY(-100%);
}
.slide-down-enter-from {
  transform: translateY(-100%);
}
.slide-down-leave-to {
  transform: translateY(100%);
}
.slide-up-delay-enter-active,
.slide-down-delay-enter-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0) 1.1s;
}
.slide-up-delay-leave-active,
.slide-down-delay-leave-active {
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0) 0.1s;
}
.slide-up-delay-enter-from {
  transform: translateY(100%);
}
.slide-up-delay-leave-to {
  transform: translateY(-100%);
}
.slide-down-delay-enter-from {
  transform: translateY(-100%);
}
.slide-down-delay-leave-to {
  transform: translateY(100%);
}
</style>
