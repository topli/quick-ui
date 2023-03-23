import _ from 'loadsh'
import { elComponentNames } from './dict'

/**
 * 生成动态formItem内容
 * @param {*} field 字段key
 * @param {*} label 字段名
 * @param {*} tag 动态标签
 * @param {*} config 配置项 参考 https://v2.cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 * @returns 
 */
 export const formField = (field, label, tag = 'Input', config = {}) => {
  let t = tag
  // 是element标签自动加上el-
  if (elComponentNames.includes(tag)) {
    t = `el-${tag}`
  }
  return {
    tag: t,
    field,
    label,
    config: _.merge({
                attrs: { placeholder: config.placeholder || label },
                props: { clearable: true }
              },
              config)
  }
}
/**
 * 改变 fields 属性
 * @param {*} items
 * @param {*} index
 * @param {*} props
 */
export const changeFieldsByIndex = (items, index, props) => {
  if (props && props.options) {
    // 避免options数据累加
    items[index].config.props.options = props.options
  }
  items[index] = _.merge(items[index], { config: { props }})
}

/**
 * 根据 prop 改变 fields 属性
 * @param {*} items
 * @param {*} index
 * @param {*} props
 */
export const changeFieldsByProp = (items, prop, props) => {
  const findIndex = items.findIndex(item => item.prop === prop)
  changeFieldsByIndex(items, findIndex, props)
}

// ----------------- 列表 按钮---------------
export const generateBtns = (h, params, buttons) => {
  const filterButtons = buttons.filter(item => !!item)
  const generateButtons = filterButtons.map(item => {
    return h('span',
      {
        style: item.style,
        on: {
          click: _.debounce(() => {
            if (!item.click) {
              console.error(`click event is not undefined`);
              return
            } else if (typeof item.click !== 'function') {
              console.error(`click event is not function`);
              return
            }
            item.click(params.row)
          }, 200)
        },
        class: `list-btn ${item.class || ''}`
      },
      item.text
    )
  })
  return h(
    "div",
    generateButtons
  )
}
