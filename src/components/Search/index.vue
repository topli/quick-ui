<template>
  <div class="qk-search">
    <div ref="qkSearchForm" :style="style" class="qk-search-form" @keyup.enter="onSearch">
      <slot/>
    </div>
    <div ref="qkSearchBtns" class="qk-search-btns">
      <el-button v-if="showMore" :icon="toggleFromIcon" class="btn-more-item" type="text" @click="openSearchFun"/>
      <el-button class="qk-search-btn" :icon="searchBtnText ? '' : 'el-icon-search'" type="primary" round @click="onSearch">
        {{ searchBtnText ? '查询' : ''}}
      </el-button>
      <slot name="btns"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QkSearch',
  props: {
    paddingRight: {
      type: String,
      default: '135'
    },
    showText: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      toggleOpen: false,
      formHeight: 0,
      btnsWidth: 0,
      btnsHeight: 0
    }
  },
  computed: {
    showMore() {
      return this.formHeight > this.btnsHeight + 12 // 12是form-item的margin-bottom
    },
    style() {
      const defStyle = {}
      if (this.toggleOpen) {
        defStyle.height = this.formHeight + 'px'
      } else {
        defStyle.height = this.btnsHeight + 'px'
      }
      defStyle.paddingRight = this.btnsWidth + 'px'
      return defStyle
    },
    toggleFromIcon() {
      return this.toggleOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    text() {
      return this.toggleOpen ? '收起' : '更多'
    },
    searchBtnText() {
      if (this.showText !== null) {
        return this.showText
      }
      if (this.$qkConfig.searchBtnText !== undefined) {
        return this.$qkConfig.searchBtnText
      }
    }
  },
  mounted() {
    this.getFormHeight()
    this.getBtnsWidht()
    window.addEventListener('resize', this.getFormHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getFormHeight)
  },
  methods: {
    getFormHeight() {
      this.$nextTick(() => {
        if (this.$slots.default && this.$slots.default[0]) {
          this.formHeight = this.$slots.default[0].elm.clientHeight
        }
      })
    },
    getBtnsWidht() {
      this.btnsWidth = this.$refs.qkSearchBtns.clientWidth
      this.btnsHeight = this.$refs.qkSearchBtns.clientHeight
    },
    openSearchFun() {
      this.toggleOpen = !this.toggleOpen
    },
    onSearch() {
      this.$emit('on-search')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .qk-search {
    position: relative;
    width: 100%;
    margin: 5px 0;
    &-form {
      min-width: 135px;
      overflow: hidden;
      transition: height 0.3s;
      -moz-transition: height 0.3s; /* Firefox 4 */
      -webkit-transition: height 0.3s; /* Safari 和 Chrome */
      -o-transition: height 0.3s; /* Opera */
    }
    &-btns {
      position: absolute;
      padding: 0 10px;
      top: 0;
      right: 0;
      .el-dropdown {
        margin-left: 10px;
      }
    }
  }
</style>
