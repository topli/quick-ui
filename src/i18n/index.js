import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 引入业务自定义的语言包
const localCN = require('./locale/zh') // 简体
const localUS = require('./locale/en') // English
// 在这里引入moment了，所以不在main.js引入了
Vue.use(VueI18n);

// 语言包的类型合并
const messages = {
  'zh_CN': { ...localCN },
  'en_US': { ...localUS }
}
// localStorage获取当前语言类型(初次本地不存在'lang'字段存储，默认设置为'zh_CN')
const lang = localStorage.getItem('lang') || 'zh_CN'

export default new VueI18n({
  locale: lang, // set locale 
  messages: messages // set locale messages
});
