<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import CaptionImage from '@/components/CaptionImage.vue'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PageTitle from '@/components/PageTitle.vue'
import myFavoritePicture from '@/assets/my-favorite.jpg'
import animeImage from '@/assets/anime.jpg'
import comicImage from '@/assets/comic.jpg'
import gameImage from '@/assets/game.jpg'
import guitarImage from '@/assets/guitar.jpg'
import ramenImage from '@/assets/ramen.jpg'

const PAGE_TITLE: string = 'MY FAVORITE'
const isActiveOverlay: Ref<boolean> = ref(true)

const captionImages: Ref<{ id: string; src: string; caption: string }[]> = ref([
  {
    id: 'anime',
    src: animeImage,
    caption: 'アニメ鑑賞が好きです。画像は最も好きなアニメのキルラキルのゲーム（特別版）。'
  },
  {
    id: 'comic',
    src: comicImage,
    caption: '漫画は1000冊以上所持しています。置き場所に困っています。'
  },
  {
    id: 'game',
    src: gameImage,
    caption:
      'ゲームに寝中すると時間を忘れてプレイしてしまいます。最近はもっぱらPCでゲームをしています。'
  },
  {
    id: 'guitar',
    src: guitarImage,
    caption: '大学から始めたギター。今でも月1回のペースで仲間とライブをしています。'
  },
  {
    id: 'ramen',
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
  <AppHeader @click="onClick"></AppHeader>
  <transition name="overlay-green">
    <div class="overlay-green" v-if="isActiveOverlay"></div>
  </transition>
  <transition name="overlay-black">
    <div class="overlay-black" v-if="isActiveOverlay"></div>
  </transition>
  <img :src="myFavoritePicture" class="key-visual" />
  <PageTitle :title="PAGE_TITLE"></PageTitle>
  <div class="content__wrapper">
    <ul class="content__inner">
      <li v-for="captionImage in captionImages" :key="captionImage.id">
        <FadeInAnimation>
          <CaptionImage
            class="caption__image"
            :imageSource="captionImage.src"
            :caption="captionImage.caption"
          ></CaptionImage>
        </FadeInAnimation>
        <FadeInAnimation>
          <div class="caption__text--sp">
            <span>{{ captionImage.caption }}</span>
          </div>
        </FadeInAnimation>
      </li>
    </ul>
  </div>

  <AppFooter></AppFooter>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding-inline: 0;
}
.key-visual {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: -2;
}
.title {
  &__wrapper {
    font-weight: 900;
    font-size: calc(1.3rem + 4vw);
    color: #121212;
    transform: translate(-50%, -50%);
    top: 50vh;
    left: 50vw;
    z-index: -2;
  }
}
.content {
  &__wrapper {
    width: 100vw;
    background-color: #121212;
  }
  &__inner {
    margin: 0 auto;
    padding-bottom: 18.7vw;
    border-bottom: 1px solid #9c9c9b;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 768.98px) {
  .content {
    &__wrapper {
      padding-top: 14vw;
    }
    &__inner {
      width: 79vw;
    }
  }
  .caption {
    &__image {
      width: 100%;
    }
    &__text {
      &--sp {
        width: 100%;
        margin-bottom: 13vw;
      }
    }
  }
  .title {
    &__wrapper {
      top: 20vh;
    }
  }
}
@media screen and (min-width: 769px) {
  .content {
    &__wrapper {
      padding-top: 14vw;
    }
    &__inner {
      width: 72vw;
    }
  }
  .caption {
    &__image {
      width: 100%;
    }
    &__text {
      &--sp {
        width: 100%;
        margin-bottom: 13vw;
      }
    }
  }
  .title {
    &__wrapper {
      top: 30vh;
    }
  }
}
@media screen and (min-width: 1024px) {
  .content {
    &__wrapper {
      padding: 11vw 0 0;
      clear: both;
    }
  }
  .caption {
    &__image {
      width: 32vw;
      margin-bottom: 13vw;
    }
    &__text {
      &--sp {
        display: none;
      }
    }
  }
  .title {
    &__wrapper {
      top: 50vh;
    }
  }
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
</style>
