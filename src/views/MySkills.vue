<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import Header from '@/components/Header.vue'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import Footer from '@/components/Footer.vue'
import iconCss from '@/assets/icons8-css.svg'
import iconHtml from '@/assets/icons8-html.svg'
import iconJavascript from '@/assets/icons8-javascript.svg'
import iconReact from '@/assets/icons8-react-native.svg'
import iconTypescript from '@/assets/icons8-typescript.svg'
import iconVue from '@/assets/icons8-vue-js.svg'
import iconAws from '@/assets/icons8-aws.svg'
import mySkillsPicture from '@/assets/my-skills.jpg'

const isActiveOverlay: Ref<boolean> = ref(true)

const skills = ref([
  {
    name: 'HTML',
    img: iconHtml,
    content: '基本的なコーディング・タグの使用が可能。レビューの実施経験あり。'
  },
  {
    name: 'CSS',
    img: iconCss,
    content: '基本的なコーディングが可能。SCSS・BEMの経験あり。レビューの実施経験あり。'
  },
  {
    name: 'JavaScript',
    img: iconJavascript,
    content: '最適な実装・設計が可能。レビューの実施経験あり。'
  },
  {
    name: 'ReactNative',
    img: iconReact,
    content: '基本的なコーディングが可能。'
  },
  {
    name: 'TypeScript',
    img: iconTypescript,
    content: '基本的なコーディングが可能。'
  },
  {
    name: 'Vue.js',
    img: iconVue,
    content: '最適な実装・設計が可能。Vue2・3の双方の経験あり。レビューの実施経験あり。'
  },
  {
    name: 'AWS',
    img: iconAws,
    content:
      '環境構築や、簡単な機能のシステムデザインが可能。API Gateway・Lambda・SES・SQS・DynamoDBなど複数のサービスの設計・デプロイ経験あり。'
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
  <img :src="mySkillsPicture" class="header-img" />
  <div class="page-title">MY SKILLS</div>
  <div class="content">
    <div class="content-inner">
      <div v-for="skill in skills">
        <FadeInAnimation class="skill-wrapper">
          <img class="skill-icon" :src="skill.img" />
          <div class="skill-text-wrapper">
            <div class="skill-title">{{ skill.name }}</div>
            <div class="skill-content">{{ skill.content }}</div>
          </div>
        </FadeInAnimation>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped lang="scss">
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
  .skill-wrapper {
    width: 100%;
    display: flex;
    margin-bottom: 10vh;
  }
  .skill-icon {
    width: 10vw;
  }
  .skill-title {
    font-size: 3.3vw;
    margin-left: 8px;
    font-weight: 600;
    color: #fff;
  }
  .skill-content {
    font-size: 2.9vw;
    margin-left: 16px;
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
  }
  .skill-wrapper {
    width: 100%;
    display: flex;
    margin-bottom: 5vh;
  }
  .skill-icon {
    width: 5vw;
  }
  .skill-title {
    font-size: 1.5vw;
    margin-left: 8px;
    font-weight: 600;
    color: #fff;
  }
  .skill-content {
    font-size: 1.1vw;
    margin-left: 16px;
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
