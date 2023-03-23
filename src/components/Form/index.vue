<template>
  <div class="qk-dialog-form-wrapper">
    <el-scrollbar>
      <div class="qk-dialog-form-body">
        <slot name="body">
          <el-form ref="form" v-bind="$attrs">
            <el-row>
              <el-col v-for="item in filterItems" :key="item.prop" :span="colSpan(item)">
                <el-form-item :label="showLabel(item)" :prop="item.prop" :key="item.prop">
                  <QkDynamic v-model.trim="$attrs.model[item.prop]" :tag="item.tag" :config="item.config" :childrens="item.childrens"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </slot>
      </div>
    </el-scrollbar>
    <div class="qk-dialog-form-footer">
      <el-button v-for="btn in btns" :key="btn.text" :type="btn.type" :loading="loading" @click="btn.click">{{ btn.text }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    btns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filterItems() {
      return this.items.filter(item => !!item)
    }
  },
  methods: {
    showLabel(item) {
      if (item.label) {
        return item.label
      }
      if (item.config && item.config.label) {
        return item.config.label
      }
      if (item.config && item.config.attrs && item.config.attrs.placeholder) {
        return item.config.attrs.placeholder
      }
      return ''
    },
    colSpan(item) {
      return item.config ? (item.config.span || 12) : 12
    }
  }
}
</script>
<style lang="scss">
.qk-dialog-form-wrapper {
  position: relative;
    .el-scrollbar {
      .el-scrollbar__wrap {
        overflow-x: hidden;
        margin-bottom: 0!important;
      }
    }
  .qk-dialog-form-body {
    padding: 20px 30px 0px 20px;
    max-height: 60vh;
    overflow: auto;
    .el-form {
      .el-input .el-input__inner,.el-date-editor,.el-select  {
        width: 100%;
      }
      .el-textarea__inner {
        resize: none;
      }
    }
  }
  .qk-dialog-form-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 25px;
    height: 60px;
    border-top: 1px solid #dcdfe6b6;
  }
}

</style>
