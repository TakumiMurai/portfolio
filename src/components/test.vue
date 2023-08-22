<script setup>
import { ref, computed } from 'vue'

const text = ref('TAKUMI MURAI')

const char = ref([])

const imageSrc =
  'https://webseisaku.webtame.jp/dcms_media/image/free_material_site_collection_cover_thum.jpg'

const scale = ref(1)

const grayScale = ref(100)

const targetElement = ref(null)

const rotateX = ref(0)

const rotateY = ref(0)

const resetImage = () => {
  scale.value = 1

  grayScale.value = 100

  rotateX.value = 0

  rotateY.value = 0
}

const changeMousePosition = (event) => {
  scale.value = 1.04

  grayScale.value = 0

  const rect = getRectPosition()

  const rectCenterX = rect.x + rect.width / 2

  const rectCenterY = rect.y + rect.height / 2

  const tmpX = event.clientX - rectCenterX // 中心座標からの位置

  const tmpY = event.clientY - rectCenterY // 中心座標からの位置

  rotateX.value = (tmpX / rect.width) * -10

  rotateY.value = (tmpY / rect.height) * 10
}

const getRectPosition = () => {
  const element = targetElement.value

  return element.getBoundingClientRect()
}

const rotateStyle = computed(() => {
  return {
    transform: `rotateX(${rotateY.value}deg) rotateY(${rotateX.value}deg) scale3d(${scale.value},${scale.value},${scale.value})`,

    filter: `grayscale(${grayScale.value}%)`
  }
})

const show = () => {
  const letters = text.value.split('')

  const callback = (letter) => {
    char.value.push(letter)
  }

  intervalForEach(callback, letters, 40)
}

const hide = () => {
  const letters = text.value.split('')

  const callback = () => {
    char.value.pop()
  }

  intervalForEach(callback, letters, 40)
}

const intervalForEach = (callback, array, intervalTime) => {
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
</script>

<template>
  <button @click="show()">show</button>

  <button @click="hide()">hide</button><br />

  <div class="transition-container">
    <transition-group name="list">
      <div v-for="letter in char" :key="letter" class="transition-letters">
        {{ letter }}
      </div>
    </transition-group>
  </div>

  <div class="container">
    <img
      ref="targetElement"
      class="image"
      :src="imageSrc"
      :style="rotateStyle"
      alt="Image"
      @mouseleave="resetImage"
      @mousemove="changeMousePosition"
    />
  </div>
</template>

<style>
.transition-container {
  display: flex;
  height: 18px;
  overflow: hidden;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.75s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  transform: translateY(18px);
}

.container {
  perspective: 1400px;
}

.image {
  position: absolute;

  transform-style: preserve-3d;

  transition: transform 0.2s, filter 0.5s;
}
</style>
