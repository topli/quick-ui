import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/packages/theme-chalk/lib/index.css'

import QuickUi from '@c'

import router from '@/router'

Vue.config.productionTip = false

Vue.use(ElementUi)
Vue.use(QuickUi, { iconfont: 'qk-icon' })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
