import { setValueByPath, getValueByPath, getObjType } from '@/utils'
import { valueEquals } from 'element-ui/src/utils/util'
import { merge, isEmpty } from 'loadsh'

export default {
  name: 'QkDynamic',
  props: {
    // string只能设置全局组件、Object可以设置引入自定义组件
    tag: [String, Object],
    model: Object,
    field: [String],
    // config 包含render函数所有配置，也可以设置自定义配置
    config: Object,
    // 绑定值
    value: [String, Number, Object, Array, Date],
    // 构建子级用  childrens 是数组 配置项参考Dynamic配置  childrens是字符串直接显示文本
    childrens: [Array, String]
  },
  data() {
    return {}
  },
  methods: {
    hanlderElementValue(value, tag) {
      // 处理el-input v-model 绑定值为 Array 时转为字符串
      if (tag === 'el-Input') {
        if (getObjType(value) === '[object Array]') {
          return value.toString()
        }
      }
      return value
    }
  },
  render(h) {
    let value = getValueByPath(this.model, this.field)
    value = this.hanlderElementValue(value, this.tag)
    const defaultConfig = {
      props: {
        value: value
      },
      on: {
        input: (val, old) => {
          if (!valueEquals(val, old)) {
            setValueByPath(this.model, this.field, val)
          }
          this.$emit('input', val)
        },
        change: (val, old) => {
          if (!valueEquals(val, old)) {
            setValueByPath(this.model, this.field, val)
          }
          this.$emit('change', val)
        }
      }
    }
    let childrens = null
    if (!isEmpty(this.childrens)) {
      if (Array.isArray(this.childrens)) {
        childrens = []
        for (let i = 0; i < this.childrens.length; i++) {
          const child = this.childrens[i]
          childrens.push(h(child.tag, { props: { ...child.props || {} } }, child.text))
        }
      } else {
        childrens = this.childrens
      }
    }
    return h(
      this.tag,
      merge(defaultConfig, this.config),
      childrens || null
    )
  }
}
