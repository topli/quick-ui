import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/packages/theme-chalk/lib/index.css'

// import QuickUI from '@c'
import QuickUI from '@/components/index.js'
// import QuickUI from '../lib/incar-quick-ui.umd.js'
// import '../lib/incar-quick-ui.css'

import router from '@/router'

Vue.config.productionTip = false
// default medium small mini
Vue.use(ElementUI)
Vue.use(QuickUI, { iconfont: 'qk-icon', searchBtnText: true })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
