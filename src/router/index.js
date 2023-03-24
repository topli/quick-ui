import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/views/table'

const routes = [
  { path: '/table', component: Table },
]
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

export default router