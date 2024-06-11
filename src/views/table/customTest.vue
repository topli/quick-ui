<template>
  <div class="custom-test">
    <span @click="test">11111111111111</span>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    inject: ['qkDialog'],
    data() {
      return {}
    },
    created() {
      console.log(this.qkDialog);
    },
    methods: {
      test() {
        this.qkDialog.close()
        console.log(1111111112222222233333);
      }
    },
    watch: {
      value: {
        handler: function (val) {
          console.log(val);
        },
        immediate: true,
        deep: true
      }
    }
  }
</script>
<style scoped lang='scss'></style>