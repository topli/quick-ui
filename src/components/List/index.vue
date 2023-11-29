<template>
  <div class="qk-list">
    <QkSearch v-if="search" @on-search="onSearch">
      <el-form :inline="true" :model="listSearch.formData">
        <template v-for="item in listSearch.fields">
          <el-form-item :key="item.field">
            <QkDynamic :model="listSearch.formData" :placeholder-mode="listSearch.placeholderMode" :field="item.field"
              :tag="item.tag" :config="item.config" :childrens="item.childrens" />
          </el-form-item>
        </template>
      </el-form>
      <template slot="btns">
        <el-button v-for="btn in listSearch.btns" :key="btn.icon || btn.text" :disabled="btn.disabled" @click="btn.click"
          :type="btn.type || 'primary'">
          <el-tooltip :disabled="!btn.icon" :content="btn.text" placement="top">
            <div class="qk-search-btn">
              <i v-if="btn.icon" :class="`${iconfont} icon-${btn.icon}`"></i>
              <span v-else>{{ btn.text }}</span>
            </div>
          </el-tooltip>
        </el-button>
      </template>
    </QkSearch>
    <QkTable ref="qkTable" class="qk-table" :height="tableHeight" :loading="loading" :data="table.data"
      :columns="table.columns" :selectable="table.selectable" :default-selections="table.defaultSeletions"
      v-bind="handlerProps(table.props)" v-on="handlerOn(table.on)" />
    <div v-if="page" class="qk-pagination">
      <el-pagination :current-page="listPage.num" :page-sizes="listPage.pageSize || [10, 20, 50]"
        :page-size="listPage.size" :total="listPage.totalElement"
        :layout="listPage.layout || 'total, sizes, prev, pager, next, jumper'" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import {
  merge
} from "loadsh";
export default {
  name: 'QkList',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Object,
      default: () => {
        return null;
      },
    },
    table: {
      type: Object,
      default: () => {
        return {
          data: [],
          columns: [],
          props: {},
        };
      },
    },
    page: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  watch: {
    search: {
      handler: function (val) {
        this.listSearch = merge(val || {
          formData: {},
          fields: [],
          btns: [],
          pages: {},
        });
      },
      deep: true,
      immediate: true,
    },
    page: {
      handler: function (val) {
        this.listPage = merge(val || {})
      },
      deep: true,
      immediate: true,
    }
  },
  computed: {
    iconfont() {
      return this.$qkConfig && this.$qkConfig.iconfont
    }
  },
  data() {
    return {
      listSearch: {
        formData: {},
        fields: [],
        btns: [],
        pages: {},
      },
      listPage: {},
      tableHeight: 300
    };
  },
  mounted() {
    this.setTableHeight()
  },
  methods: {
    onSearch() {
      this.listPage.num = 1;
      this.$emit("on-search", this.listSearch, this.listPage);
    },
    handleSizeChange(val) {
      this.listPage.size = val;
      this.$emit("on-search", this.listSearch, this.listPage);
    },
    handleCurrentChange(val) {
      this.listPage.num = val;
      this.$emit("on-search", this.listSearch, this.listPage);
    },
    handleSelectionChange(val) {
      this.$emit("on-checked", val);
    },
    handlerProps(props) {
      return merge({
        index: true,
        selection: false,
      },
        props || {}
      );
    },
    handlerOn(on) {
      return on;
    },
    setTableHeight() {
      const that = this
      const table = document.getElementsByClassName('qk-table')[0]
      function onResize(e) {
        that.tableHeight = e[0].target.clientHeight
      }
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(table);
    }
  },
};
</script>
<style lang="scss" scoped>
.qk-list {
  position: relative;
  padding: 1rem 1.5rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  :deep .qk-table {
    flex: 1;

    .el-table__fixed-right {
      &::before {
        display: none;
      }
    }
  }

  .qk-pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>