<template>
  <div class="detail-text-tooltip">
    <el-tooltip v-if="showTooltip" :disabled="!showTooltip" :content="content" :open-delay="500">
      <div slot="content" class="detail-text-tooltip-content">
        {{ content }}
      </div>
      <div class="ellipsis"> {{ content }}</div>
    </el-tooltip>
    <div v-if="!showTooltip">
      <template v-if="filter">{{ handleComputed() }}</template>
      <template v-else>{{ content }}</template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [String, Number],
      default: ''
    },
    filter: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showTooltip: false
    }
  },
  watch: {
    content: {
      handler: function(val) {
        setTimeout(() => {
          this.compute()
        }, 0);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    compute() {
      if (this.$el.clientWidth < this.$el.scrollWidth) {
        this.showTooltip = true
      }
    }, // 过滤器
    handleComputed() {
      if (!this.content) return '--'
      return this.$options.filters[this.filter](Number(this.content)) || '--'
    }
  }
}
</script>

<style lang="scss">
.detail-text-tooltip {
  width: 100%;
  > div {
    word-break: keep-all;
  }
  &-content {
    max-width: 350px;
    overflow: hidden;
    word-break: break-all;
  }
}
.ellipsis {
  overflow:hidden; //超出的文本隐藏
  text-overflow:ellipsis; //溢出用省略号显示
  white-space:nowrap; //溢出不换行
}
</style>
