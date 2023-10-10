import Vue from 'vue'
import Main from './index.vue'
const Dialog = Vue.extend(Main)

let instance
const instances = []
let seed = 1

const DialogBox = function (options) {
  options = options || {}
  const id = 'dialog_' + seed++

  options.onClose = (closeCb) => {
    DialogBox.close(id, closeCb)
  }
  if (options.width && typeof options.width === 'number' && !isNaN(options.width)) {
    options.width = options.width + 'px'
  }
  instance = new Dialog({
    data: options,
    parent: this.$root
  })
  instance.vm = instance.$mount()
  instance.id = id
  instance.close = () => {
    document.body.removeChild(instance.vm.$el)
    instance.$destroy()
  }
  document.body.appendChild(instance.vm.$el)
  instances.push(instance)
  return instance.vm
}

DialogBox.close = function(id, onClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof onClose === 'function') {
        onClose(instances[i])
      }
      // 释放内存
      instances[i].$destroy()
      document.body.removeChild(instances[i].vm.$el)
      instances.splice(i, 1)
      break
    }
  }
}

DialogBox.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default DialogBox
