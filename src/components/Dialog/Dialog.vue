<template>
  <el-dialog
    :close-on-click-modal="closeOnClickModal"
    :title="title"
    :visible.sync="visible"
    :width="width"
    :custom-class="customClass"
    @close="onCloseDialog">
    <div id="dialog-box"/>
  </el-dialog>
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
      closeOnClickModal: false
    }
  },
  provide() {
    return {
      qkDialog: this
    }
  },
  computed: {
    customClass() {
      return ['qk-dialog', this.class].filter(v => !!v).join(' ')
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
        el: document.getElementById('dialog-box'),
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
