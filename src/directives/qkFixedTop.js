/**
 * 判断是否为空数据  兼容空数组
 * @param {*} val 
 */
const isEmpty = (val) => {
  let empty = true
  if (Array.isArray(val)) {
    if (val.length > 0) return false
  } else if (!!val) {
    return false
  }
  return true
}

// 判断是否是select组件  需要做兼容处理
const isSelectComponent = (ins) => {
  if (ins && ins.$options && ins.$options._componentTag)
    return ins.$options._componentTag.toLowerCase() === 'el-select'.toLowerCase()
  return false
}

const inserted = (el, binding, vNode) => {
  // 获取上下文
  const context = vNode.context;
  // 增加样式
  el.classList.add('qk-fixed-top-wrapper')
  // 创建div
  const fixedTop = el._fixedTop = document.createElement('div')
  fixedTop.innerHTML = binding.value
  fixedTop.classList.add('qk-fixed-text')
  // 查找输入框 (目前兼容 el-input el-select qk-date 自定义组件请绑定输入框ref为input)
  let input = vNode.child.$refs.input || el.querySelector('.el-input__inner')

  const toTop = () => {
    fixedTop.style.left = '10px'
    fixedTop.style.top = '0'
    setClass()
  }

  const toInner = () => {
    let empty = isEmpty(vNode.child.value)
    if (empty && !vNode.child.visible) {
      fixedTop.style.left = el._input_pl + 'px'
      fixedTop.style.top = ''
      vNode.child.blur && vNode.child.blur()
    }
    setClass()
  }

  const setClass = () => {
    let empty = isEmpty(vNode.child.value)
    if (empty) {
      fixedTop.classList.remove('qk-fixed-top')
      fixedTop.classList.add('qk-fixed-inner')
    } else {
      fixedTop.classList.remove('qk-fixed-inner')
      fixedTop.classList.add('qk-fixed-top')
    }
  }

  const onEvent = () => {
    // 兼容多选select
    if (isSelectComponent(vNode.child)) {
      el._visibleChange = (vis) => {
        if (vis) {
          toTop()
        } else {
          toInner()
        }
      }
      vNode.child.$on('visible-change', el._visibleChange)
    } else {
      el._focus = () => toTop()
      el._blur = () => {
        setTimeout(() => {
          vNode.child.visible = false
          toInner()
        }, 60);
      }
      context.$on('focus', el._focus)
      context.$on('blur', el._blur)
    }
  }

  if (input) {
    // 获取样式
    let style = window.getComputedStyle(input, null);
    el._input_pl = parseFloat(style.getPropertyValue('padding-left')) || 15;
    let empty = isEmpty(vNode.child.value)
    if (empty) {
      toInner()
    } else {
      toTop()
    }
    el.appendChild(fixedTop)
    // 绑定事件
    onEvent()
  }
}
const unbind = (el, binding, vNode) => {
  const context = vNode.context;
  context.$off('focus', el._focus)
  context.$off('blur', el._blur)
  if (isSelectComponent(vNode.child)) {
    vNode.child.$off('visible-change', el._visibleChange)
  }
}

const update = (el, binding, vNode) => {
  const fixedTop = el._fixedTop
  let empty = isEmpty(vNode.child.value)
  setTimeout(() => {
    if (empty && !vNode.child.visible) {
      fixedTop.style.left = el._input_pl + 'px'
      fixedTop.style.top = ''
      vNode.child.blur && vNode.child.blur()
    } else {
      fixedTop.style.left = '10px'
      fixedTop.style.top = '0'
    }
  }, 60);
}
export const qkFixedTop = {
  inserted,
  update,
  unbind
}