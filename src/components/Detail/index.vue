<template>
  <el-scrollbar class="qk-detail-scrollbar">
    <div ref="detailWrapper" class="qk-detail">
      <div class="qk-detail-wrapper" :style="wrapperStyle">
        <div v-for="col in fields" :key="col.key" :style="itemStyle(col)" class="qk-detail-item">
          <div :style="labelStyle" class="qk-detail-item-label">
            {{ getLabel(col.key) }}
          </div>
          <div :style="contentStyle" class="qk-detail-item-content">
            <render-column
              v-if="col.render"
              :render-content="col.render"
              :scope="{row: data}"
              :prop="col.key"/>
            <DetailTooltip v-else :content="getText(col)" :filter="col.filter" :emptyText="emptyText || col.emptyText" />
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import RenderColumn from '../Table/render-column'
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
      DetailTooltip,
      RenderColumn
    },
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        }
      },
      fields: {
        type: Array,
        default: () => {
          return []
        }
      },
      column: {
        type: [String, Number],
        default: 2
      },
      labelWidth: {
        type: [String, Number],
        default: 100
      },
      emptyText: {
        type: String,
        default: '--'
      }
    },
    data() {
      return {
        colMap: null
      }
    },
    computed: {
      wrapperStyle() {
        return {
          'grid-template-columns': `repeat(${this.column}, ${100/this.column}%)`
        }
      },
      itemStyle() {
        return function (col) {
          if (!col || !col.span) return {}
          let gridColumnEnd = 1
          if (col.span === 'full') {
            gridColumnEnd = `span ${this.column}`
          } else {
            gridColumnEnd = `span ${col.span || 1}`
          }
          return {
            gridColumnEnd
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
      this.colMap = getMapKeys(this.fields, 'key')
    },
    mounted() {
    },
    methods: {
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
        let val = this.data[key]
        if (col.filter) {
          return val
        }
        const item = this.colMap.get(key)
        if (item.options) {
          const find = item.options.find(item => item.value === val)
          val = find ? find.label : ''
        }
        if (val === null || val === undefined) {
          val = this.emptyText
        } else {
          if (typeof val === 'string') {
            val = val || this.emptyText
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

    :deep .el-scrollbar__wrap {
      overflow-x: hidden;
      max-height: 60vh;
      margin-bottom: 0!important;
    }
  }
  .qk-detail {
    padding: 15px;
    &-wrapper {
      display: grid;
      width: 100%;
      height: 100%;
      border: 1px solid #E7EAEA;
      border-left: 0;
      border-bottom: 0;
    }
    &-item {
      border-left: 1px solid #E7EAEA;
      border-bottom: 1px solid #E7EAEA;
      display: flex;
      align-items: center;
      flex-grow: 1;
      &-label {
        height: 100%;
        padding: 10px;
        text-align: left;
        background-color: #F8F8F9;
        color: #889090;
        font-size: 14px;
      }

      &-content {
        padding: 10px;
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