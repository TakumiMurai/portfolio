<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import SideNavigator from '@/components/SideNavigator.vue'
// 表示するページのインデックス
const currentContentIndex: Ref<number> = ref(0)
const char: Ref<Array<string>> = ref([])
const imageSrcArray = [
  'https://webseisaku.webtame.jp/dcms_media/image/free_material_site_collection_cover_thum.jpg',
  'https://aipict.com/wp-content/uploads/2022/09/beach01.png',
  'https://www.pakutaso.com/shared/img/thumb/aig-ai221017197-xl.jpg'
]
const scale = ref(1)
const grayScale = ref(100)
const targetElement = ref<HTMLImageElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const isDisabled = ref(false)

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

const resetImage = () => {
  scale.value = 1
  grayScale.value = 100
  rotateX.value = 0
  rotateY.value = 0
}

const changeMousePosition = (event: MouseEvent) => {
  scale.value = 1.04
  grayScale.value = 0
  const rect = getRectPosition()
  if (rect) {
    const rectCenterX = rect.x + rect.width / 2
    const rectCenterY = rect.y + rect.height / 2
    const tmpX = event.clientX - rectCenterX // 中心座標からの位置
    const tmpY = event.clientY - rectCenterY // 中心座標からの位置
    rotateX.value = (tmpX / rect.width) * -10
    rotateY.value = (tmpY / rect.height) * 10
  }
}

const getRectPosition = () => {
  const element: HTMLImageElement | null = targetElement.value
  return element?.getBoundingClientRect()
}

const rotateStyle = computed(() => {
  return {
    transform: `rotateX(${rotateY.value}deg) rotateY(${rotateX.value}deg) scale3d(${scale.value},${scale.value},${scale.value})`,
    filter: `grayscale(${grayScale.value}%)`
  }
})

const handleClick = (index: number): void => {
  hide()
  currentContentIndex.value = index
  setTimeout(() => {
    show()
  }, 1500)
}

const currentImage = computed(() => {
  return imageSrcArray[currentContentIndex.value]
})

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
      <div class="image-container">
        <transition name="fade">
          <img
            ref="targetElement"
            class="image"
            :key="currentImage"
            :src="currentImage"
            :style="rotateStyle"
            @mouseleave="resetImage"
            @mousemove="changeMousePosition"
          />
        </transition>
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

.image-container {
  height: 70%;
  width: 50%;
  left: 25%;
  top: 15%;
  position: absolute;
  perspective: 1400px;
}

.image {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 12.5rem;
  transform-origin: top;
  object-fit: cover;
  will-change: transform;
  transform-style: preserve-3d;
  transition: filter 0.5s;
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
