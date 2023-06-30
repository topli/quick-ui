<template>
  <QkDetail :columns="columns" :data="data" split="2"></QkDetail>
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
            key: "mobile",
            label: "手机号"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "identityCard",
            label: "身份证"
          },
          {
            key: "qq",
            label: "qq",
          },
          {
            key: "email",
            colSpan: 2,
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