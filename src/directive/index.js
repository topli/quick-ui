/**
 *  描述：Global directive js
 */

import Vue from 'vue'
import formItemTooltip from './formItemTooltip'

const install = Vue => {
  // 悬浮提示
  Vue.directive('formItemTooltip', formItemTooltip)
}

var directive = { install }

Vue.use(directive)

export default install
