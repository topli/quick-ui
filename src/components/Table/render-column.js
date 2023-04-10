export default {
  props: {
    renderContent: Function,
    scope: Object,
    prop: String,
    options: Array
  },
  data() {
    return {}
  },
  methods: {
    filterData() {
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
    const val = this.filterData()
    if (this.renderContent) {
      return this.renderContent(h, this.scope, val || {})
    } else {
      return h('span', val.label)
    }
  }
}
