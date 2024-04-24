<template>
  <div>
    <el-button @click="toggleLang">切换</el-button>
    <QkList ref="qkList" :loading="loading" :search="search" :table="table" :page="page" @on-search="onSearch" />
  </div>
</template>

<script>
import _ from 'lodash'
import { formField, formFieldGroup, generateBtns } from "@/utils"
import { sex, orgType } from '@/libs/options'
import Add from './add'
import Detail from './detail'

const convertFilters = (arr) => {
  return arr.map(item => {
    return {
      text: item.label,
      value: item.value
    }
  })
}
export default {
  components: {},
  data: function () {
    return {
      loading: false,
      // 搜索条件
      search: {
        placeholderMode: 'fixedTop',
        formData: {
          time: new Date(),
          timerange: [new Date(), new Date(Date.now() + 565498481)],
          date: new Date(),
          daterange: [new Date(), new Date(Date.now() + 565498481)],
          datetime: new Date(),
          datetimeRange: [new Date(), new Date(Date.now() + 565498481)],
          sex1: null
        },
        fields: [
          // 对象方式
          { tag: 'el-input', field: 'username', label: this.$t('test'), config: { attrs: { placeholder: this.$t('test') }, props: { clearable: true }} },
          // 函数方式 默认渲染el-input标签
          formField("name", this.$t('test')),
          formFieldGroup("sex", "性别", sex),
          // formFieldGroup("sex2", "性别2", sex)
          //   .setTag("Autocomplete")
          //   .setProps({
          //     fetchSuggestions: () => { }
          //   }),
          // formFieldGroup("sex1", "性别1", sex).setProps({

          //   multiple: true,
          //   collapseTags: true,
          // }),
          // // 函数方式 指定渲染标签
          // formField("time", "时间", 'QkDate').setProps({ type: 'time', pickerOptions: { minTime: new Date() } }),
          // formField("timerange", "时间区间", 'QkDate').setProps({ type: 'timerange' }),
          // formField("date", "日期", 'QkDate').setProps({ type: 'date' }),
          // formField("daterange", "日期区间", 'QkDate').setProps({ type: 'daterange' }),
          // formField("datetime", "日期时间", 'QkDate').setProps({ type: 'datetime' }),
          // formField("datetimeRange", "日期时间区间", 'QkDate').setProps({ type: 'datetimerange' }),
          // formFieldGroup('simStatus', 'SIM卡状态', [{value: 1, label: '有效1'}, {value: 2, label: '无效2'}]),
          // RadioGroup demo
          // formFieldGroup('test', 'Test', [{value: 1, label: '有效1'}, {value: 2, label: '无效2'}], 'RadioGroup'),
          // CheckboxGroup demo
          // formFieldGroup('test', 'Test', [{value: 1, label: '有效1'}, {value: 2, label: '无效2'}], 'CheckboxGroup'),
        ],
        btns: [
          // { text: '新增', icon: 'add', click: this.addData },
          // { text: '新增', click: this.addData }
        ],
      },
      // 表格
      table: {
        data: [],
        props: {
          selection: true,
          rowKey: '',
          defaultSelected: []
        },
        on: {
          'selection-change': (e) => {
            console.log('selection-change');
            console.log(e);
            this.allSelected[this.page.num - 1] = e.map(item => item.vin)
          },
          'sort-change': (event) => {
            console.log(event);
          },
          'filter-change': (filters) => {
            console.log(filters);
          }
        },
        columns: [
          {
            key: "userName",
            label: this.$t('test'),
            width: 100,
            sortable: true
          },
          {
            key: "name",
            label: "姓名",
            width: 100
          },
          {
            key: "mobile",
            label: "手机号",
            width: 160
          },
          {
            key: 'supplier.name',
            label: '厂商'
          },
          {
            key: "identityCard",
            label: "身份证",
            width: 180
          },
          {
            key: "sex",
            label: "性别",
            options: sex,
            filters: convertFilters(sex)
          },
          {
            key: 'org.type',
            label: '机构类型',
            options: orgType
          },
          {
            key: "qq",
            label: "qq",
            width: 160
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
        ]
      },
      // 分页
      page: {
        num: 1,
        size: 20,
        totalElement: 0,
      },
      allData: [
        {
          vin: '1',
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
          vin: '2',
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
          vin: '3',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123', '123312312323']
        },
        {
          vin: '4',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '5',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '6',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '7',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '8',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '9',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '10',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '11',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '12',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '13',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '14',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '15',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '16',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '17',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '18',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '19',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '20',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '21',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '22',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '23',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '24',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '25',
          userName: 'li1',
          name: '李1',
          mobile: '15717179551',
          identityCard: '123456789123456',
          sex: 1,
          qq: ['123456789', '123']
        },
        {
          vin: '26',
          userName: 'li2',
          name: '李2',
          mobile: '15717179552',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        },
        {
          vin: '27',
          userName: 'li3',
          name: '李3',
          mobile: '15717179553',
          identityCard: '123456789123456',
          sex: 2,
          qq: '123456789'
        }
      ],
      allSelected: []
    }
  },
  created() {
    this.table.data = _.cloneDeep(this.allData).splice((this.page.num - 1) * this.page.size, this.page.size)
    this.page.totalElement = this.allData.length
    this.search.fields.getField('sex').setChildrens([{ value: 1, label: '男' }])
  },
  watch: {
    '$i18n.locale': function (val) {
      console.log('$i18n.locale', val);
      this.$refs.qkList.refreshList()
    }
  },
  methods: {
    toggleLang() {
      let lang = localStorage.getItem('lang')
      console.log(lang);
      if (lang === 'en_US') {
        lang = 'zh_CN'
      } else {
        lang = 'en_US'
      }
      localStorage.setItem('lang', lang)
      this.$i18n.locale = lang
      console.log(this.$t('test'));
    },
    onSearch(search, page) {
      console.log(search, page)
      this.table.data = _.cloneDeep(this.allData).splice((this.page.num - 1) * this.page.size, this.page.size)

      this.$set(this.table.props, 'defaultSelections', this.allSelected[this.page.num - 1])

      console.log(this.table.props);
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

<style></style>
