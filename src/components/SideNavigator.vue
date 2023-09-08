<script setup lang="ts">
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

interface Props {
  pageContents: Array<{ title: string; pageName: string; src: string }>
  currentContentIndex: number
}
interface Emits {
  (e: 'onClickNavigator', index: number): void
}
const handleClick = (index: number): void => {
  emit('onClickNavigator', index)
}
</script>
<template>
  <div class="side-navigator__wrapper">
    <div
      class="side-navigator__inner"
      :class="{ 'side-navigator__inner--active': currentContentIndex === index }"
      v-for="(pageContent, index) in props.pageContents"
      :key="pageContent.title"
      @click="handleClick(index)"
    >
      <div class="side-navigator__index">{{ '0' + (index + 1) }}</div>
      <div class="side-navigator__boarder"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 768.98px) {
  .side-navigator__wrapper {
    display: none;
  }
}
@media screen and (min-width: 769px) {
  .side-navigator__wrapper {
    position: absolute;
    z-index: 1000;
    top: 50vh;
    right: 0;
  }
}
.side-navigator {
  &__inner {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 1rem 0;
    opacity: 0.25;
    transition: opacity 1s ease-in-out;
    &--active {
      opacity: 1;
    }
  }
  &__index {
    font-weight: 700;
    color: #fff;
    font-size: 0.8rem;
    margin-right: 1rem;
  }
  &__boarder {
    background-color: #fff;
    height: 1px;
    width: 1.4rem;
    margin-right: 4px;
  }
}
</style>
