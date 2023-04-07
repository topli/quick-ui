export default {
  props: {
    renderContent: Function,
    scope: Object,
    prop: String,
    options: Array
  },
  data() {
    return {
      val: {
        value: '',
        label: ''
      }
    }
  },
  created() {
  },
  methods: {
    isChange() {
      // columns key is empty return false
      if (!this.prop) {
        return false
      }
      const newValue = this.scope.row[this.prop]
      const oldValue = this.val.value
      return !(String(newValue) === String(oldValue))
    },
    filterData() {
      // this.val = {}
      if (this.options) {
        const val = this.scope.row[this.prop]
        const find = this.options.find(item => item.value === val) || {}
        return find
      } else {
        return { label: this.scope.row[this.prop] }
      }
    }
  },
  render(h) {
    let val = this.val
    if (this.isChange()) {
      // rerender
      val = this.filterData()
    }
    if (this.renderContent) {
      return this.renderContent(h, this.scope, val || {})
    } else {
      return h('span', this.val.label)
    }
  }
}
