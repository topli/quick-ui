<template>
  <el-scrollbar class="qk-detail-scrollbar">
    <div ref="detailWrapper" class="qk-detail">
      <div v-for="col in columns" :key="col.key" :style="itemStyle(col)" class="qk-detail-item">
        <div :style="labelStyle" class="qk-detail-item-label">
          {{ getLabel(col.key) }}
        </div>
        <div :style="contentStyle" class="qk-detail-item-content">
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
      split: {
        type: [String, Number],
        default: 2
      },
      labelWidth: {
        type: [String, Number],
        default: 100
      }
    },
    data() {
      return {
        colMap: null,
        itemWidth: 0
      }
    },
    computed: {
      itemStyle() {
        return function (col) {
          let width = this.itemWidth
          if (col.colSpan) {
            width = col.colSpan * this.itemWidth
          }
          return {
            width: width + '%'
          }
        }
      },
      labelStyle() {
        let width = this.convertWidth(this.labelWidth)
        return {
          width,
          minWidth: width
        }
      },
      contentStyle() {
        let width = this.convertWidth(this.labelWidth)
        return {
          width: `calc(100% - ${width})`
        }
      }
    },
    created() {
      this.colMap = getMapKeys(this.columns, 'key')
    },
    mounted() {
      this.computeItemWidth()
    },
    methods: {
      computeItemWidth() {
        this.itemWidth = 100 / this.split
      },
      convertWidth (width) {
        if (typeof width === 'string') {
          if (isNaN(Number(width))) {
            return width
          } else {
            return width + 'px'
          }
        }
        if (typeof width === 'number') {
          return width + 'px'
        }
      },
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
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #E7EAEA;
    &-item {
      border: 1px solid #E7EAEA;
      display: flex;
      align-items: center;
      &:last-child{
        flex: 1;
      }
      &-label {
        height: 100%;
        padding: 10px;
        text-align: left;
        background-color: #F8F8F9;
        color: #889090;
        font-size: 14px;
      }

      &-content {
        height: 100%;
        flex: 1;
        position: relative;
        color: #2D3B47;
        text-align: left;
        font-size: 14px;
      }
    }
  }
</style>