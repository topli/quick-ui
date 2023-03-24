<template>
  <QkForm ref="quickForm" :rules="rules" :model="form" :fields="fields" :btns="btns" label-width="100px" />
</template>

<script>
import _ from 'loadsh'
import { notNull, userName, lengthRange, identityCard, phone, email, maxLength } from '@/utils/validate'
import { formField, formFieldGroup, changeFieldsByProp } from "@/utils"
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
          notNull,
          lengthRange(2, 20)
        ],
        identityCard: [
          notNull,
          identityCard
        ],
        sex: notNull,
        orgType: notNull,
        orgId: notNull,
        mobile: [
          notNull,
          phone
        ],
        email: [email, maxLength(60)]
      },
      form: {
        userName: ''
      },
      fields: [
        formField('userName', '用户名'),
        formField('name', '姓名'),
        formField('mobile', '手机号'),
        formField('identityCard', '身份证'),
        formFieldGroup('sex', '性别', [{value: '1', label: '男'}, {value: '2', label: '女'}]),
        formFieldGroup('orgType', '机构类型', [{value: '1', label: '系统'}, {value: '2', label: '运营商'}]),
        formField('qq', 'qq'),
        formField('email', '电子邮箱'),
        formField('address', '联系地址')
      ],
      btns: [
        { text: '取消', click: () => this.onClose() },
        { text: '确定', type: 'primary', click: this.submit }
      ]
    }
  },
  created() {
    if (this.data) {
      this.form = _.cloneDeep(this.data)
      changeFieldsByProp(this.fields, 'userName', { config: { props: { disabled: true } } }) // 设置item props属性
      // 编辑时不验证
      this.rules.identityCard = {}
      this.rules.mobile = {}
    }
  },
  methods: {
    submit() {}
  }
}
</script>

<style>

</style>