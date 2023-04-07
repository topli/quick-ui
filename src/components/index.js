// 此组件库依赖 element-ui
import QkDynamic from './Dynamic'
import QkTable from './Table'
import QkList from './List'
import QkSearch from './Search'
import QkForm from './Form'
import QkTabDetail from './TabDetail'
import QkDetail from './Detail'
import QkText from './Text'
import QkDialog from './Dialog/index.js'

import * as QkUtils from '../utils/index'

import * as directives from '../directives'

import '../styles/element-ui.scss'

const components = [
  QkDynamic,
  QkTable,
  QkSearch,
  QkList,
  QkForm,
  QkDetail,
  QkTabDetail,
  QkText
];

const install = function (Vue, config = {}) {
  // 静态方法
  if (install.installed) return
  install.installed = true
  // 全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Object.keys(directives).forEach(key => {
    if (directives[key])
      Vue.directive(key, directives[key])
  })
  
  Vue.prototype.$qkDialog = QkDialog
  Vue.prototype.$qkUtils = QkUtils
  Vue.prototype.$qkConfig = config
}

export default {
  install,
  ...components
}
