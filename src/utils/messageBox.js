import { merge } from 'lodash'
import { MessageBox } from 'element-ui'

// ----------------- 确认框 ---------------
export const disableConfirm = function(content = '此操作将禁用此数据, 是否继续?', title = '提示', config = {}) {
  return confirm(content, title, config)
}
export const deleteConfirm = function(content = '此操作将删除此数据, 是否继续?', title = '提示', config = {}) {
  return confirm(content, title, config)
}
// 确认提示
export const confirm = function(content, title = '提示', config = {}) {
  return MessageBox.confirm(content, title, merge({
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }, config))
}