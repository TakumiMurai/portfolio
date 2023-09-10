<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue/dist/vue.js'
import FadeInAnimation from '@/components/FadeInAnimation.vue'
import SideNavigator from '@/components/SideNavigator.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PageTitle from '@/components/PageTitle.vue'
import iconCss from '@/assets/icons8-css.svg'
import iconHtml from '@/assets/icons8-html.svg'
import iconJavascript from '@/assets/icons8-javascript.svg'
import iconReact from '@/assets/icons8-react-native.svg'
import iconTypescript from '@/assets/icons8-typescript.svg'
import iconVue from '@/assets/icons8-vue-js.svg'
import iconAws from '@/assets/icons8-aws.svg'
import mySkillsPicture from '@/assets/my-skills.jpg'
import router from '@/router'

const PAGE_TITLE: string = 'MY SKILLS'
const PAGE_INDEX: number = 1

const isActiveOverlay: Ref<boolean> = ref(true)

const skills: Ref<Array<{ name: string; img: string; content: string }>> = ref([
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

const handleClick = (index: number): void => {
  if (index === PAGE_INDEX) {
    return
  }
  isActiveOverlay.value = true
  setTimeout(() => {
    router.push(pageContents.value[index].pageName)
  }, 1000)
}

const onClick = (): void => {
  isActiveOverlay.value = true
}

onMounted(() => {
  isActiveOverlay.value = false
})
</script>
<template>
  <AppHeader @click="onClick"></AppHeader>
  <SideNavigator
    :pageContents="pageContents"
    :currentContentIndex="PAGE_INDEX"
    @onClickNavigator="handleClick"
  ></SideNavigator>
  <transition name="overlay-green">
    <div class="overlay-green" v-if="isActiveOverlay"></div>
  </transition>
  <transition name="overlay-black">
    <div class="overlay-black" v-if="isActiveOverlay"></div>
  </transition>
  <img :src="mySkillsPicture" class="key-visual" />
  <PageTitle :title="PAGE_TITLE"></PageTitle>
  <div class="content__wrapper">
    <div class="content__inner">
      <div v-for="skill in skills" :key="skill.name">
        <FadeInAnimation class="skill__wrapper">
          <img class="skill__icon" :src="skill.img" />
          <div class="skill-text__wrapper">
            <div class="skill-text__title">{{ skill.name }}</div>
            <div class="skill-text__content">{{ skill.content }}</div>
          </div>
        </FadeInAnimation>
      </div>
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
.skill {
  &__wrapper {
    width: 100%;
    display: flex;
  }
  &-text {
    &__wrapper {
      font-family: 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro',
        'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic',
        sans-serif;
    }
    &__title {
      margin-left: 8px;
      font-weight: 600;
      color: #fff;
    }
    &__content {
      margin-left: 16px;
    }
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
  .skill {
    &__wrapper {
      margin-bottom: 10vh;
    }
    &__icon {
      width: 10vw;
      height: 10vw;
    }
    &-text {
      &__title {
        font-size: 3.3vw;
        margin-left: 8px;
        font-weight: 600;
        color: #fff;
      }
      &__content {
        font-size: 2.9vw;
      }
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
  .skill {
    &__wrapper {
      margin-bottom: 10vh;
    }
    &__icon {
      width: 5vw;
      height: 5vw;
    }
    &-text {
      &__title {
        font-size: 1.5vw;
      }
      &__content {
        font-size: 1.1vw;
      }
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
