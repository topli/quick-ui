const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: { // 配置webpack
    resolve: {
      // extensions:[], // 后缀名省略配置
      alias: {
        '@c': '@/components'
      }
    },
    externals: process.env.NODE_ENV === 'production' ? {
      vue: 'vue',
      lodash: 'lodash',
      'element-ui': "element-ui"
    } : {}
  }
})
