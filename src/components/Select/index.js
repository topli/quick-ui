import { merge, cloneDeep } from 'lodash'
import { Select } from 'element-ui'

export default {
  props: merge(
    cloneDeep(Select.props),
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
      this.showOptions = cloneDeep(this.options)
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
        on: merge(this.$listeners, { focus: () => { this.selectFoucs() } })
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
