# dialog 弹出层

## 基本用法
适用广泛的弹出层业务
::: demo
```
<template>
  <el-button class="test" @click="showDialog">弹出层</el-button>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      async showDialog() {
        const page = await import('./TestPage.vue')
        this.$qkDialog({
          title: '测试页面',
          components: page.default,
          props: { data: { text: '测试页面~~~~~' } },
          width: 690
        })
      }
    }
  }
</script>
```
:::
## Options
<table class="options-table">
    <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>title</td>
        <td>标题</td>
        <td>string</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>components</td>
        <td>内容</td>
        <td>VNode</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>props</td>
        <td>传入对象 components props接收的对象</td>
        <td>Object</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>width</td>
        <td>弹出层宽度</td>
        <td>string/number</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <td>onAction</td>
        <td>回调函数 参数为内容组件调用onAction时传入的参数</td>
        <td>function</td>
        <td>—</td>
        <td>—</td>
      </tr>
    </tbody>
  </table>