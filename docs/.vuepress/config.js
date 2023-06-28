// const path = require('path')
module.exports = {
  theme: '',
  title: 'incar-quick-ui',
  description: 'incar-quick-ui快速搭建高性能后台业务系统',
  base: '/',
  port: '8080',
  themeConfig: {
    nav: [ // 配置顶部导航栏
      {
        text: '组件',
        link: '/comps/'
      }
    ],
    sidebar: ['/comps/', '/comps/table.md', '/comps/list.md', '/comps/form.md', '/comps/dialog.md']
  },
  head: [],
  plugins: ['demo-container'], // 配置插件
  markdown: {}
}