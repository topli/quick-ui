<template>
  <transition name="fade">
    <el-table v-loading="tableLoading" ref="qkTable" v-bind="$props" :data="tableData" style="width: 100%"
      v-on="$listeners">
      <el-table-column v-if="selection" :selectable="$props.selectable" fixed type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column v-if="index" :label="indexLabel" type="index" align="center" class-name="table-index" width="70" />
      <template v-for="col in columns">
        <el-table-column v-if="!!col" v-bind="col" :prop="col.key" :column-key="col.key"
          :show-overflow-tooltip="showOverflowTooltip(col)">
          <template slot-scope="scope">
            <render-column v-if="col.render || col.options" :render-content="col.render" :scope="scope" :prop="col.key"
              :options="col.options" />
            <span v-else-if="col.filter">
              {{ filterValue(col.filter, getValueByPath(scope.row, col.key)) }}
            </span>
            <span v-else>
              {{ showValue(getValueByPath(scope.row, col.key)) }}
            </span>
          </template>
        </el-table-column>
      </template>
      <template slot="empty">
        <div class="empty-state">
          <p>{{ emptyText }}</p>
        </div>
      </template>
    </el-table>
  </transition>
</template>

<script>
import { Table } from 'element-ui'
import _ from 'lodash'
import renderColumn from './render-column'
import { getObjType, getValueByPath } from '@/utils'

export default {
  name: 'QkTable',
  components: { renderColumn },
  props: _.merge(_.cloneDeep(Table.props), {
    selection: { type: Boolean, default: false }, // 显示/隐藏勾选框
    index: { type: Boolean, default: false }, // 显示/隐藏序号
    indexLabel: { type: String, default: '#' }, // 默认序号
    emptyText: { type: String, default: '暂无数据'},
    columns: { type: Array, required: true }, // 列配置
    loading: { type: Boolean, default: false }, // 加载状态
    defaultSelected: { type: Array, default: () => null }, // 默认选中状态   配合 row-key 使用

  }),
  data() {
    return {}
  },
  computed: {
    tableLoading() {
      return this.loading
    },
    tableData() {
      return this.data
    }
  },
  watch: {
    defaultSelected: {
      handler: function (val) {
        if (this.selection) {
          this.$nextTick(() => {
            this.setDefaultSelected()
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getValueByPath: getValueByPath,
    // 过滤器
    filterValue(filterName, value) {
      return this.$options.filters[filterName](value) || ''
    },
    showValue(value) {
      const type = getObjType(value)
      if (type === '[object Array]') {
        return value.join(',')
      }
      return value
    },
    setDefaultSelected() {
      if (this.defaultSelected && this.defaultSelected.length) {
        if (this.tableData && this.tableData.length) {
          for (let i = 0; i < this.tableData.length; i++) {
            const item = this.tableData[i]
            let value = (typeof this.rowKey === 'function') ? this.rowKey(item) : item[this.rowKey || 'id']
            if (value && this.defaultSelected.includes(value)) {
              this.$refs.qkTable && this.$refs.qkTable.toggleRowSelection(item, true)
            }
          }
        }
      }
    },
    showOverflowTooltip(col) {
      return !(!col.key || col.key === 'buttons')
    }
  }
}
</script>

<style lang="scss">
/*动画效果*/
@-webkit-keyframes fadeIn {
  0% {
    opacity: 1;
    /*初始状态 透明度为0*/
  }

  20% {
    opacity: .7;
  }

  50% {
    opacity: .5;
    /*中间状态 透明度为0.5*/
  }

  70% {
    opacity: .2;
  }

  100% {
    opacity: 0;
    /*结尾状态 透明度为1*/
  }
}

[class*="el-table__row--level"] {
  animation: fadeIn 1s ease
}
</style>
