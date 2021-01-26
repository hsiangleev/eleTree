import { ITreeData, IEleTree, IEmitPayloadOtherOptions } from '../interface'
import { EleTree } from '../eleTree'
import reloadVnode from '../vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateData } from '../opera/tools'
import { symbolAttr } from '../config'
import { emit } from '../event/customEvent'
import { showLoding, removeLoding } from '../vnode/loadingVnode'
import remove from './remove'
import getCurrentNodeData from '../opera/getCurrentNodeData'

export function emitEvent<D extends ITreeData>(thisTree: EleTree<D>, cData: D, eventName: string, successCallback: Function, otherOpt?: MapLike<any>) {
  // 判断是否有edit回调函数
  if (!thisTree.eventList[eventName]) {
    successCallback()
    return
  }
  thisTree.showLoding()
  let another: IEmitPayloadOtherOptions<D> = {
    load: () => {
      thisTree.removeLoding()
      successCallback()
    },
    stop: () => {
      thisTree.removeLoding()
    }
  }
  // 如果节点右键则返回当前右键节点的数据
  thisTree.rightMenuCdata && (another.rightClickData = getCurrentNodeData<D>(thisTree, thisTree.rightMenuCdata as D))
  thisTree.emit({ v: cData, type: eventName, otherOpt: Object.assign({}, otherOpt, another) })
}
// 粘贴初始化
const pasteInit = function <D extends ITreeData>(thisTree: EleTree<D>, pasteType: string) {
  let options = thisTree.config
  let { key, isOpen, checked, children, disabled, isLeaf, pid } = options.request
  let pasteData = thisTree.rightMenuPasteData as D
  if (!pasteData) return
  if (pasteData[symbolAttr.isPasteNode]) pasteType = 'move'        // 剪贴的节点不修改id
  // 深层copy，并且修改id，防止与原始的节点冲突
  let f = (data: D) => {
    let obj = Array.isArray(data) ? [] : {}
    Object.keys(data).forEach(v => {
      obj[v] = typeof data[v] === 'object'
        ? f(data[v])
        : (v === key && pasteType === 'paste') ? thisTree.customIndex++ : data[v]
    })
    return obj as D
  }
  // 判断是否为剪贴的节点
  if (pasteData[symbolAttr.isPasteNode]) {
    thisTree.remove([pasteData[key]])
  }
  return f(pasteData)
}
// 粘贴到前还是后
const pasteTypeFn = function <D extends ITreeData>(thisTree: EleTree<D>, cData: D, type: string, pasteType: string) {
  let options = thisTree.config
  let { key, isOpen, checked, children, disabled, isLeaf, pid } = options.request
  let newData = pasteInit(thisTree, pasteType)
  if (!newData) return
  let pData = cData[symbolAttr.parentNode] as D
  // 根节点判断
  if (pData) {
    let index = (pData[children] as D[]).findIndex(v => v[key] === cData[key])
    index = type === 'before' ? index : index + 1
    pData[children].splice(index, 0, newData)
  } else {
    let index = options.data.findIndex(v => v[key] === cData[key])
    index = type === 'before' ? index : index + 1
    options.data.splice(index, 0, newData)
  }
  updateData(thisTree)
  thisTree.reloadVnode()
}
// 传id或者id为空直接传cData，后者内部调用
export function copy<D extends ITreeData>(this: EleTree<D>, id: string, currData: D) {
  let options = this.config
  if (paramDetection(id, 'String|Number', 'copy方法第一个参数必须为String|Number')) return this

  let cData = currData || getNodeDataById(this, id)
  emitEvent(this, cData, 'copy', () => {
    // 先取消上次的节点剪贴
    if (this.rightMenuPasteData) this.rightMenuPasteData[symbolAttr.isPasteNode] = false
    // 数据放入剪贴板
    this.rightMenuPasteData = cData
    this.reloadVnode()
  })
  return this
}
export function cutPaste<D extends ITreeData>(this: EleTree<D>, id: string, currData?: D) {
  let options = this.config
  if (paramDetection(id, 'String|Number', 'cutPaste方法第一个参数必须为String|Number')) return this

  let cData = currData || getNodeDataById(this, id) as D
  emitEvent(this, cData, 'cut_paste', () => {
    if (this.rightMenuPasteData) this.rightMenuPasteData[symbolAttr.isPasteNode] = false
    cData[symbolAttr.isPasteNode] = true
    // 数据放入剪贴板
    this.rightMenuPasteData = cData
    this.reloadVnode()
  })
  return this
}
/**
 * 粘贴或移动节点
 * @param {*} methods
 * @param {*} id
 * @param {*粘贴到子节点，节点前，节点后(children,before,after)} nodeType
 * @param {*} currData
 * @param {*是粘贴还是移动(paste,move)，移动不改变id} pasteType
 */
export function paste<D extends ITreeData>(this: EleTree<D>, id: string, nodeType: 'before' | 'after' | 'children' = 'children', currData?: D, pasteType: 'paste' | 'move' = 'paste') {
  let options = this.config
  let { key, isOpen, checked, children, disabled, isLeaf, pid } = options.request
  if (paramDetection(id, 'String|Number', 'paste方法第一个参数必须为String|Number')) return this
  if (paramDetection(id, 'String', 'paste方法第二个参数必须为String')) return this

  let cData = currData || getNodeDataById(this, id) as D
  if (nodeType === 'children') {
    emitEvent(this, cData, 'paste', () => {
      let newData = pasteInit(this, pasteType)
      if (!newData) return
      cData[children].push(newData)
      updateData(this)
      this.reloadVnode()
    })
  } else if (nodeType === 'before') {
    emitEvent(this, cData, 'paste_before', () => {
      pasteTypeFn(this, cData, 'before', pasteType)
    })
  } else if (nodeType === 'after') {
    emitEvent(this, cData, 'paste_after', () => {
      pasteTypeFn(this, cData, 'after', pasteType)
    })
  }
  return this
}
