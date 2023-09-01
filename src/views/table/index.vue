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
          // formField("name", "姓名"),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          formFieldGroup("sex", "性别", sex),
          // 函数方式 指定渲染标签
          // formField("time", "时间", 'DatePicker', { props: { type: 'datetime' }}),
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
          // {
          //   key: 'simStatus',
          //   label: 'SIM卡状态',
          //   options: getOptions('simStatus')
          // },
          // {
          //   key: 'saleStatus',
          //   label: '整车流量状态',
          //   options: getOptions('saleStatus')
          // },
          // {
          //   key: 'restrictStatus',
          //   label: '实名限制状态',
          //   options: getOptions('restrictStatus')
          // },
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
