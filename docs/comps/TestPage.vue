<template>
  <div class="test">
    TestPage
    <span>{{data.text}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss">
  .test1 {
    color: red;
  }
</style>