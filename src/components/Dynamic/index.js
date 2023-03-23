import _ from 'loadsh'
import Vue from 'vue'
import Dy from './index'
export default {
  props: {
    // string只能设置全局组件、Object可以设置引入自定义组件
    tag: [String, Object],
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
  render(h) {
    const defaultConfig = {
      props: {
        value: this.value
      },
      on: {
        input: (val) => {
          this.$emit('input', val)
        },
        change: (val) => {
          this.$emit('change', val)
        }
      }
    }
    let childrens = null
    if (!_.isEmpty(this.childrens)) {
      const Dynamic = Vue.extend(Dy)
      if (Array.isArray(this.childrens)) {
        childrens = []
        for (let i = 0; i < this.childrens.length; i++) {
          const child = this.childrens[i]
          const ins = new Dynamic({ el: document.createElement('div'), propsData: child })
          childrens.push(ins._vnode)
        }
      } else {
        childrens = this.childrens
      }
    }
    return h(
      this.tag,
      _.merge(defaultConfig, this.config),
      childrens || null
    )
  }
}
