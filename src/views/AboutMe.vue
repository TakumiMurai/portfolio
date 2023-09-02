<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import aboutMePicture from '@/assets/about-me.jpg'

const isActiveOverlay: Ref<boolean> = ref(true)

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
  <img :src="aboutMePicture" class="header-img" />
  <div class="content">
    <div class="content-inner">
      <FadeInAnimation>
        <div class="profile-ruby">村井 拓海</div>
      </FadeInAnimation>
      <FadeInAnimation>
        <div class="profile-name-wrapper">
          <div class="profile-left">TAKUMI MURAI</div>
          <div class="profile-right">ENGINEER</div>
        </div>
      </FadeInAnimation>
      <FadeInAnimation>
        <div class="profile-sentence">
          1998年、埼玉県草加市生まれ。
          <br />
          <br />
          慶應義塾大学理工学部を卒業後、2021年に開発職としてSky株式会社に入社。
          <br />
          <br />
          入社後、アサインされたチームでフロントエンドエンジニアとしてUI実装を行ったのち、チーム異動。フルスタックエンジニアとしてモバイルアプリ開発チームでフロントエンドからバックエンドまでの設計・実装・テストを行う。
          <br />
          <br />
          1年ほどの活動後、主体性の高さや技術力を評価され現在のチームに異動。
          <br />
          <br />
          1万人ほどの規模の業務用アプリの保守・改善活動を行うチームのメンバーとして活動する。
          <br />
          <br />
          現在のチームでは技術キャッチアップ力を評価され、画面だけでなくバックエンドに関わる部分の改善タスクを実施。
        </div>
      </FadeInAnimation>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
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
  transform: translateY(100%);
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
  transform: translateY(100%);
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
.content {
  margin-top: 100vh;
  /*
  padding: 11vw 0 0;
  background-color: #ecece7;
  */
  clear: both;
  margin-top: 100vh;
  width: 100vw;
  padding: 11vw 0 0;
  background-color: #121212;
  clear: both;
}
.content-inner {
  width: 72vw;
  margin: 0 auto;
  padding-bottom: 18.7vw;
  border-bottom: 1px solid #9c9c9b;
}
.profile-ruby {
  font-weight: 900;
  color: #fff;
  font-size: 1.5vw;
  font-weight: bold;
  letter-spacing: 0.1em;
}
.profile-name-wrapper {
  margin: 1vw 0 7.5vw;
  height: 4vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-left {
  color: #fff;
  font-size: 4vw;
  letter-spacing: 0.1em;
}
.profile-right {
  font-size: 1.1vw;
  letter-spacing: 0.1em;
  line-height: 4vw;
  border-left: 1px solid #9c9c9b;
  color: #9c9c9b;
  padding-left: 2.5vw;
}
.profile-sentence {
  /* 
  font-size: 1.1vw;
  font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  line-height: 2.2em;
  text-align: justify;
  letter-spacing: .075em;
  */
  color: #fff;
  font-size: 1.1vw;
  letter-spacing: 0.1em;
  line-height: 2.5em;
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
