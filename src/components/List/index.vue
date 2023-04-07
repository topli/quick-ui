<template>
  <div class="qk-list">
    <QkSearch v-if="search" v-bind="listSearch" @on-search="onSearch">
      <el-form :inline="true" :model="listSearch.formData">
        <template v-for="item in listSearch.fields">
          <el-form-item v-form-item-tooltip="item.label" :key="item.field">
            <QkDynamic
              v-model.trim="listSearch.formData[item.field]"
              :tag="item.tag"
              :config="item.config"
              :childrens="item.childrens"
            />
          </el-form-item>
        </template>
      </el-form>
      <template slot="btns">
        <el-button
          v-for="btn in listSearch.btns"
          :key="btn.icon || btn.text"
          :disabled="btn.disabled || false"
          round
          @click="btn.click"
        >
          <el-tooltip
            :disabled="!btn.icon"
            :content="btn.text"
            placement="top"
          >
            <div class="qk-search-btn">
              <i v-if="btn.icon" :class="`${iconfont} icon-${btn.icon}`"></i>
              <span v-else>{{ btn.text }}</span>
            </div>
          </el-tooltip>
        </el-button>
      </template>
    </QkSearch>
    <QkTable
      ref="qkTable"
      class="qk-table"
      :loading="loading"
      :data="table.data"
      :columns="table.columns"
      :selectable="table.selectable"
      :default-selections="table.defaultSeletions"
      v-bind="handlerProps(table.props)"
      v-on="handlerOn(table.on)"
    />
    <div class="qk-pagination">
      <el-pagination
        v-if="page"
        :current-page="listPage.num"
        :page-sizes="listPage.pageSize || [10, 20, 50]"
        :page-size="listPage.size"
        :total="listPage.totalElement"
        :layout="listPage.layout || 'total, sizes, prev, pager, next, jumper'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import _ from "loadsh";
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
        this.listSearch = {
          formData: {},
          fields: [],
          btns: [],
          pages: {},
        };
        this.listSearch = _.merge(val);
      },
      deep: true,
      immediate: true,
    },
    page: {
      handler: function (val) {
        this.listPage = {}
        this.listPage = _.merge(val)
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
      listPage: {}
    };
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
      return _.merge(
        {
          index: true,
          selection: false,
        },
        props || {}
      );
    },
    handlerOn(on) {
      return on;
    },
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
  /deep/.qk-table {
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