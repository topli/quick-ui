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
    externals: {
      vue: 'Vue',
      lodash: '_',
      'element-ui': 'ELEMENT'
    }
  }
})
