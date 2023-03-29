<template>
  <el-scrollbar class="qk-detail-scrollbar">
    <div :class="detailClass" class="qk-detail">
      <div v-for="col in columns" :key="col.key" :class="[col.full ? 'qk-detail-item-full' : '']" class="qk-detail-item">
        <div :style="labelStyle" class="qk-detail-item-label">
          {{ getLabel(col.key) }}
        </div>
        <div :style="textStyle" class="qk-detail-item-text">
          <DetailTooltip :content="getText(col)" :filter="col.filter" />
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import DetailTooltip from './tooltip'

  function getMapKeys(arr, key) {
    const map = new Map()
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      map.set(item[key], item)
    }
    return map
  }
  export default {
    name: 'QkDetail',
    components: {
      DetailTooltip
    },
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        }
      },
      columns: {
        type: Array,
        default: () => {
          return []
        }
      },
      labelWidth: {
        type: String,
        default: () => {
          return '100px'
        }
      }
    },
    data() {
      return {
        colMap: null,
        splitNum: 2
      }
    },
    computed: {
      detailClass() {
        return `split-${this.splitNum}`
      },
      labelStyle() {
        let width = 100
        if (typeof this.labelWidth === 'string') {
          if (isNaN(Number(this.labelWidth))) {
            width = this.labelWidth
          } else {
            width = this.labelWidth + 'px'
          }
        }
        if (typeof this.labelWidth === 'number') {
          width = this.labelWidth + 'px'
        }
        return {
          width,
          minWidth: width
        }
      },
      textStyle() {
        return {
          width: `calc(100% - ${this.labelWidth})`
        }
      }
    },
    created() {
      this.colMap = getMapKeys(this.columns, 'key')
    },
    mounted() {
      if (this.$el.clientWidth > 1200) {
        this.splitNum = 3
      }
    },
    methods: {
      getLabel(key) {
        const item = this.colMap.get(key)
        if (item) {
          return item.label
        }
        return ''
      },
      getText(col) {
        const key = col.key
        const item = this.colMap.get(key)
        let val = this.data[key]
        if (item.options) {
          const find = item.options.find(item => item.value === val)
          val = find ? find.label : ''
        }
        if (val === null || val === undefined) {
          val = '--'
        } else {
          if (typeof val === 'string') {
            val = val || '--'
          } else if (typeof val === 'number') {
            val = val || '0'
          }
        }
        // 添加单位
        if ((val !== '0' && val !== '--') && col.unit) {
          val += col.unit
        }
        return val.toString()
      }
    }
  }
</script>

<style lang="scss" scoped>

  .qk-detail-scrollbar {
    width: 100%;
    max-height: 60vh;

    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
      max-height: 60vh;
      margin-bottom: 0!important;
    }
  }
  .qk-detail {
    height: 100%;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #E7EAEA;

    &.split-2 {
      .qk-detail-item {
        width: 50%;
        display: inline-block;
      }
    }

    &-item {
      height: 100%;
      border: 1px solid #E7EAEA;
      display: flex;
      align-items: center;

      >div {
        display: inline-flex;
        justify-content: left;
        align-items: center;
      }

      &-label {
        height: 100%;
        padding: 10px;
        text-align: center;
        background-color: #F8F8F9;
        color: #889090;
        font-size: 14px;
      }

      &-text {
        position: relative;
        color: #2D3B47;
        height: 100%;
        text-align: left;
        font-size: 14px;
      }

      &-full {
        width: 100%!important;
      }
    }
  }
</style>