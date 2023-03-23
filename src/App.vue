<template>
  <div id="app">
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
import { formField, generateBtns } from "./utils"
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      loading: false,
      // 表格
      table: {
        data: [],
        columns: [
          {
            key: "sim",
            label: "MSISDN",
            minWidth: "170",
            align: "center",
          },
          {
            key: "iccid",
            label: "ICCID",
            minWidth: "180",
            align: "center",
          },
          {
            key: "imei",
            label: "IMEI",
            minWidth: "180",
            align: "center",
          },
          {
            key: "dateactivated",
            label: "激活时间",
            minWidth: "160",
            align: "center",
          },
          {
            key: "restrictTime",
            label: "实名限制时间",
            minWidth: "160",
            align: "center",
          },
          {
            key: "updateTime",
            label: "更新时间",
            minWidth: "160",
            align: "center",
          },
          // {
          //   key: 'simStatus',
          //   label: 'SIM卡状态',
          //   minWidth: '120',
          //   align: 'center',
          //   options: getOptions('simStatus')
          // },
          // {
          //   key: 'saleStatus',
          //   label: '整车流量状态',
          //   minWidth: '100',
          //   align: 'center',
          //   options: getOptions('saleStatus')
          // },
          // {
          //   key: 'restrictStatus',
          //   label: '实名限制状态',
          //   minWidth: '100',
          //   align: 'center',
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
      // 搜索条件
      search: {
        formData: {},
        fields: [
          formField("sim", "MSISDN"),
          formField("iccid", "ICCID"),
          formField("imei", "IMEI"),
          formField("time", "TIME", 'DatePicker'),
          // formQkSelect('simStatus', 'SIM卡状态', {
          //   props: {
          //     options: getOptions('simStatus')
          //   }
          // }),
          // formQkSelect('saleStatus', '整车流量状态', {
          //   props: {
          //     options: getOptions('saleStatus')
          //   }
          // }),
          // formQkSelect('restrictStatus', '实名限制状态', {
          //   props: {
          //     options: getOptions('restrictStatus')
          //   }
          // }),
        ],
        btns: [],
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
      console.log(search, page);
    },
    showDetail() {}
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  height: 100vh;
}
body {
  height: 100vh;
}
#app {
  overflow: hidden;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
