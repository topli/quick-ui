<template>
  <div class="custom-test">
    <span @click="test">11111111111111</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {}
    },
    created() {
      console.log(this);
    },
    methods: {
      test() {
        console.log(1111111112222222233333);
      }
    }
  }
</script>
<style scoped lang='scss'></style>