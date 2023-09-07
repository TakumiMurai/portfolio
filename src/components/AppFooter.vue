<template>
  <footer class="footer__wrapper">
    <div class="footer__inner">TAKUMI MURAI</div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  &__wrapper {
    width: 100vw;
    height: 20vw;
    display: block;
    background-color: #121212;
    position: relative;
  }
  &__inner {
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
}
</style>
