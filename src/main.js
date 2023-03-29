import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import 'element-ui/packages/theme-chalk/lib/index.css'

import QuickUi from '@c'

import router from '@/router'

Vue.config.productionTip = false

Vue.use(QuickUi, { iconfont: 'qk-icon', elConfig: { size: 'small' } })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
