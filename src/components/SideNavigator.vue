<script setup lang="ts">
interface Props {
  contentNameList: Array<String>
  currentContentIndex: number
}
interface Emits {
  (e: 'onClickNavigator', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = (index: number): void => {
  emit('onClickNavigator', index)
}
</script>
<template>
  <div class="wrapperSideNavigator">
    <div
      class="navigatorContent"
      :class="{ 'navigatorContent-active': currentContentIndex === index }"
      v-for="(_, index) in props.contentNameList"
      @click="handleClick(index)"
    >
      <div class="navigatorIndex">{{ '0' + (index + 1) }}</div>
      <div class="navigatorBoarder"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapperSideNavigator {
  position: absolute;
  top: 50vh;
  right: 0;
}
.navigatorContent {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem 0;
  opacity: 0.25;
}

.navigatorContent-active {
  opacity: 1;
}

.navigatorIndex {
  font-weight: 700;
  color: #fff;
  font-size: 0.8rem;
  margin-right: 1rem;
}

.navigatorBoarder {
  background-color: #fff;
  height: 1px;
  width: 1.4rem;
  margin-right: 4px;
  /*アニメーションの指定*/
}
</style>
