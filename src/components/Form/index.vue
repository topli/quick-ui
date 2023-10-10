<template>
  <div v-loading="loading" class="qk-dialog-form-wrapper">
    <el-scrollbar>
      <div class="qk-dialog-form-body">
        <slot name="body">
          <el-form ref="form" v-bind="getFormProps" :style="formStyle">
            <el-form-item
              v-for="item in filterItems"
              v-bind="item.formItemProps"
              :style="formItemStyle(item.formItemProps)"
              :label="showLabel(item)"
              :prop="item.field"
              :key="item.field">
              <QkDynamic :model="$props.model" :field="item.field" :tag="item.tag" :config="item.config" :childrens="item.childrens"/>
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
import { Form } from 'element-ui'
import { merge, cloneDeep } from 'lodash'
// 原Form props
const orginProps = cloneDeep(Form.props)
// 自定义props
const customProps = {
  fields: {
    type: Array,
    default: () => []
  },
  btns: {
    type: Array,
    default: () => []
  },
  column: {
    type: [String, Number],
    default: 2
  },
  loading: {
    type: Boolean,
    default: false
  }
}


export default {
  name: 'QkForm',
  props: merge(orginProps, customProps),
  computed: {
    filterItems() {
      return this.fields.filter(item => !!item)
    },
    getFormProps() {
      const keys = Object.keys(Form.props)
      const newProps = {}
      keys.forEach(k => {
        newProps[k] = this.$props[k]
      })
      return newProps
    },
    formStyle() {
      return {
        'grid-template-columns': `repeat(${this.column}, auto)`
      }
    }
  },
  mounted() {},
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
    formItemStyle(formItemProps) {
      if (!formItemProps || !formItemProps.span) return {}
      let gridColumnEnd = 1
      if (formItemProps.span === 'full') {
        gridColumnEnd = `span ${this.column}`
      } else {
        gridColumnEnd = `span ${formItemProps.span}`
      }
      return {
        gridColumnEnd
      }
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
    padding: 20px 30px;
    .el-form {
      display: grid;
      grid-column-gap: 20px;
      .el-input .el-input__inner,.el-date-editor,.el-select  {
        width: 100%;
      }
      .el-textarea__inner {
        resize: none;
      }
      
      .el-form-item {
        display: inline-block;
        .el-form-item__label {
          line-height: 1;
        }
      }
      .form-item-title {
        padding: 8px 0;
        font-weight: 600;
        margin-bottom: 6px;
        .el-form-item__content {
          margin-left: 0!important;
          line-height: 1.5;
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
