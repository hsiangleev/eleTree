import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import reloadVnode from '../vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateData, isObject, isArray } from '../opera/tools'
import { symbolAttr } from '../config'
/**
 * 修改当前节点
 * @param {*查找节点id} id
 * @param {*添加的子节点数据} data
 */
export default function <D extends ITreeData>(this: EleTree<D>, id: string | D | D[], data: D | D[]) {
  let options = this.config
  let { key, isOpen, checked, children, disabled, isLeaf, pid } = options.request

  // if(paramDetection(id, 'String|Number', 'updateKeySelf方法第一个参数必须为String|Number')) return this
  // if(paramDetection(data, 'Object', 'updateKeySelf方法第二个参数必须为Object')) return this

  // pid格式更新(更改pid则为移动节点)
  if (isObject(id) || isArray(id)) {
    data = (isObject(id) ? [id] : id) as D[]
    for (let i = 0; i < data.length; i++) {
      let pId = data[i][pid]
      let id = data[i][key]
      let cData = getNodeDataById(this, id) as D
      // 没找到
      if (!cData) continue
      let pData = cData[symbolAttr.parentNode]

      // 父节点不变，只更新节点，不移动
      if (pData && pId === pData[key]) {
        Object.keys(data[i]).forEach(v => cData![v] = data[i][v])
        continue
      }
      // 移动并更新节点（先删后插）
      let d = pData ? pData[children] : options.data as D[]
      let index = d.findIndex((v: D) => v[key] === cData![key])
      let removeDate = d.splice(index, 1)
      Object.keys(data[i]).forEach(v => removeDate[0][v] = data[i][v])
      let newPData = getNodeDataById(this, pId)
      if (!newPData) {
        // 移动到根节点
        if (pId === options.defaultPid) {
          options.data.push(removeDate[0])
        }
        continue
      }
      newPData[children] ? (newPData[children].push(removeDate[0])) : (newPData[children] = removeDate)
      newPData[isOpen] = 2
      newPData[symbolAttr.isRenderChild] = true
    }
    updateData(this)
    this.reloadVnode()
    return this
  }

  let cData = getNodeDataById(this, id)
  // 没找到
  if (!cData) return this
  let pData = cData[symbolAttr.parentNode]
  // 根节点判断
  if (!pData) {
    let index = options.data.findIndex(v => v[key] === id)
    Object.keys(data).forEach(v => (v !== children) && (options.data[index][v] = data[v]))
    updateData(this)
  } else {
    Object.keys(data).forEach(v => (v !== children) && (cData![v] = data[v]))
    updateData(this, cData)
  }
  this.reloadVnode()
  return this
}
