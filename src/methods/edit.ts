import { ITreeData, IEleTree, IEditEventType } from '../interface'
import { EleTree } from '../eleTree'
import reloadVnode from '../vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateData, isArray, isObject, isString, isNumber } from '../opera/tools'
import { symbolAttr } from '../config'
/**
 * 添加子节点
 * @param {*查找节点id} id
 * @param {*当前编辑的节点类型，对应触发的回调事件名称，[edit|add_child|add_before|add_after]} editNodeType
 */
export default function <D extends ITreeData>(this: EleTree<D>, id: string | number | D, editNodeType?: IEditEventType) {
  let options = this.config
  let { key, isOpen, checked, children, disabled, isLeaf, pid } = options.request

  let cData = id
  if (isString(cData) || isNumber(cData)) {
    cData = getNodeDataById(this, cData) as D
  }
  if (!cData) return this
  cData[symbolAttr.editNodeType] = editNodeType || 'edit'
  this.reloadVnode()
  let text_edit = document.querySelector(options.el + ' .eleTree-text_edit') as HTMLInputElement
  if (!text_edit) return this
  text_edit.focus()
  text_edit.select()

  return this
}
