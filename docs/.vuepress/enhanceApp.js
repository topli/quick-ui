import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import QuickUI from '../../lib/incar-quick-ui.umd'
import '../../lib/incar-quick-ui.css'
import './public/common.scss'
import '../../src/asset/font/iconfont.css'

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
    Vue.use(QuickUI, { iconfont: 'qk-icon', searchBtnText: true })
  }
}