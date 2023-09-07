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
  <div class="caption-image__wrapper" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <img class="caption-image__image" :src="imageSource" />
    <transition name="overlay">
      <div class="caption-image__caption-wrapper" v-show="showText">
        <p class="caption-image__caption">{{ caption }}</p>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.caption-image {
  &__wrapper {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  &__image {
    width: 100%;
    height: auto;
    transition: filter 0.3s ease-in-out;
  }
  &__caption-wrapper {
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
}
.overlay {
  &-enter-active,
  &-leave-active {
    transition: padding-top 0.6s ease, opacity 0.6s ease;
  }
  &-enter-from,
  &-leave-to {
    padding-top: 10px;
    opacity: 0;
  }
}
@media screen and (max-width: 768.98px) {
  .caption-image__caption {
    width: 90%;
    font-size: 2.4vw;
    font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro',
      'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic',
      sans-serif;
    color: #fff;
  }
}
@media screen and (min-width: 769px) {
  .caption-image__caption {
    width: 70%;
    font-size: 1.1vw;
    font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro',
      'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic',
      sans-serif;
    color: #fff;
  }
}
</style>
