<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import CaptionImage from '@/components/CaptionImage.vue'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import SideNavigator from '@/components/SideNavigator.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PageTitle from '@/components/PageTitle.vue'
import TransitionScreen from '@/components/TransitionScreen.vue'
import myFavoritePicture from '@/assets/my-favorite.jpg'
import animeImage from '@/assets/anime.jpg'
import comicImage from '@/assets/comic.jpg'
import gameImage from '@/assets/game.jpg'
import guitarImage from '@/assets/guitar.jpg'
import ramenImage from '@/assets/ramen.jpg'
import router from '@/router'

const PAGE_TITLE: string = 'MY FAVORITE'
const PAGE_INDEX: number = 2

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
const pageContents: Ref<Array<{ title: string; pageName: string; src: string }>> = ref([
  {
    title: 'ABOUT ME',
    pageName: 'aboutMe',
    src: ''
  },
  { title: 'MY SKILLS', pageName: 'mySkills', src: '' },
  {
    title: 'MY FAVORITE',
    pageName: 'myFavorite',
    src: ''
  }
])
const transitionScreen = ref<InstanceType<typeof TransitionScreen> | null>(null)

const onClickNavigator = (index: number): void => {
  if (index === PAGE_INDEX) {
    return
  }
  transitionScreen.value?.showOverlay()
  setTimeout(() => {
    router.push(pageContents.value[index].pageName)
  }, 1000)
}

const onClickHeader = () => {
  transitionScreen.value?.showOverlay()
}

onMounted(() => {
  transitionScreen.value?.hideOverlay()
})
</script>
<template>
  <AppHeader @click="onClickHeader"></AppHeader>
  <SideNavigator
    :pageContents="pageContents"
    :currentContentIndex="PAGE_INDEX"
    @onClickNavigator="onClickNavigator"
  ></SideNavigator>
  <TransitionScreen ref="transitionScreen"></TransitionScreen>
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
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
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
</style>
