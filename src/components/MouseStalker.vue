<script setup lang="ts">
import { ref } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)
const positionX = ref(0)
const positionY = ref(0)
const opacityA = ref(0)
const opacityB = ref(0)

const onMouseMove = () => {
  console.log('mousemove')
  // mouseX.value = event.pageX
  // mouseY.value = event.pageY
}
</script>

<template>
  <div>
    <div class="Cursor" @mousemove="onMouseMove()"></div>
    <div class="stalker"></div>
  </div>
</template>

<style>
body {
  position: relative;
  height: 900px;
  background-color: #dcdcdc;
  cursor: none; /* bodyに対して設定することでページ全体でデフォルトカーソルを非表示にする*/
  text-align: center;
}

body a:hover {
  cursor: none; /*aタグホバー時のカーソルも非表示にする*/
}

.Cursor {
  position: relative; /* 最初はページの左上に配置されるようにする */
  top: v-bind(mouseX);
  left: v-bind(mouseY);
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px; /* カーソルの焦点を中央に合わせる */
  z-index: 3; /*一番手前に来るように*/
  background-color: #000;
  border-radius: 50%;
  opacity: 0; /*開いた瞬間非表示*/
  transition: transform 0.1s;
}

.stalker {
  position: relative;
  width: 40px;
  height: 40px;
  z-index: 9999; /*一番手前に来るように*/
  background-color: #89c997;
  border-radius: 50%;
  opacity: 0; /*開いた瞬間非表示*/
  transition: transform 0.1s;
  pointer-events: none; /*マウス直下に常にstalker要素がくるのでホバー要素が働かなくなる。noneにすることでstalkerを無視する*/
}
</style>
