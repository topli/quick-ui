/**
 * 长度区间
 * @param {*} min 最小
 * @param {*} max 最大
 * @returns 
 */
export const lengthRange = (min, max) => {
  return { min, max, message: `长度在 ${min} 到 ${max} 个字符`, trigger: 'blur' }
}
/**
 * 指定最大长度
 * @param {*} max 
 * @returns 
 */
export const maxLength = (max) => {
  return { min: 0, max, message: `长度不能超过${max}个字符`, trigger: 'blur' }
}
/**
 * 指定最小长度
 * @param {*} min 
 * @returns 
 */
export const minLength = (min) => {
  return { min, message: `长度不能小于${min}个字符`, trigger: 'blur' }
}
/**
 * 固定长度
 * @param {*} length
 * @returns 
 */
export const length = (length) => {
  return {
    validator: (rule, value, callback) => {
      if (value.length === length) {
        callback()
      } else {
        callback(new Error(`长度必须是${length}个字符`))
      }
    }
  }
}
/**
 * 不能小于当前时间
 * @returns 
 */
export const noLtCurrentTime = () => {
  return {
    validator: (rule, value, callback) => {
      if (new Date(value).getTime() < Date.now()) {
        callback(new Error(`不能小于当前时间`))
      } else {
        callback()
      }
    }
  }
}
/**
 * 不能大于当前时间
 * @returns 
 */
export const noGtCurrentTime = () => {
  return {
    validator: (rule, value, callback) => {
      if (new Date(value).getTime() > Date.now()) {
        callback(new Error(`不能大于当前时间`))
      } else {
        callback()
      }
    }
  }
}


// 数字范围
export const numberRange = ([min, max], label) => {
  return {
    validator: (rule, val, callback) => {
      if (val >= min && val <= max) {
        callback()
      } else {
        callback(`${label || '有效范围'}:${min}-${max}`)
      }
    }
  }
}

export const notNull = { required: true, message: '不能为空' }

export const userName = { pattern: /^[A-Za-z0-9]{1,20}$/, message: '由数字/字母组成(1-20位)' }

export const realName = { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/, message: '可由中文/数字/字母组成(1-20位)' }

export const path = { pattern: '^[A-Za-z0-9\\/]+$', message: '请输入字母、数字或符号"/" ' }

export const isNumber = { pattern: /^[1-9]\d*$/, message: '请输入正整数' }

export const mobile = { pattern: /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/, message: '号码格式错误' }

export const phone = { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号码格式错误' }

export const email = { pattern: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/, message: '邮箱格式错误' }

export const password = { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,18}$/, message: '必须包含大小写字母和数字，长度在6-18位' }

export const vehicleNo = { pattern: /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/, message: '车牌号错误' }

export const idNumber = { pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, message: '身份证号错误' }

export const identityCard = { pattern: '^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$', message: '身份证格式不正确' }

export const ip = { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'IP格式不正确' }

export const phonePattern = { pattern: /^[0-9\-]*$/, message: '请输入数字或-' }
