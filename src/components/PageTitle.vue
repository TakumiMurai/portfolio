<script setup lang="ts">
const props = defineProps<Props>()

interface Props {
  title: string
}
</script>

<template>
  <div class="title__wrapper">
    <span class="title__span">{{ props.title }}</span>
  </div>
</template>

<style scoped lang="scss">
.title {
  &__wrapper {
    position: relative;
    height: 75vw;
    width: 100%;
    text-align: center;
    z-index: -2;
  }
  &__span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: 900;
    font-size: calc(1.5rem + 5vw);
    line-height: 0.9em;
  }
}
</style>
