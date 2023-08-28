<script setup lang="ts">
import router from '@/router'

const onClickHome = () => {
  console.log('onClick')
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="header-wrapper">
    <div class="header-left" @click="onClickHome">Home</div>
    <div class="header-right">About</div>
  </div>
</template>

<style lang="scss">
.header {
  &-wrapper {
    top: 3rem;
    left: 3rem;
    width: calc(100vw - 6rem);
    position: absolute;
    display: flex;
    justify-content: space-between;
    z-index: 100;
  }
  &-left {
    font-weight: 700;
    color: #fff;
    font-size: 16px;
  }
  &-right {
    font-weight: 700;
    color: #fff;
    font-size: 16px;
  }
}
</style>
