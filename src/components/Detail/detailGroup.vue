<template>
  <div class="table-detail-group">
    <el-row v-for="(group, index) in groups" :key="index" class="group-row">
      <div class="group-header">
        <div class="title">{{ group.title }}</div>
      </div>
      <div class="group-body clearfix">
        <template v-if="group.data && group.data.length">
          <template v-for="(data_item, data_index) in group.data">
            <div :key="data_index" class="group-item clearfix">
              <template v-for="(col, col_index) in group.columns">
                <el-col :span="(col.span || col.span === 0)? col.span : 12" :key="data_index + col.key" >
                  <div :key="data_index + col.key" :class="`table-detail-item-c-${col_index}`" class="table-detail-item">
                    <div :style="labelStyle" class="table-detail-item-label">{{ col.label }}</div>
                    <div :style="textStyle" class="table-detail-item-text">
                      <template v-if="col.type === 1">
                        <!-- html内容渲染 -->
                        <div class="detail-text-tooltip" v-html="getText(col, data_item)"></div>
                      </template>
                      <DetailTooltip v-else :content="getText(col, data_item)" :filter="col.filter"/>
                    </div>
                  </div>
                </el-col>
              </template>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="group-item clearfix">
            <template v-for="(col, index) in group.columns">
              <el-col :span="col.span || 12" :key="col.key" >
                <div :key="col.key" :class="'table-detail-item' + index" class="table-detail-item">
                  <div :style="labelStyle" class="table-detail-item-label">{{ col.label }}</div>
                  <div :style="textStyle" class="table-detail-item-text">
                    <!-- type：1自定义html -->
                    <template v-if="col.type === 1">
                      <div class="detail-text-tooltip" v-html="getText(col)"></div>
                    </template>
                    <DetailTooltip v-else :content="getText(col)" :filter="col.filter"/>
                  </div>
                </div>
              </el-col>
            </template>
          </div>
        </template>
      </div>
    </el-row>
  </div>
</template>

<script>
import DetailTooltip from './tooltip'

export default {
  components: {
    DetailTooltip
  },
  props: {
    data: { type: Object, default: () => { return {} } },
    groups: { type: Array, default: () => { return [] } },
    labelWidth: { type: String, default: () => { return '100px' } }
  },
  data() {
    return {
      colMap: null,
      splitNum: 2
    }
  },
  computed: {
    formClass() {
      return `split-${this.splitNum}`
    },
    labelStyle() {
      return {
        width: this.labelWidth || '100px'
      }
    },
    textStyle() {
      return {
        width: `calc(100% - ${this.labelWidth})`
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    getText(col, data_item) {
      const key = col.key
      const item = col
      const data = data_item || this.data
      let val = data[key]
      if (item.options) {
        const find = item.options.find(item => item.value === val)
        val = find ? find.label : ''
      }
      if (typeof val === 'undefined') {
        val = '--'
      } else {
        if (typeof val === 'string') {
          val = val || '--'
        } else if (typeof val === 'number') {
          val = val || '0'
        }
      }
      return val.toString()
    }
  }
}
</script>

<style lang="scss" >
.table-detail-group {
  padding: 15px;
  max-height: 66vh;
  overflow: auto;
  // border: 1px solid #fff;
  .group-row {
    margin-bottom: 20px;
    border-bottom: 1px solid #E7EAEA;
    .group-header {
      display: flex;
      align-items: center;
      height: 40px;
      background: #F8F8F9;
      border-top: 1px solid #E7EAEA;
      // border-bottom: 1px solid #E7EAEA;
      padding-left: 10px;
      .title {
        font-size: 14px;
        font-weight: bold;
        color:rgb(127, 127, 127);
      }
    }
    .group-body {
      .group-item {
        border-bottom: 2px solid #E7EAEA;
      }
    }
  }

  &-item {
    // width: calc(50% - 4px);
    border-left: 0;
    border-right: 0;
    border-top: 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E7EAEA;
    > div {
      display: inline-flex;
      justify-content: left!important;
      align-items: center;
    }
    &-label {
      height: 100%;
      padding: 10px;
      // text-align: left;
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
  }
  .table-detail-item:nth-child(-n+2) {
    border-top: 1px solid #E7EAEA;
  }
}
</style>
