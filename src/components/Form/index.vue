<template>
  <div class="qk-dialog-form-wrapper">
    <el-scrollbar>
      <div class="qk-dialog-form-body">
        <slot name="body">
          <el-form ref="form" v-bind="$attrs">
            <el-form-item v-for="item in filterItems" :class="[formItemSplit ? `form-item-split-${formItemSplit}` : '', item.config.formItemClass]" :label="showLabel(item)" v-bind="item.config.formItemProps" :label-width="item.config.formItemLabelWidth" :prop="item.field" :key="item.field">
              <QkDynamic v-model.trim="$attrs.model[item.field]" :tag="item.tag" :config="item.config" :childrens="item.childrens"/>
            </el-form-item>
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
  name: 'QkForm',
  props: {
    fields: {
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
    },
    formItemSplit: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    filterItems() {
      return this.fields.filter(item => !!item)
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
        max-height: 60vh;
      }
    }
  .qk-dialog-form-body {
    padding: 10px 30px 0px 20px;
    .el-form {
      .el-input .el-input__inner,.el-date-editor,.el-select  {
        width: 100%;
      }
      .el-textarea__inner {
        resize: none;
      }
      
      .el-form-item {
        display: inline-block;
      }
      .form-title {
        .el-form-item__content {
          margin-left: 0!important;
        }
      }
      .form-item-split-1 {
        width: 100%;
      }
      .form-item-split-2 {
        width: 50%;
      }
      .form-item-split-3 {
        width: 33%;
      }
      .form-is-full {
        display: block;
        width: 100%;
        .el-form-item__content {
          font-size: 18px;
        }
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
