# form 表单

## 基本用法
::: demo
```
<template>
  <QkForm ref="quickForm" label-position="top" column="3" :rules="rules" :model="form" :fields="fields" :btns="btns" />
</template>

<script>
  
  export default {
    data() {
      const full = {
        span: 'full'
      }
      const { formField, formFieldGroup, formTitle, changeFieldsByProp } = this.$qkUtils
      const notNull = { required: true, message: '不能为空' }

      const sex = [{value: 1, label: '男'},{value: 2, label: '女'}]

      const orgType = [{value: 1, label: '厂家'},{value: 2, label: '供应商'}]
      return {
        rules: {
          userName: [
            notNull
          ],
          name: [
            // notNull,
            // lengthRange(2, 20)
          ],
          identityCard: [
            // notNull,
            // identityCard
          ],
          sex: notNull,
          'org.type': notNull,
          // orgId: notNull,
          mobile: [
            notNull,
            // phone
          ],
          // email: [email, maxLength(60)]
        },
        form: {
          userName: '',
          org: {}
        },
        fields: [
          formTitle('基础数据').setFIP(full), // setFIP、setProps (V2.2.0)
          formField('userName', '用户名'),
          formField('name', '姓名'),
          formField('mobile', '手机号'),
          formField('identityCard', '身份证'),
          formFieldGroup('sex', '性别', sex),
          formFieldGroup('org.type', '机构类型', orgType),
          formField('qq', 'qq'),
          formField('email', '电子邮箱'),
          formField('address', '联系地址').setProps({ type: 'textarea' }).setFIP(full) // setFIP、setProps (V2.2.0)
        ],
        btns: [
          { text: '取消', click: () => this.onClose() },
          { text: '确定', type: 'primary', click: this.submit }
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
      <td>column</td>
      <td>每行formItem的数量</td>
      <td>number</td>
      <td></td>
      <td>2</td>
    </tr>
    <tr>
      <td>rules</td>
      <td>表单验证(同ElementUI表单验证)</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>form</td>
      <td>表单绑定对象</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>fields</td>
      <td>表单字段</td>
      <td>Array</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>btns</td>
      <td>按钮</td>
      <td>Array</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>其他参数</td>
      <td>支持ElementUI Form组件其他参数</td>
      <td>any</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

### fields
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
      <td>field</td>
      <td>字段</td>
      <td>string</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>tag</td>
      <td>动态（标签名/组件）</td>
      <td>string/VNode</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>props</td>
      <td>支持ElementUI FormItem组件其他参数</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>config</td>
      <td>tag动态标签配置项</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>childrens</td>
      <td>tag动态标签子级</td>
      <td>Array</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

### childrens
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
      <td>tag</td>
      <td>动态（标签名/组件）</td>
      <td>string/VNode</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>props</td>
      <td>动态组件其他参数</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>config</td>
      <td>tag动态组件配置项</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>