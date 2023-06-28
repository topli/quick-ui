# 安装

## npm安装

npm i incar-quick-ui -S

## yarn安装

推荐使用 yarn 的方式安装，它能更好快、更稳定安装依赖包。

yarn add incar-quick-ui -S

## 使用

```shell
# main.js
import QuickUI from 'incar-quick-ui'
# iconfont 引入的字体库
Vue.use(QuickUI, { iconfont: 'qk-icon', searchBtnText: true })
```