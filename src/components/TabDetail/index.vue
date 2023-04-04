<template>
  <div class="qk-tab-detail">
    <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabs" :key="tab.key" :label="tab.label" :name="tab.key" :lazy="true">
        <div :id="`tab-pane-${tab.key}`"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "QkTabDetail",
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentTab: '',
      currentComponent: '',
      componentArray: []
    }
  },
  mounted() {
    this.lazyComponent()
  },
  beforeDestroy() {
    for (let i = 0; i < this.componentArray.length; i++) {
      const component = this.componentArray[i]
      component.$destroy()
    }
  },
  methods: {
    lazyComponent() {
      const firstTab = this.tabs[0]
      if (firstTab) {
        this.currentTab = firstTab.key
        // 挂载内容
        this.mountedComponent(firstTab)
      }
    },
    mountedComponent(tab) {
      console.log(tab)
      this.$nextTick(() => {
        const Components = window.Vue.extend(tab.component)
        const component = new Components({
          el: document.getElementById(`tab-pane-${tab.key}`),
          propsData: tab.props,
          parent: this
        })
        this.componentArray.push(component)
      })
    },
    handleClick(val) {
      if (!val.loaded) {
        const tab = this.tabs.find(item => item.key === val.name)
        // 挂载内容
        this.mountedComponent(tab)
      }
    }
  }
}
</script>

<style lang="scss">
.qk-tab-detail {
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs {
    .el-tabs__nav-wrap {
      &::after {
        height: 1px;
      }
    }
    .el-tabs__item {
      padding-left: 20px!important;
    }
  }
}
</style>
