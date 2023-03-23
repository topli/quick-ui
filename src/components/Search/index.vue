<template>
  <div class="qk-search-wrapper">
    <div id="qk-search-form" :style="style" class="qk-search-form" @keyup.enter="onSearch">
      <slot/>
    </div>
    <div class="qk-search-btns-wrapper">
      <div class="btns">
        <el-button v-if="showMore" :icon="toggleFromIcon" class="btn-more-item" type="text" @click="openSearchFun"/>
        <el-button class="qk-search" type="primary" round @click="onSearch">
          <div class="qk-search-btn">
            <i class="el-icon-search"></i>
          </div>
        </el-button>
        <slot name="btns"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paddingRight: {
      type: String,
      default: '135'
    }
  },
  data() {
    return {
      toggleOpen: false,
      formHeight: 0
    }
  },
  computed: {
    showMore() {
      return this.formHeight > 60
    },
    style() {
      const defStyle = {}
      if (this.toggleOpen) {
        defStyle.height = this.formHeight + 'px'
      } else {
        defStyle.height = '50px'
      }
      return defStyle
    },
    btnStyle() {
      const defStyle = { width: this.paddingRight + 'px' }
      return defStyle
    },
    toggleFromIcon() {
      return this.toggleOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    text() {
      return this.toggleOpen ? '收起' : '更多'
    }
  },
  mounted() {
    this.getFormHeight()
    const searchForm = document.getElementById('qk-search-form')
    searchForm.addEventListener('transitionend', (e) => {
      if (e.target === searchForm) {
        var myEvent = new Event('resize')
        window.dispatchEvent(myEvent)
      }
    })
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
        } else {
          this.formHeight = 58
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
  .qk-search-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .qk-search-form {
    min-width: 135px;
    overflow: hidden;
    transition: height 0.3s;
    -moz-transition: height 0.3s; /* Firefox 4 */
    -webkit-transition: height 0.3s; /* Safari 和 Chrome */
    -o-transition: height 0.3s; /* Opera */
  }
  .qk-search-btns-wrapper {
    text-align: right;
    .btns {
      display: flex;
    }
    .btn-more-item {
      font-size: 1rem;
    }
    .el-dropdown {
      margin-left: 10px;
    }
    .qk-search-btn {
      display: flex;
      align-items: center;
      i {
        // margin-right: 2px;
      }
    }
  }
</style>
