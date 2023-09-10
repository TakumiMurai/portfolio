import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutMe from '../views/AboutMe.vue'
import MySkills from '../views/MySkills.vue'
import MyFavorite from '../views/MyFavorite.vue'

const router = createRouter({
  scrollBehavior() {
    return {
      top: 0
    }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: AboutMe
    },
    {
      path: '/mySkills',
      name: 'mySkills',
      component: MySkills
    },
    {
      path: '/myFavorite',
      name: 'myFavorite',
      component: MyFavorite
    }
  ]
})

export default router
