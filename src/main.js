import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import 'element-ui/packages/theme-chalk/lib/index.css'

import QuickUI from '@c'

import router from '@/router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(QuickUI, { iconfont: 'qk-icon' })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
