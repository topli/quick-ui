<template>
  <QkForm ref="quickForm" label-position="top" column="3" :rules="rules" :model="form" :fields="fields" :btns="btns" />
</template>

<script>
import { cloneDeep } from 'loadsh'
import { notNull, userName, lengthRange, identityCard, phone, email, maxLength } from '@/utils/validate'
import { formField, formFieldGroup, formTitle } from "@/utils"
import { orgType, sex } from '@/libs/options'

const full = {
  span: 'full'
}

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
        formTitle('基础数据').setFIP(full),
        formField('userName', '用户名'),
        formField('name', '姓名'),
        formField('mobile', '手机号'),
        formField('identityCard', '身份证'),
        formFieldGroup('sex', '性别', sex, 'RadioGroup'),
        formFieldGroup('org.type', '机构类型', orgType),
        formField('qq', 'qq'),
        formField('email', '电子邮箱'),
        formField('address', '联系地址').setProps({ type: 'textarea' }).setFIP(full)
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
      this.fields
        .getField('userName')
        .setProps({ disabled: true })
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