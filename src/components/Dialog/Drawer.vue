<template>
  <el-drawer
    :wrapper-closable="wrapperClosable"
    :title="title"
    :visible.sync="visible"
    :size="width"
    :custom-class="customClass"
    :direction="direction"
    @close="onCloseDialog">
    <div id="drawer-box"/>
  </el-drawer>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      visible: false,
      title: '',
      width: '50%',
      doms: null,
      class: '',
      wrapperClosable: false,
      direction: 'rtl'
    }
  },
  provide() {
    return {
      qkDialog: this
    }
  },
  computed: {
    customClass() {
      return ['qk-drawer', this.class].filter(v => !!v).join(' ')
    }
  },
  created() {},
  mounted() {
    this.visible = true
    this.$nextTick(() => {
      if (!this.components) {
        console.error('components are not in parameters')
        return
      }
      // 挂载内容
      const Components = Vue.extend(this.components)
      this.doms = new Components({
        el: document.getElementById('drawer-box'),
        propsData: this.props,
        data: { onAction: this.onAction, onClose: this.onCloseDialog },
        parent: this
      })
    })
  },
  beforeDestroy() {
    // 销毁挂载的内容
    this.doms.$destroy()
  },
  methods: {
    onCloseDialog() {
      this.onClose() // 对应调用 index.js中 options.onClose 方法
    }
  }
}
</script>

<style scoped>

</style>
