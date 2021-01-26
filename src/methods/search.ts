import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import reloadVnode from '../vnode/reloadVnode'
import { paramDetection, updateData } from '../opera/tools'
import { symbolAttr } from '../config'
/**
 * 搜索节点
 * @param {*传入搜索的文本值，传空则显示所有节点} value
 * @param {*搜索条件，返回值为true则显示该节点} callback
 */
export default function <D extends ITreeData>(this: EleTree<D>, value: string, callback: Function) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  value = value || ''
  if (paramDetection(value, 'String|Number', 'search方法第一个参数必须为String|Number')) return this
  if (paramDetection(callback, 'Function', 'search方法第二个参数必须为Function')) return this

  let f = (data: D[]) => {
    for (let i = 0; i < data.length; i++) {
      // 节点不包含搜索信息
      if (!callback(value, data[i])) {
        data[i][symbolAttr.isHideNode] = true
      } else if (value === '') {
        // 搜索条件为空显示所有，但不向父层递归（因为所有节点都满足条件）
        data[i][symbolAttr.isHideNode] = false
      } else {
        // 搜索到节点，显示节点的同时显示父层节点
        data[i][symbolAttr.isHideNode] = false
        changePData(data[i][symbolAttr.parentNode])
      }
      if (data[i][children].length > 0) {
        f(data[i][children])
      }
    }
  }
  // 修改父节点信息
  let changePData = (pData: D) => {
    if (!pData) return
    pData[symbolAttr.isHideNode] = false
    pData[isOpen] = 2
    changePData(pData[symbolAttr.parentNode])
  }

  f(options.data)

  updateData(this)
  this.reloadVnode()
  return this
}
