<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import CaptionImage from '@/components/CaptionImage.vue'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import myFavoritePicture from '@/assets/my-favorite.jpg'
import animeImage from '@/assets/anime.jpg'
import comicImage from '@/assets/comic.jpg'
import gameImage from '@/assets/game.jpg'
import guitarImage from '@/assets/guitar.jpg'
import ramenImage from '@/assets/ramen.jpg'

const isActiveOverlay: Ref<boolean> = ref(true)

const images: Ref<{ src: string; caption: string }[]> = ref([
  {
    src: animeImage,
    caption: 'アニメ鑑賞が好きです。画像は最も好きなアニメのキルラキルのゲーム（特別版）。'
  },
  { src: comicImage, caption: '漫画は1000冊以上所持しています。置き場所に困っています。' },
  {
    src: gameImage,
    caption:
      'ゲームに寝中すると時間を忘れてプレイしてしまいます。最近はもっぱらPCでゲームをしています。'
  },
  {
    src: guitarImage,
    caption: '大学から始めたギター。今でも月1回のペースで仲間とライブをしています。'
  },
  {
    src: ramenImage,
    caption: '食べ物、特にラーメンが好きです。画像は近所のよく行くラーメン屋です。'
  }
])

const onClick = () => {
  isActiveOverlay.value = true
}

onMounted(() => {
  isActiveOverlay.value = false
})
</script>
<template>
  <Header @click="onClick"></Header>
  <transition name="overlay-green">
    <div class="overlay-green" v-if="isActiveOverlay"></div>
  </transition>
  <transition name="overlay-black">
    <div class="overlay-black" v-if="isActiveOverlay"></div>
  </transition>
  <img :src="myFavoritePicture" class="header-img" />
  <div class="content">
    <ul class="content-inner">
      <li v-for="image in images">
        <FadeInAnimation>
          <CaptionImage
            class="caption-image"
            :imageSource="image.src"
            :caption="image.caption"
          ></CaptionImage>
        </FadeInAnimation>
      </li>
    </ul>
  </div>

  <Footer></Footer>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding-inline: 0;
}
.overlay-green {
  position: fixed;
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
  position: fixed;
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
.header-img {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: -2;
}
.page-title {
  position: fixed;
  font-weight: 900;
  font-size: calc(1.3rem + 4vw);
  color: #121212;
  transform: translate(-50%, -50%);
  top: 50vh;
  left: 50vw;
  z-index: -2;
}
@media screen and (max-width: 768.98px) {
  .content {
    margin: 74vw auto 0;
    width: 100vw;
    padding-top: 14vw;
    background-color: #121212;
  }
  .content-inner {
    width: 79vw;
    margin: 0 auto;
    padding-bottom: 18.7vw;
    border-bottom: 1px solid #9c9c9b;
  }
  .caption-image {
    width: 100%;
    margin-bottom: 13vw;
  }
}
@media screen and (min-width: 769px) {
  .content {
    margin: 74vw auto 0;
    width: 100vw;
    padding-top: 14vw;
    background-color: #121212;
  }
  .content-inner {
    width: 72vw;
    margin: 0 auto;
    padding-bottom: 18.7vw;
    border-bottom: 1px solid #9c9c9b;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .caption-image {
    width: 32vw;
    margin-bottom: 13vw;
  }
}
@media screen and (min-width: 1024px) {
  .content {
    margin-top: 100vh;
    clear: both;
    margin-top: 100vh;
    width: 100vw;
    padding: 11vw 0 0;
    background-color: #121212;
    clear: both;
  }
}
.footer-wrapper {
  width: 100vw;
  height: 20vw;
  display: block;
  background-color: #121212;
  position: relative;
}

.footer-inner {
  color: #fff;
  font-size: 1.3vw;
  font-family: 'PT Sans Narrow', sans-serif;
  font-weight: bold;
  letter-spacing: 0.5em;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
