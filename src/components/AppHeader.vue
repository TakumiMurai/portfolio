<script setup lang="ts">
import router from '@/router'

const onClickHome = () => {
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 1000)
}
</script>

<template>
  <div class="header__wrapper">
    <div class="header__left" @click="onClickHome">Home</div>
  </div>
</template>

<style lang="scss">
.header {
  &__wrapper {
    width: calc(100vw - 6rem);
    position: fixed;
    display: flex;
    justify-content: space-between;
    z-index: 1;
  }
  &__left {
    font-family: Montserrat, sans-serif;
    font-weight: 700;
    color: #fff;
    font-size: 16px;
    text-shadow: 1px 1px 2px #121212;
  }
}
@media screen and (max-width: 768.98px) {
  .header__wrapper {
    top: 1rem;
    left: 1rem;
  }
}
@media screen and (max-width: 769px) {
  .header__wrapper {
    top: 3rem;
    left: 3rem;
  }
}
</style>
