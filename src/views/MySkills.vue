<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
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
    img: iconHtml
  },
  {
    name: 'CSS',
    img: iconCss
  },
  {
    name: 'JavaScript',
    img: iconJavascript
  },
  {
    name: 'jQuery',
    img: iconJquery
  },
  {
    name: 'ReactNative',
    img: iconReact
  },
  {
    name: 'TypeScript',
    img: iconTypescript
  },
  {
    name: 'Vue.js',
    img: iconVue
  },
  {
    name: 'AWS',
    img: iconAws
  }
])
</script>
<template>
  <Header></Header>
  <div class="page-title">MY SKILLS</div>
  <div class="content">
    <div class="content-inner">
      <div v-for="skill in skills" class="skill-wrapper">
        <img class="skill-icon" :src="skill.img" />
        <div class="skill-title">{{ skill.name }}</div>
      </div>
    </div>
  </div>
  <div class="footer-wrapper">
    <div class="footer-inner">TAKUMI MURAI</div>
  </div>
</template>

<style>
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
  display: flex;
}
.skill-icon {
  width: 5vw;
}
.skill-title {
  font-size: 1vw;
  color: #fff;
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
