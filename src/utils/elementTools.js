import Vue from 'vue'
import { cloneDeep, mergeWith, merge, isArray, debounce } from 'lodash'
import { elComponentNames } from './constant'

/**
 * 初始化数组方法
 * @param {*} field 
 * @returns 
 */
Array.prototype.getField = function (field) {
  return this.find(item => item.field === field)
}

/**
 * 设置 fieldGroup childrens
 * @param { * } childrens 组件子级
 */
const setChildrens = function (childrens) {
  const fieldObj = this
  const newChildrens = cloneDeep(hanlderChildrens(childrens, fieldObj.tag))
  this.childrens = newChildrens
  return this
}
/**
 * 设置 field 、fieldGroup props
 * @param { * } props 组件props
 */
const setProps = function (props) {
  const fieldObj = this
  const newFieldObj = mergeWith(fieldObj.config.props, props, customizer)
  this.config.props = newFieldObj
  return this
}
/**
 * 设置 field 、fieldGroup attrs
 * @param { * } props 组件props
 */
const setAttrs = function (attrs) {
  const fieldObj = this
  const newFieldObj = mergeWith(fieldObj.config.attrs, attrs, customizer)
  this.config.attrs = newFieldObj
  return this
}

/**
 * 设置 field 、fieldGroup on
 * @param {*} on 组件事件
 */
const setOn = function (on) {
  const fieldObj = this
  const newFieldObj = mergeWith(fieldObj.config.on, on, customizer)
  this.config.on = newFieldObj
  return this
}
/**
 * 设置formItem组件属性
 * @param {*} formItemProps 
 * @returns 
 */
const setFIP = function (formItemProps) {
  this.formItemProps = mergeWith(this.formItemProps, formItemProps, customizer)
  return this
}
/**
 * 设置组件
 * @param {*} tag el组件|自定义组件
 * @returns 
 */
const setTag = function (tag) {
  this.tag = getTag(tag)
  return this
}
/**
 * 生成Field对象方法
 * @param {*} obj Field
 * @returns 
 */
const generateFieldObj = function (obj) {
  obj.setChildrens = setChildrens
  obj.setProps = setProps
  obj.setAttrs = setAttrs
  obj.setOn = setOn
  obj.setFIP = setFIP
  obj.setTag = setTag
  return obj
}

/**
 * 判断是否 element 标签
 * @param {*} tag 
 * @returns 
 */
const getTag = (tag) => {
  // 是element标签自动加上el-
  if (elComponentNames.includes(tag)) {
    return `el-${tag}`
  }
  return tag
}
/**
 * 处理子级
 * @param {*} childrens 子级数组
 * @param {*} parentTag 父级标签
 * @returns 
 */
const hanlderChildrens = (childrens, parentTag) => {
  let childTag = ''
  switch (parentTag) {
    case 'el-Select':
      childTag = 'el-option'
      break;
    case 'el-RadioGroup':
      childTag = 'el-radio'
      break;
    case 'el-CheckboxGroup':
      childTag = 'el-checkbox'
      break;
    default:
      break;
  }
  return childrens ? cloneDeep(childrens).map(item => {
    item.tag = childTag
    if (childTag === 'el-radio') {
      item.props = { label: item.value }
    } else {
      item.props = { value: item.value, label: item.label }
    }
    item.text = item.label
    return item
  }) : []
}
/**
 * 特殊组件处理 config
 * @param {*} config 
 * @param {*} tag 
 * @param {*} label 
 * @returns 
 */
const hanlderConfig = (config, tag, label) => {
  const attrs = { placeholder: config.placeholder || label }
  const props = { clearable: true }
  if (tag === 'DatePicker' && config.props && config.props.type && config.props.type.indexOf('range') !== -1) {
    props.startPlaceholder = config.startPlaceholder || '开始日期'
    props.endPlaceholder = config.endPlaceholder ||  '结束日期'
    props.defaultTime = ['00:00:00', '23:59:59']
  }
  if (tag === 'TimePicker' && config.props && config.props.isRange) {
    props.startPlaceholder = config.startPlaceholder || '开始时间'
    props.endPlaceholder = config.endPlaceholder || '结束时间'
  }
  return { attrs, props }
}

const customizer = (obj, src) => {
  if (isArray(src)) {
    return src
  }
}

/**
 * 生成动态组件
 * @param {*} field 字段key
 * @param {*} label 字段名
 * @param {*} tag 动态标签
 * @param {*} config 配置项 参考 https://v2.cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 * @returns 
 */
export const formField = (field, label, tag = 'Input', config = {}) => {
  const t = getTag(tag)
  const { attrs, props } = hanlderConfig(config, tag, label)
  return generateFieldObj({
    tag: t,
    field,
    label,
    config: merge({ attrs, props }, config)
  })
}
/**
 * 生成动态组件  Select RadioGroup CheckboxGroup
 * @param {*} field 字段key
 * @param {*} label 字段名
 * @param {*} childrens 子级
 * @param {*} tag 标签 (支持 Select RadioGroup CheckboxGroup 默认Select)
 * @param {*} config 配置项 参考 https://v2.cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 * @returns 
 */
export const formFieldGroup = (field, label, childrens, tag = 'Select', config = {}) => {
  const t = getTag(tag)
  const attrs = { placeholder: config.placeholder || label }
  const props = { clearable: true, filterable: true }
  return generateFieldObj({
    tag: t,
    field,
    label,
    childrens: hanlderChildrens(childrens, t),
    config: merge({ attrs, props }, config)
  })
}
/**
 * 创建form title
 * @param {*} title 标题
 * @param {*} config 渲染函数配置
 * @returns 
 */
export const formTitle = (title, config = {}) => {
  return generateFieldObj({
    tag: 'div',
    formItemProps: { span: 'full' },
    config: merge({}, config),
    childrens: title
  })
}
/**
 * @deprecated use formField.setProps() method
 * @param {*} items
 * @param {*} index
 * @param {*} newField
 */
export const changeFieldsByIndex = (fields, index, newField) => {
  if (newField.childrens) {
    newField.childrens = cloneDeep(hanlderChildrens(newField.childrens, fields[index].tag))
  }
  Vue.set(fields, index, mergeWith(fields[index], newField, customizer))
}

/**
 * @deprecated use formField.setProps() method
 * @param {*} fields
 * @param {*} index
 * @param {*} props
 */
export const changeFieldsByProp = (fields, field, props) => {
  const findIndex = fields.findIndex(item => item.field === field)
  changeFieldsByIndex(fields, findIndex, props)
}

// ----------------- 列表 按钮---------------
export const generateBtns = (h, params, buttons) => {
  const filterButtons = buttons.filter(item => !!item)
  const generateButtons = filterButtons.map(item => {
    return h('span',
      {
        style: item.style,
        on: {
          click: debounce(() => {
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