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
        const val = this.val.value = this.scope.row[this.prop]
        const find = this.options.find(item => item.value === val) || {}
        // this.val = Object.assign(this.val, find)
        this.val.label = find.label || ''
        this.val.value = find.value || val
      } else {
        this.val.label = this.scope.row[this.prop]
      }
    }
  },
  render(h) {
    if (this.isChange()) {
      // rerender
      this.filterData()
    }
    return (this.renderContent ? this.renderContent(h, this.scope, this.val || {}) : (<span> { this.val.label }</span>))
  }
}
