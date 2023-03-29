<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style lang="scss">
@import './asset/font/iconfont.css';
@import '@/styles/index.scss';
* {
  box-sizing: border-box;
}
html {
  height: 100vh;
}
body {
  height: 100vh;
}
#app {
  overflow: hidden;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
