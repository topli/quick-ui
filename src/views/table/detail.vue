<template>
  <QkDetail :columns="columns" :data="data"></QkDetail>
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
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名",
            full: true
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
          },
          {
            key: "userName",
            label: "用户名"
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
            label: "联系地址",
            full: true
          }
        ]
    }
  }
}
</script>

<style>

</style>