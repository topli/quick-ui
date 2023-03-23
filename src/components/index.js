// 此组件库依赖 element-ui
import QkDynamic from './Dynamic'
import QkTable from './Table'
import QkList from './List'
import QkSearch from './Search'
import QkSelect from './Select'
import QkForm from './Form'
import QkTabDetail from './TabDetail'
import QkDetail from './Detail'
import QkGroup from './Detail/detailGroup'
import QkText from './Text'
import QkDialog from './Dialog/index.js'

import * as QkUtils from '../utils/index'
import '../directive'

import '../styles/element-ui.scss'

// eslint-disable-next-line no-unused-vars
const install = function(Vue, options = {}) {
  // 静态方法
  if (install.installed) return
  install.installed = true
  // 全局组件
  Vue.component('QkDynamic', QkDynamic)
  Vue.component('QkTable', QkTable)
  Vue.component('QkList', QkList)
  Vue.component('QkSearch', QkSearch)
  Vue.component('QkSelect', QkSelect)
  Vue.component('QkForm', QkForm)
  Vue.component('QkGroup', QkGroup)
  Vue.component('QkTabDetail', QkTabDetail)
  Vue.component('QkDetail', QkDetail)
  Vue.component('QkText', QkText)
  // 调用组件
  Vue.prototype.$qkDialog = QkDialog
  Vue.prototype.$qkUtils = QkUtils
}

export default {
  install,
  QkDynamic,
  QkTable,
  QkSearch,
  QkList,
  QkSelect,
  QkForm,
  QkGroup,
  QkTabDetail,
  QkDetail
}
