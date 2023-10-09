const inserted = (el, binding, vNode) => {
  // 获取上下文
  const context = vNode.context;
  // 增加样式
  el.classList.add('qk-fixed-top-wrapper')
  // 创建div
  const fixedTop = el._fixedTop = document.createElement('div')
  fixedTop.innerHTML = binding.value
  fixedTop.classList.add('qk-fixed-text')
  // 查找输入框
  const input = el._input = el.querySelector('input')

  const toTop = () => {
    fixedTop.style.left = '10px'
    fixedTop.style.top = '0'
    setClass()
  }

  const toInner = () => {
    if (!vNode.child.value && !vNode.child.visible) {
      fixedTop.style.left = el._input_pl + 'px'
      fixedTop.style.top = ''
      vNode.child.blur && vNode.child.blur()
    }
    setClass()
  }

  const setClass = () => {
    const value = vNode.child.value
    if (!value) {
      fixedTop.classList.remove('qk-fixed-top')
      fixedTop.classList.add('qk-fixed-inner')
    } else {
      fixedTop.classList.remove('qk-fixed-inner')
      fixedTop.classList.add('qk-fixed-top')
    }
  }

  if (input) {
    // 获取样式
    let style = window.getComputedStyle(input, null);
    el._input_pl = parseFloat(style.getPropertyValue('padding-left'));
    if (vNode.child.value) {
      toTop()
    } else {
      toInner()
    }
    el.appendChild(fixedTop)
    el._focus = () => toTop()
    el._blur = () => {
      setTimeout(() => {
        toInner()
      }, 60);
    }
    context.$on('focus', el._focus)
    context.$on('blur', el._blur)
  }
}
const unbind = (el, binding, vNode) => {
  const context = vNode.context;
  context.$off('focus', el._focus)
  context.$off('blur', el._blur)
}

const update = (el, binding, vNode) => {
  const fixedTop = el._fixedTop
  setTimeout(() => {
    if (!vNode.child.value && !vNode.child.visible) {
      fixedTop.style.left = el._input_pl + 'px'
      fixedTop.style.top = ''
      vNode.child.blur && vNode.child.blur()
    } else {
      fixedTop.style.left = '10px'
      fixedTop.style.top = '0'
    }
  }, 60);
}
export const qkFixedTop  = {
  inserted,
  update,
  unbind
}