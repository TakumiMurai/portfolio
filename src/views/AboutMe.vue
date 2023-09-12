<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import SideNavigator from '@/components/SideNavigator.vue'
import TransitionScreen from '@/components/TransitionScreen.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PageTitle from '@/components/PageTitle.vue'
import aboutMePicture from '@/assets/about-me.jpg'
import router from '@/router'

const PAGE_TITLE: string = 'ABOUT ME'
const PAGE_INDEX: number = 0

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

const onClickHeader = (): void => {
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
  <img :src="aboutMePicture" class="key-visual" />
  <PageTitle :title="PAGE_TITLE"></PageTitle>
  <div class="content__wrapper">
    <div class="content__inner">
      <FadeInAnimation>
        <ruby class="profile__ruby">村井 拓海</ruby>
      </FadeInAnimation>
      <FadeInAnimation>
        <div class="profile-name__wrapper">
          <h2 class="profile-name__left">TAKUMI MURAI</h2>
          <span class="profile-name__right">ENGINEER</span>
        </div>
      </FadeInAnimation>
      <FadeInAnimation>
        <p class="profile-sentence">
          1998年、埼玉県草加市生まれ。
          <br />
          慶應義塾大学理工学部を卒業後、2021年に開発職としてSky株式会社に入社。
          <br />
          入社後、アサインされたチームでフロントエンドエンジニアとしてUI実装を行ったのち、チーム異動。フルスタックエンジニアとしてモバイルアプリ開発チームでフロントエンドからバックエンドまでの設計・実装・テストを行う。
          <br />
          1年ほどの活動後、主体性の高さや技術力を評価され現在のチームに異動。
          <br />
          1万人ほどの規模の業務用アプリの保守・改善活動を行うチームのメンバーとして活動する。
          <br />
          現在のチームでは技術キャッチアップ力を評価され、画面だけでなくバックエンドに関わる部分の改善タスクを実施。
        </p>
      </FadeInAnimation>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<style scoped lang="scss">
.key-visual {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: -2;
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
  }
}
.profile {
  &-ruby {
    font-weight: 900;
    color: #fff;
    letter-spacing: 0.1em;
  }
  &-name {
    &__wrapper {
      margin: 1vw 0 7.5vw;
      height: 4vw;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__left {
      color: #fff;
    }
    &__right {
      letter-spacing: 0.1em;
      border-left: 1px solid #9c9c9b;
      color: #9c9c9b;
      padding-left: 2.5vw;
    }
  }
  &-sentence {
    font-size: 1.1vw;
    font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro',
      'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic',
      sans-serif;
    color: #fff;
    letter-spacing: 0.1em;
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
  .profile {
    &-ruby {
      font-size: 2.4vw;
    }
    &-name {
      &__left {
        font-size: 6.4vw;
        letter-spacing: 0.05em;
      }
      &__right {
        font-size: 2.4vw;
        line-height: 2.5em;
      }
    }
    &-sentence {
      font-size: 2.9vw;
      line-height: 2.5em;
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
  .profile {
    &-ruby {
      font-size: 1.5vw;
    }
    &-name {
      &__left {
        font-size: 4vw;
        letter-spacing: 0.1em;
      }
      &__right {
        font-size: 1.1vw;
        line-height: 4vw;
      }
    }
    &-sentence {
      font-size: 1.1vw;
      line-height: 2.5em;
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
}
</style>
