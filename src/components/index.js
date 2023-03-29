// 此组件库依赖 element-ui
import ElementUI from 'element-ui'
import QkDynamic from './Dynamic'
import QkTable from './Table'
import QkList from './List'
import QkSearch from './Search'
import QkSelect from './Select'
import QkForm from './Form'
import QkTabDetail from './TabDetail'
import QkDetail from './Detail'
import QkText from './Text'
import QkDialog from './Dialog/index.js'

import * as QkUtils from '../utils/index'

import '../directive'

import '../styles/element-ui.scss'


const components = [
  QkDynamic,
  QkTable,
  QkList,
  QkSearch,
  QkSelect,
  QkForm,
  QkDetail,
  QkTabDetail,
  QkText,
  QkTable,
  QkDialog
];


const install = function (Vue, config = {}) {
  // 静态方法
  if (install.installed) return
  install.installed = true
  Vue.use(ElementUI, config.elConfig || {})
  // 全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // 调用组件
  Vue.prototype.$qkDialog = QkDialog
  Vue.prototype.$qkUtils = QkUtils
  Vue.prototype.$qkConfig = config
}

export default {
  install,
  ...components
}