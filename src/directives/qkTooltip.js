// 获取tooltip位置
const getPosition = function (el) {
  let left = 0
  let top = 0
  let obj = el
  while (obj.offsetParent) { // 如果obj的有最近的父级定位元素就继续
    left += obj.offsetLeft// 累加
    top += obj.offsetTop
    obj = obj.offsetParent// 更新obj,继续判断新的obj是否还有父级定位，然后继续累加
  }
  // 防止超出屏幕
  if (top - el.__tooltip.clientHeight < 0) {
    top = el.clientHeight + top + 10
  } else {
    top = top - el.__tooltip.clientHeight - 10
  }
  return { 'left': left, 'top': top }// 返回json格式
}
// 更新位置
const resetPosition = (el) => {
  const position = getPosition(el)
  el.__tooltip.style.left = position.left + 'px'
  el.__tooltip.style.top = position.top + 'px'
}

const inserted = (el, binding) => {
  const content = binding.value
  if (!content) return
  el.classList.add('form-item-tooltip')
  const tooltip = document.createElement('div')
  tooltip.className = 'form-item-tooltip-content'
  tooltip.innerHTML = binding.value
  el.__tooltip = tooltip
  el.onmouseover = () => {
    resetPosition(el)
  }
  el.appendChild(tooltip)
}

const unbind = (el) => {
  if (el.__vueWindowsResize) {
    window.removeEventListener('resize', el.__vueWindowsResize)
    delete el.__vueWindowsResize
  }
  el.onmouseover = null
  el.onmouseout = null
}

export const qkTooltip  = {
  inserted,
  unbind
}