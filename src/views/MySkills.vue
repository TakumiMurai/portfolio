<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import Footer from '@/components/Footer.vue'
import iconCss from '@/assets/icons8-css.svg'
import iconHtml from '@/assets/icons8-html.svg'
import iconJavascript from '@/assets/icons8-javascript.svg'
import iconJquery from '@/assets/icons8-jquery.svg'
import iconReact from '@/assets/icons8-react-native.svg'
import iconTypescript from '@/assets/icons8-typescript.svg'
import iconVue from '@/assets/icons8-vue-js.svg'
import iconAws from '@/assets/icons8-aws.svg'

const skills = ref([
  {
    name: 'HTML',
    img: iconHtml,
    content: 'ここに説明を入力'
  },
  {
    name: 'CSS',
    img: iconCss,
    content: 'ここに説明を入力'
  },
  {
    name: 'JavaScript',
    img: iconJavascript,
    content: 'ここに説明を入力'
  },
  {
    name: 'jQuery',
    img: iconJquery,
    content: 'ここに説明を入力'
  },
  {
    name: 'ReactNative',
    img: iconReact,
    content: 'ここに説明を入力'
  },
  {
    name: 'TypeScript',
    img: iconTypescript,
    content: 'ここに説明を入力'
  },
  {
    name: 'Vue.js',
    img: iconVue,
    content: 'ここに説明を入力'
  },
  {
    name: 'AWS',
    img: iconAws,
    content: 'ここに説明を入力'
  }
])
</script>
<template>
  <Header></Header>
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
  font-size: 1.5vw;
  margin-left: 16px;
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
