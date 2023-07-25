<script setup lang="ts">
interface Props {
  contentNameList: Array<String>
}
interface Emits {
  (e: 'onClickNavigator', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = (index: number): void => {
  console.log('click', index)
  emit('onClickNavigator', index)
}
</script>
<template>
  <div class="wrapperSideNavigator">
    <div
      class="navigatorContent"
      v-for="(_, index) in props.contentNameList"
      @click="handleClick(index)"
    >
      <div class="navigatorBoarder">--</div>
      <div class="navigatorIndex">{{ index }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapperSideNavigator {
  position: absolute;
  top: 50%;
  right: 0;
}
.navigatorContent {
  display: flex;
  width: 100%;
}
</style>
