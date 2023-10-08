# list 业务组件

## 基本用法
::: demo
```
<template>
  <div class="demo-list">
    <QkList
      :loading="loading"
      :search="search"
      :table="table"
      :page="page"
      @on-search="onSearch"
    />
  </div>
</template>

<script>
  export default {
    data() {
      const { changeFieldsByProp, formField, formFieldGroup, generateBtns } = this.$qkUtils
      const sex = [{value: 1, label:'男'},{value: 2, label:'女'}]
      return {
        loading: false,
        // 搜索条件
        search: {
          // 占位符显示模式
          placeholderMode: 'fixedTop',
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
            formField("date", "日期", 'QkDate'),
          ],
          btns: [
          // { text: '新增', icon: 'add', click: this.addData },
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
    this.page.totalElement = this.table.data.length
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
      <td>loading</td>
      <td>加载状态</td>
      <td>boolean</td>
      <td>false/true</td>
      <td>false</td>
    </tr>
    <tr>
      <td>search</td>
      <td>查询配置</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>table</td>
      <td>表格配置</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>page</td>
      <td>分页配置</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>onSearch</td>
      <td>查询方法</td>
      <td>Function</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

## search
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
      <td>placeholderMode</td>
      <td>占位符显示模式</td>
      <td>String</td>
      <td>default/fixedTop/tooltip</td>
      <td>default</td>
    </tr>
    <tr>
      <td>formData</td>
      <td>搜索form绑定值</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>fields</td>
      <td>搜索form属性</td>
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
      <td>onSearch</td>
      <td>查询方法</td>
      <td>Function</td>
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
      <td>tag</td>
      <td>动态渲染组件名称或组件对象</td>
      <td>string/VNode</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>field</td>
      <td>form对应属性</td>
      <td>Array</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>label</td>
      <td>悬浮提示/placeholder</td>
      <td>string</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>config</td>
      <td>参考https://v2.cn.vuejs.org/v2/guide/render-function.html</td>
      <td>Object</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

### btns
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
      <td>text</td>
      <td>按钮名称</td>
      <td>string</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>icon</td>
      <td>图标库引入的图标类型</td>
      <td>string</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>click</td>
      <td>点击事件</td>
      <td>Funtion</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

## table
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
      <td>selection</td>
      <td>复选框</td>
      <td>boolean</td>
      <td>false/true</td>
      <td>false</td>
    </tr>
    <tr>
      <td>index</td>
      <td>序号</td>
      <td>boolean</td>
      <td>false/true</td>
      <td>false</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>加载动画</td>
      <td>boolean</td>
      <td>false/true</td>
      <td>false</td>
    </tr>
    <tr>
      <td>data</td>
      <td>表格数据</td>
      <td>Array</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>columns</td>
      <td>列数据</td>
      <td>Array</td>
      <td>必填</td>
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
      <td>selectable</td>
      <td>仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选</td>
      <td>Function(row, index)</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>defaultSelections</td>
      <td>默认选中数据 仅在 type=selection 时有效</td>
      <td>Array</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>其他参数</td>
      <td>支持ElementUI Table组件其他参数</td>
      <td>any</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

### columns
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
      <td>key</td>
      <td>对应data数据中的属性</td>
      <td>string</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>label</td>
      <td>对应表头</td>
      <td>string</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>options</td>
      <td>字典数组(自动匹配value值)</td>
      <td>Array</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>过滤器</td>
      <td>string</td>
      <td>过滤器类型</td>
      <td>—</td>
    </tr>
    <tr>
      <td>render</td>
      <td>自定义渲染函数</td>
      <td>Function(h, params)</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>其他参数</td>
      <td>支持ElementUI TableColumns组件其他参数</td>
      <td>any</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

## page
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
      <td>num</td>
      <td>当前页</td>
      <td>number</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>size</td>
      <td>每页数量</td>
      <td>number</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <td>totalElement</td>
      <td>总条数</td>
      <td>number</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>
