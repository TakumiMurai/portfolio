<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ imageSource: string; caption: string }>()

const showText = ref(false)

const onMouseenter = () => {
  showText.value = true
}
const onMouseleave = () => {
  showText.value = false
}
</script>

<template>
  <div class="image-container" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <img class="image" :src="imageSource" />
    <transition name="overlay">
      <div class="text-overlay" v-show="showText">
        <p class="overlay-text">{{ caption }}</p>
      </div>
    </transition>
  </div>
</template>

<style>
.image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.image {
  width: 100%;
  height: auto;
  transition: filter 0.3s ease-in-out;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.overlay-text {
  color: white;
  font-size: 18px;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: all 0.6s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  padding-top: 10px;
  opacity: 0;
}

@media screen and (max-width: 768.98px) {
  .overlay-text {
    width: 90%;
    font-size: 2.4vw;
    font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro',
      'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic',
      sans-serif;
    color: #fff;
  }
}
@media screen and (min-width: 769px) {
  .overlay-text {
    width: 70%;
    font-size: 1.1vw;
    font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro',
      'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic',
      sans-serif;
    color: #fff;
  }
}
</style>
