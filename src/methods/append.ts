import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import reloadVnode from '../vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateData, isArray, isObject } from '../opera/tools'
import { symbolAttr } from '../config'

/**
 * 添加子节点
 * @param {*查找节点id，传null或空字符串则会添加到根节点, 不传则代表数据结构为pid} id
 * @param {*添加的子节点数据} data
 */
export default function <D extends ITreeData>(this: EleTree<D>, id: string | D | D[], data: D | D[]) {
  let options = this.config
  let { key, isOpen, checked, children, disabled, isLeaf, pid } = options.request

  // 省略id, pid格式添加
  if (isObject(id) || isArray(id)) {
    data = (isObject(id) ? [id] : id) as D[]
    for (let i = 0; i < data.length; i++) {
      let id = data[i][pid]
      // 根节点
      if (id === options.defaultPid) {
        options.data = options.data.concat([data[i]])
      } else {
        let cData = getNodeDataById(this, id)
        if (!cData) continue      // 没找到
        cData[children] = cData[children] ? cData[children].concat([data[i]]) : [data[i]]
        // 添加子节点的时候自动展开当前节点
        cData[isOpen] = 2
        cData[symbolAttr.isRenderChild] = true
      }
    }
    updateData(this)
    this.reloadVnode()
    return this
  }

  if (!isArray(data)) {
    data = [data] as D[]
  }
  // 添加到最外层
  if (!id) {
    options.data = options.data.concat(data)
    updateData(this)
    this.reloadVnode()
    return this
  }

  let cData = getNodeDataById(this, id)
  if (!cData) return this      // 没找到
  cData[children] = cData[children].concat(data)
  // 添加子节点的时候自动展开当前节点
  cData[isOpen] = 2
  cData[symbolAttr.isRenderChild] = true
  updateData(this, cData)
  this.reloadVnode()
  return this
}
