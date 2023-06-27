# table 表格

## 基本用法
适用广泛的表格组件
::: demo
```
<template>
  <QkTable selection index :data="tableData" :columns="columns"></QkTable>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          { name: '张三', age: 18, gender: 1 },
          { name: '李四', age: 24, gender: 1 },
          { name: '王五', age: 33, gender: 1 },
          { name: '静香', age: 18, gender: 2 },
        ],
        columns: [
          { key: 'name', label: '姓名' },
          { key: 'age', label: '年龄' },
          { key: 'gender', label: '性别', options: [{value: 1, label: '男'}, {value: 2, label: '女'}] }
        ]
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
      <td>elOptions</td>
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
      <td>elOptions</td>
      <td>支持ElementUI TableColumns组件其他参数</td>
      <td>any</td>
      <td>—</td>
      <td>—</td>
    </tr>
  </tbody>
</table>
