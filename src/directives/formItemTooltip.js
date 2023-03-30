const bindFromItemTooltip = (el, binding) => {
  const content = binding.value
  if (!content) return
  el.classList.add('form-item-tooltip')
  const tooltip = document.createElement('div')
  tooltip.className = 'form-item-tooltip-content'
  tooltip.innerHTML = binding.value
  el.__tooltip = tooltip
  el.appendChild(tooltip)
  
  const getPosition = function (obj) {
    let left = 0
    let top = 0
    while (obj.offsetParent) { // 如果obj的有最近的父级定位元素就继续
      left += obj.offsetLeft// 累加
      top += obj.offsetTop
      obj = obj.offsetParent// 更新obj,继续判断新的obj是否还有父级定位，然后继续累加
    }
    return { 'left': left, 'top': top }// 返回json格式
  }
  const resetPosition = () => {
    const position = getPosition(el)
    el.__tooltip.style.left = position.left + 'px'
    el.__tooltip.style.top = position.top + 'px'
  }
  resetPosition()
  el.__vueWindowsResize = resetPosition
  window.addEventListener('resize', resetPosition)
}

const unbindFormItemTooltip = (el) => {
  if (el.__vueWindowsResize) {
    window.removeEventListener('resize', el.__vueWindowsResize)
    delete el.__vueWindowsResize
  }
}

export const formItemTooltip  = {
  inserted: bindFromItemTooltip,
  unbind: unbindFormItemTooltip
}