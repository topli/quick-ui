const inserted = (el, binding, vNode) => {
  // 获取上下文
  const context = vNode.context;
  // 增加样式
  el.classList.add('qk-tooltip-wrapper')
  // 创建div
  const tooltip = el._tooltip = document.createElement('div')
  tooltip.innerHTML = binding.value
  tooltip.classList.add('qk-tooltip')
  // 查找输入框
  const input = el._input = el.querySelector('input')

  const toTop = () => {
    tooltip.style.left = '10px'
    tooltip.style.top = '0'
  }

  const toInner = () => {
    setTimeout(() => {
      if (!vNode.child.value && !vNode.child.visible) {
        tooltip.style.left = el._input_pl + 'px'
        tooltip.style.top = ''
        vNode.child.blur && vNode.child.blur()
      }
    }, 50)
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
    el.appendChild(tooltip)
    el._focus = () => toTop()
    el._blur = () => toInner()
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
  const tooltip = el._tooltip
  setTimeout(() => {
    if (!vNode.child.value && !vNode.child.visible) {
      tooltip.style.left = el._input_pl + 'px'
      tooltip.style.top = ''
      vNode.child.blur && vNode.child.blur()
    } else {
      tooltip.style.left = '10px'
      tooltip.style.top = '0'
    }
  }, 50);
}
export const qkTooltip  = {
  inserted,
  update,
  unbind
}