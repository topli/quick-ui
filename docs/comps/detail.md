# detail 详情页

## 基本用法
::: demo
```
<template>
  <QkDetail :columns="columns" :data="data" split="2"></QkDetail>
</template>

<script>
  export default {
    data() {
      const sex = [{value:1,label:'男'}, {value:1,label:'女'}]
      return {
        data: {
          userName: 'lisi',
          name: '李四',
          mobile: '123456789',
          identityCard: '987654321',
          qq: '66666',
          email: '66666@qq.com',
          address: '武汉市光谷APP广场',
          sex: 1
        },
        columns: [
          {
            key: "userName",
            label: "用户名",
            colSpan: 2
          },
          {
            key: "name",
            label: "姓名",
            full: true
          },
          {
            key: "mobile",
            label: "手机号"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "qq",
            label: "qq",
            colSpan: 2,
          },
          {
            key: "email",
            label: "电子邮箱"
          },
          {
            key: "address",
            label: "联系地址"
          },
          {
            key: "sex",
            label: "性别",
            options: sex
          }
        ]
      }
    },
    methods: {}
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
        <td>Function(action)</td>
        <td>—</td>
        <td>—</td>
      </tr>
    </tbody>
  </table>