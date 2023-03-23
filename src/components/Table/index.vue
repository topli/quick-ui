<template>
  <transition name="fade">
    <el-table
      v-loading="tableLoading"
      ref="qkTable"
      v-bind="$attrs"
      :data="tableData"
      :height="$attrs.height ? $attrs.height : tableHeight"
      style="width: 100%"
      v-on="$listeners">
      <el-table-column
        v-if="selection"
        :selectable="selectable"
        fixed
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        v-if="index"
        label="序号"
        type="index"
        align="center"
        class-name="table-index"
        width="70"/>
      <template v-for="col in columns">
        <el-table-column
          v-if="!!col"
          v-bind="col"
          :key="col.key"
          :show-overflow-tooltip="showOverflowTooltip(col)"
          filter-placement="bottom">
          <template slot-scope="scope">
            <render-column
              v-if="col.render || col.options"
              :render-content="col.render"
              :scope="scope"
              :prop="col.key"
              :options="col.options"/>
            <span v-else-if="col.filter">
              {{ handleComputed(col.filter, scope.row[col.key]) }}
            </span>
            <span v-else>
              {{ scope.row[col.key] }}
            </span>
          </template>
        </el-table-column>
      </template>
      <template slot="empty">
        <div class="empty-state">
          <p>暂无数据</p>
        </div>
      </template>
    </el-table>
  </transition>
</template>

<script>
import renderColumn from './render-column'
export default {
  name: 'QkTable',
  components: { renderColumn },
  props: {
    selection: { type: Boolean, default: false }, // 显示/隐藏勾选框
    index: { type: Boolean, default: false }, // 显示/隐藏序号
    columns: { type: Array, required: true }, // 列配置
    loading: { type: Boolean, default: false }, // 加载状态
    selectable: { type: Function, default: () => { return true } },
    defaultSelections: { type: Array, default: () => [] } // 默认够选数据ID
  },
  data() {
    return {
      tableHeight: 0,
      tableData: [],
      selectionChange: () => {}
    }
  },
  computed: {
    tableLoading() {
      return this.loading
    }
  },
  watch: {
    '$attrs.data': {
      handler: function(val) {
        this.tableData = val
        if (this.selection) {
          this.$nextTick(() => {
            this.setDefaultSelections()
          })
        }
      },
      deep: true,
      immediate: true
    },
    defaultSelections: {
      handler: function() {
        if (this.selection) {
          this.$nextTick(() => {
            this.setDefaultSelections()
          })
        }
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.setTableHeight)
    this.setTableHeight()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setTableHeight)
  },
  methods: {
    // 过滤器
    handleComputed(filterName, value) {
      return this.$options.filters[filterName](value) || '--'
    },
    setTableHeight() {
      // document.body.clientHeight 窗口大小
      // this.$el.offsetTop 表格离浏览器窗口顶部的距离
      // 70 分页部分高度
      this.$nextTick(() => {
        const clientHeight = this.$el.offsetParent ? this.$el.offsetParent.clientHeight : this.$el.clientHeight
        this.tableHeight = this.height || clientHeight - this.$el.offsetTop - 70
        // 设置默认高度
        if (this.tableHeight < 1) {
          this.tableHeight = 400
        }
        this.$refs.qkTable && this.$refs.qkTable.doLayout()
      })
    },
    setDefaultSelections() {
      if (this.defaultSelections && this.defaultSelections.length) {
        if (this.tableData && this.tableData.length) {
          for (let i = 0; i < this.tableData.length; i++) {
            const item = this.tableData[i]
            if (this.defaultSelections.includes(item.id)) {
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
    opacity: 1; /*初始状态 透明度为0*/
	}
	20%{
		opacity: .7;
	}
	50% {
		opacity: .5; /*中间状态 透明度为0.5*/
	}
	70%{
		opacity: .2;
	}
	100% {
		opacity: 0; /*结尾状态 透明度为1*/
	}
}
[class*="el-table__row--level"]{
  animation: fadeIn 1s ease
}
</style>
