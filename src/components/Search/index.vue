<template>
  <div class="qk-search">
    <div ref="qkSearchForm" :style="style" class="qk-search-form" @keyup.enter="onSearch">
      <slot></slot>
    </div>
    <div ref="qkSearchBtns" class="qk-search-btns">
      <el-button v-if="showMore" :icon="toggleFromIcon" class="btn-more-item" type="text" @click="openSearchFun"/>
      <el-button class="qk-search-btn" :icon="searchText ? '' : 'el-icon-search'" type="primary" @click="onSearch">
        {{ searchText }}
      </el-button>
      <slot name="btns"></slot>
    </div>
  </div>
</template>

<script>
import { isNumber } from 'loadsh'
export default {
  name: 'QkSearch',
  props: {
    searchText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      toggleOpen: false,
      formHeight: 0,
      btnsWidth: 0,
      btnsHeight: 0,
      defHeight: {
        default: 62,
        medium: 58,
        small: 55,
        mini: 50
      }
    }
  },
  computed: {
    showMore() {
      return this.formHeight > this.height
    },
    style() {
      const defStyle = {
        height: isNumber(this.height) ? (this.height + 'px') : this.height
      }
      return this.toggleOpen ? { height: this.formHeight + 'px' } : defStyle
    },
    toggleFromIcon() {
      return this.toggleOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  created() {
    this.setDefHeight()
  },
  mounted() {
    this.getFormHeight()
    window.addEventListener('resize', this.getFormHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getFormHeight)
  },
  updated() {
    this.getFormHeight()
  },
  methods: {
    setDefHeight() {
      this.height = this.defHeight[this.$ELEMENT.size || 'default']
    },
    getFormHeight() {
      this.$nextTick(() => {
        if (this.$slots.default) {
          this.formHeight = this.$slots.default[0].elm.clientHeight
        }
      })
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
    display: flex;
    &-form {
      min-width: 135px;
      overflow: hidden;
      transition: height 0.3s;
      -moz-transition: height 0.3s; /* Firefox 4 */
      -webkit-transition: height 0.3s; /* Safari 和 Chrome */
      -o-transition: height 0.3s; /* Opera */
      flex: 1;
      .el-form {
        .el-form-item {
          margin-top: 10px!important;
        }
      }
    }
    &-btns {
      padding: 10px;
      top: 0;
      right: 0;
      .el-dropdown {
        margin-left: 10px;
      }
    }
  }
</style>
