# incar-quick-ui

框架描述...

## 渲染函数 & JSX

编写某些组件用到了render函数&jsx的方式，不熟悉的小朋友可以看看vue官方文档里的[渲染函数 & JSX]( https://v2.cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

## UI组件

### QkForm表单组件

```js
<QkForm
	ref="quickForm"
	form-item-split="2"
    :rules="rules"
    :model="form"
    :fields="fields"
    :btns="btns"
	label-width="100px"
/>
```

#### QkForm表单组件的属性

**form-item-split**：一行的列数

**rules**：表单验证规则

**model**：双向绑定的数据，类似于vue的v-model

**fields**：表单字段，数组类型，每个字段采用rend函数的写法，其中有两种写法：



- `formTitle(title, config = {})`：该组表单的标题，生成简单的标题`<div>{{ title }}</div>`

​		title(string)表单的标题名称，config配置项，例如：`formTitle('基础数据')`



- `formField(field, label, tag = 'Input', config = {})`：简单表单项，生成动态组件

​		field：字段key

​		label：字段名

​		tag：动态标签

​		config：配置项 ，参考 https://v2.cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1

`{ formItemClass: 'form-is-full', props: { type: 'textarea', showWordLimit: true }, attrs: { maxlength: 500, rows: 3 }}`



- `formFieldGroup(field, label, childrens, tag = 'Select', config = {})`：复杂表单项，生成动态组件  Select RadioGroup CheckboxGroup

​		field：字段key

​		label：字段名

​		childrens为数据项，数组类型如果在data当中定义的时候未知，可以给“[]”空数组。就像el-select的options（label，value）和el-radio的options（label）

​		tag：tag 标签 (支持 Select RadioGroup CheckboxGroup 默认Select)

​		config：配置项 ，参考 https://v2.cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1

`formFieldGroup('sex', '性别', sex, 'RadioGroup')`



**btns**：定义表单按钮

​	用法：

​	`btns: [`{ text: '取消', click: () => this.onClose() },`{ text: '确定', type: 'primary', click: this.submit }]`



**label-width**：表单label的宽度



#### 完整示例

```js
<template>
  <QkForm ref="quickForm" form-item-split="2" :rules="rules" :model="form" :fields="fields" :btns="btns" label-width="100px" />
</template>

<script>
import { cloneDeep } from 'loadsh'
import { notNull, userName, lengthRange, identityCard, phone, email, maxLength } from '@/utils/validate'
import { formField, formFieldGroup, formTitle, changeFieldsByProp } from "@/utils"
import { orgType, sex } from '@/libs/options'
export default {
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      rules: {
        userName: [
          notNull,
          userName
        ],
        name: [
          // notNull,
          lengthRange(2, 20)
        ],
        identityCard: [
          // notNull,
          identityCard
        ],
        sex: notNull,
        'org.type': notNull,
        // orgId: notNull,
        mobile: [
          notNull,
          phone
        ],
        email: [email, maxLength(60)]
      },
      form: {
        userName: '',
        org: {}
      },
      fields: [
        formTitle('基础数据'),
        formField('userName', '用户名'),
        formField('name', '姓名'),
        formField('mobile', '手机号'),
        formField('identityCard', '身份证'),
        formFieldGroup('sex', '性别', sex, 'RadioGroup'),
        formFieldGroup('org.type', '机构类型', orgType),
        formField('qq', 'qq'),
        formField('email', '电子邮箱'),
        formField('address', '联系地址', 'Input', { props: { type: 'textarea' }, formItemClass: 'form-is-full' })
      ],
      btns: [
        { text: '取消', click: () => this.onClose() },
        { text: '确定', type: 'primary', click: this.submit }
      ]
    }
  },
  created() {
    if (this.data) {
      this.form = cloneDeep(this.data)
      changeFieldsByProp(this.fields, 'userName', { config: { props: { disabled: true } } }) // 设置item props属性
      // 编辑时不验证
      this.rules.identityCard = {}
      this.rules.mobile = {}
    }
  },
  methods: {
    submit() {
      const { form } = this.$refs.quickForm.$refs
      form.validate(valid => {
        console.log(valid);
      })
      console.log(this.form);
    }
  }
}
</script>

<style>

</style>
```



### QkList组件

```js
<QkList
    :loading="loading"
    :search="search"
    :table="table"
    :page="page"
    @on-search="onSearch"
  />
```

#### QkList列表组件属性

**loading**：加载动画

**search**：搜索栏，对象有三个属性

- formData：搜索栏表单数据

- fields：搜索栏表单字段

1. 对象方式：`{ tag: 'el-input', field: 'username', label: '用户名', config: { attrs: { placeholder: '用户名' }, props: { clearable: true }} }`

​    2.函数方式： 

默认渲染标签 

`formField("name", "姓名")` ：input框

`formFieldGroup("sex", "性别", sex)`：select下拉列表

指定渲染标签 

`formField("time", "时间", 'DatePicker', { props: { type: 'datetime' }})`：DatePicker日期选择器

`formField("timerange", "时间区间", 'TimePicker')`：时间选择器

`formFieldGroup('simStatus', 'SIM卡状态', [{value: 1, label: '有效1'}, {value: 2, label: '无效2'}])`：select下拉列表



- btns：搜索栏操作按钮

`[`

​     `{ text: '新增', icon: 'add', click: this.addData },`

​     `{ text: '新增', click: this.addData }`

 `]`

**table**：表格

```js
table: {
        data: [], // 表格数据
        columns: [ // 表格列
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "name",
            label: "姓名"
          },
          {
            key: "mobile",
            label: "手机号"
          },
          {
            key: 'supplier.name',
            label: '厂商'
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "sex",
            label: "性别",
            options: sex
          },
          {
            key: 'org.type',
            label: '机构类型',
            options: orgType
          },
          {
            key: "qq",
            label: "qq"
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
            key: 'simStatus',
            label: 'SIM卡状态',
            options: getOptions('simStatus') // 本地数据中查询字典值
          },
          {
            key: 'saleStatus',
            label: '整车流量状态',
            options: getOptions('saleStatus') // 本地数据中查询字典值
          },
          {
            key: 'restrictStatus',
            label: '实名限制状态',
            options: getOptions('restrictStatus') // 本地数据中查询字典值
          },
          {
            key: "buttons",
            label: "操作",
            width: "120",
            align: "center",
            fixed: "right",
            render: (h, params) => {
              const buttons = [
                {
                  text: "编辑",
                  click: this.updateData,
                },
                {
                  text: "详情",
                  click: this.showDetail,
                }
              ]
              return generateBtns(h, params, buttons)
            },
          },
        ],
      }
```



**page**： 分页

`page: {`

​    `num: 1,`

​    `size: 20,`

​    `totalElement: 0,`

 `}`



**on-search**：搜索触发的函数

#### 完整示例

```js
<template>
  <QkList
    :loading="loading"
    :search="search"
    :table="table"
    :page="page"
    @on-search="onSearch"
  />
</template>

<script>
import { changeFieldsByProp, formField, formFieldGroup, generateBtns } from "@/utils"
import { sex, orgType } from '@/libs/options'
import Add from './add'
import Detail from './detail'
export default {
  components: {},
  data: function () {
    return {
      loading: false,
      // 搜索条件
      search: {
        formData: {
          test: []
        },
        fields: [
          // 对象方式
          { tag: 'el-input', field: 'username', label: '用户名', config: { attrs: { placeholder: '用户名' }, props: { clearable: true }} },
          // 函数方式 默认渲染el-input标签
          formField("name", "姓名"),
          formFieldGroup("sex", "性别", sex),
          // 函数方式 指定渲染标签
          formField("time", "时间", 'DatePicker', { props: { type: 'datetime' }}),
          // formField("datePickerRange", "日期区间", 'DatePicker', { props: { type: 'datetimerange' }}),
          // formField("timerange", "时间区间", 'TimePicker'),
          // formFieldGroup('simStatus', 'SIM卡状态', [{value: 1, label: '有效1'}, {value: 2, label: '无效2'}]),
          // RadioGroup demo
          // formFieldGroup('test', 'Test', [{value: 1, label: '有效1'}, {value: 2, label: '无效2'}], 'RadioGroup'),
          // CheckboxGroup demo
          // formFieldGroup('test', 'Test', [{value: 1, label: '有效1'}, {value: 2, label: '无效2'}], 'CheckboxGroup'),
        ],
        btns: [
          { text: '新增', icon: 'add', click: this.addData },
          { text: '新增', click: this.addData }
        ],
      },
      // 表格
      table: {
        data: [],
        columns: [
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "name",
            label: "姓名"
          },
          {
            key: "mobile",
            label: "手机号"
          },
          {
            key: 'supplier.name',
            label: '厂商'
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "sex",
            label: "性别",
            options: sex
          },
          {
            key: 'org.type',
            label: '机构类型',
            options: orgType
          },
          {
            key: "qq",
            label: "qq"
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
            key: 'simStatus',
            label: 'SIM卡状态',
            options: getOptions('simStatus')
          },
          {
            key: 'saleStatus',
            label: '整车流量状态',
            options: getOptions('saleStatus')
          },
          {
            key: 'restrictStatus',
            label: '实名限制状态',
            options: getOptions('restrictStatus')
          },
          {
            key: "buttons",
            label: "操作",
            width: "120",
            align: "center",
            fixed: "right",
            render: (h, params) => {
              const buttons = [
                {
                  text: "编辑",
                  click: this.updateData,
                },
                {
                  text: "详情",
                  click: this.showDetail,
                }
              ]
              return generateBtns(h, params, buttons)
            },
          },
        ],
      },
      // 分页
      page: {
        num: 1,
        size: 20,
        totalElement: 0,
      },
    }
  },
  created() {
    this.table.data = [
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '1234567891223231233456',
        sex: 1,
        qq: ['123456789', '123', '123312312323'],
        supplier: {
          name: '厂商1'
        },
        org: {
          type: 1
        }
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789',
        supplier: {
          name: '厂商2'
        }
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123', '123312312323']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li1',
        name: '李1',
        mobile: '15717179551',
        identityCard: '123456789123456',
        sex: 1,
        qq: ['123456789', '123']
      },
      {
        userName: 'li2',
        name: '李2',
        mobile: '15717179552',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      },
      {
        userName: 'li3',
        name: '李3',
        mobile: '15717179553',
        identityCard: '123456789123456',
        sex: 2,
        qq: '123456789'
      }
    ]
    this.page.totalElement = 3
    // changeFieldsByProp(this.search.fields, 'sex', { childrens: [{value: 1, label: '男'}]})
  },
  methods: {
    onSearch(search, page) {
      console.log(search, page)
    },
    showDetail(row) {
      this.$qkDialog({
        title: '详情',
        components: Detail,
        props: { data: row },
        width: 690
      })
    },
    onAction(action) {
      // 新增完成后执行操作
      // todo 刷新列表
      if (action === 'success') {
        this.getList()
      }
    },
    addData() {
      this.$qkDialog({
        title: '新增',
        components: Add,
        width: 690,
        onAction: this.onAction
      })
    },
    updateData(row) {
      this.$qkDialog({
        title: '编辑',
        components: Add,
        props: { data: row },
        width: 690,
        onAction: this.onAction
      })
    }
  }
}
</script>

<style>
</style>

```



### qkDialog模态框组件

自定义指令方法使用

```js
showDetail(row) {
    this.$qkDialog({
        title: '详情', // 标题
        components: Detail, // 组件
        props: { data: row }, // 数据项，这里传入的是详情的数据
        width: 690 // 模态框宽度
    })
}
```

代码当中已经绑定到vue的prototype上 `Vue.prototype.$qkDialog = QkDialog`，所以在你的代码组件中随便用



### QkDetail详情组件

`<QkDetail :columns="columns" :data="data" split="3"></QkDetail>`

**columns**：字段项，类似list组件的table里colums格式，数组类型

**data**：数据，数组类型

**split**：一行的列数

完整例子



```js
<template>
  <QkDetail :columns="columns" :data="data" split="3"></QkDetail>
</template>

<script>
import { sex } from '@/libs/options'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: [
          {
            key: "userName",
            label: "用户名",
            colSpan: 2
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
  }
}
</script>

<style>

</style>
```



## 依赖版本

node版本，npm版本，yarn版本，vue版本等

## 最佳实践

待补充

## 浏览器兼容性

待补充

