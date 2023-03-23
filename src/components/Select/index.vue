<!--
<template>
  <div class="qk-select">
    <el-select
      v-model="selectValue"
      :loading="loading"
      :remote-method="remoteMethod"
      :filterable="filterable"
      :clearable="clearable"
      :multiple="multiple"
      :disabled="disabled"
      :collapse-tags="multiple"
      v-bind="$attrs"
      remote
      reserve-keyword
      @focus="selectFocus"
      @change="selectChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </div>
</template>
-->

<script>
import _ from 'loadsh'
import { Select } from 'element-ui'

export default {
  props: _.merge(
    _.cloneDeep(Select.props),
    {
      options: {
        type: Array,
        default: () => []
      },
      remoteQuery: {
        type: Function,
        default: () => null
      },
      optionProps: {
        type: Object,
        default: () => {
          return {
            value: 'value',
            label: 'label'
          }
        }
      }
    }
  ),
  data() {
    return {
      showOptions: []
    }
  },
  watch: {
    options: {
      handler: function(val) {
        if (!this.remote) {
          this.showOptions = val || []
        }
      },
      deep: true
    },
    value: {
      handler: function(val) {
        if (val && this.remote) this.remoteFunction('')
      },
      immediate: true
    }

  },
  created() {
    if (this.value && this.remote) {
      this.remoteFunction('')
    } else {
      this.showOptions = _.cloneDeep(this.options)
    }
  },
  methods: {
    remoteFunction(query) {
      setTimeout(() => {
        if (typeof query !== 'string') {
          query = ''
        }
        const promise = this.remoteQuery(query)
        if (!(promise && promise instanceof Promise)) {
          this.showOptions = []
          return
        }
        promise.then((data) => {
          if (data) {
            this.showOptions = data.map(item => {
              return {
                value: item[this.optionProps.value],
                label: item[this.optionProps.label]
              }
            })
          } else {
            this.showOptions = []
          }
        }).catch(() => {
          this.showOptions = []
        })
      }, 20)
    },
    selectFoucs() {
      if (this.remote) {
        if (!this.value) {
          this.showOptions = []
        }
      }
    }
  },
  render(h) {
    return h(
      'el-select',
      {
        props: { ...this._props, remoteMethod: this.remoteFunction },
        class: 'qk-select',
        on: _.merge(this.$listeners, { focus: () => { this.selectFoucs() } })
      },
      this.showOptions.map(item => {
        return h(
          'el-option',
          {
            props: {
              key: item.value,
              value: item.value,
              label: item.label
            }
          }
        )
      })
    )
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.qk-select{
  width: 100%
}
</style>
