import Vue from "vue"

export const dateFormat = (str, fmt = 'yyyy-MM-dd HH:mm:ss') => {
  if (!str && isNaN(Date.parse(str))) return ''
  const date = new Date(str)
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}
/**
 * 处理时间区间
 * @param {*} formData 需要转换的对象
 * @param {*} rangeTimes 配置项
 */
export const handlerRangeTime = (formData, rangeTimes) => {
  rangeTimes.forEach(item => {
    const value = formData[item.key]
    if (value && value.length > 0) {
      formData[item.startKey] = dateFormat(value[0], item.format)
      formData[item.endKey] = dateFormat(value[1], item.format)
      delete formData[item.key]
    }
  })
}
/**
 * 获取对象类型 [object Null] [object Undefined] [object String] [object Number] [object Boolean] [object Function] [object Date] [object Array] [object Object]
 * @param {} value 
 * @returns 
 */
export const getObjType = value => {
  return Object.prototype.toString.call(value)
}
/**
 * 获取对象路径值
 * @param {*} data 
 * @param {*} path 
 * @returns 
 */
export const getValueByPath = (data, path) => {
  let value = data
  if (path && typeof path === 'string') {
    if (path.indexOf('.') !== -1) {
      const propsArray = path.split('.')
      for (let i = 0; i < propsArray.length; i++) {
        const prop = propsArray[i]
        value = value[prop]
        if (!value) {
          break
        }
      }
    } else {
      value = data[path]
    }
  }
  return value
}
/**
 * 设置对象路径值
 * @param {*} data 
 * @param {*} path 
 * @param {*} value 
 */
export const setValueByPath = (data, path, value) => {
  if (path && typeof path === 'string') {
    if (path.indexOf('.') !== -1) {
      const propsArray = path.split('.')
      let val = data
      for (let i = 0; i < propsArray.length; i++) {
        const prop = propsArray[i]
        if (i === propsArray.length - 1) {
          Vue.set(val, prop, value)
          break
        }
        val = val[prop]
        if (!val) {
          break
        }
      }
    } else {
      Vue.set(data, path, value)
    }
  }
}