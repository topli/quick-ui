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
import { formField, formFieldGroup, generateBtns } from "@/utils"
import Add from './add'
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
          { tag: 'el-input', field: 'sim', label: 'MSISDN', config: { attrs: { placeholder: 'MSISDN' }, props: { clearable: true }} },
          // 函数方式 默认渲染el-input标签
          formField("iccid", "ICCID"),
          formField("imei", "IMEI"),
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
          { text: '新增', icon: 'add', click: this.addData }
        ],
      },
      // 表格
      table: {
        data: [],
        columns: [
          {
            key: "sim",
            label: "MSISDN"
          },
          {
            key: "iccid",
            label: "ICCID"
          },
          {
            key: "imei",
            label: "IMEI"
          },
          {
            key: "dateactivated",
            label: "激活时间"
          },
          {
            key: "restrictTime",
            label: "实名限制时间"
          },
          {
            key: "updateTime",
            label: "更新时间"
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
            width: "80",
            align: "center",
            fixed: "right",
            render: (h, params) => {
              const buttons = [
                {
                  text: "详情",
                  click: this.showDetail,
                },
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
    this.table.data = [{}, {}, {}]
    this.page.totalElement = 3
  },
  methods: {
    onSearch(search, page) {
      console.log(search, page)
    },
    showDetail() {},
    addData() {
      this.$qkDialog({
        title: '新增',
        components: Add,
        width: 690,
        onAction: (action) => {
          // 新增完成后执行操作
          // todo 刷新列表
          if (action === 'success') {
            this.getList()
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
