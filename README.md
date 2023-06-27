# incar-quick-ui

<!-- 在线文档 [https://hsian.github.io/vc-dist/index.html#/component/button](https://hsian.github.io/vc-dist/index.html#/component/button) -->

## 使用

```shell
# 安装依赖
npm i incar-quick-ui -S | yarn add incar-quick-ui -S
```

```shell
# main.js
import QuickUI from 'incar-quick-ui'

Vue.use(QuickUI, { iconfont: 'qk-icon', searchBtnText: true })
```


## 关于通用组件库 ##
- 组件库依赖(高度依赖element-ui)
- 组件库的的UI主题(可自定义主题)
- 字典值的简易使用(设置字典数据，根据类型自动匹配)
### 组件库的目的 ###

组件项目通常源于业务方的需求，大部分项目后台管理系统都会有很多复用的地方，复用的地方抽离出来封装为一个组件，在需要的地方调用。 

- 统一视觉样式和产品体验，
- 方便维护和扩展
