import { IEleTree, IRightMenuOptions, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

// 获取当前节点对应的原始数据
export default function <D extends ITreeData>(thisTree: EleTree<D>, v: D | IRightMenuOptions): D {
  let options = thisTree.config
  let { name, key, isOpen, checked, children, disabled, isLeaf, radioChecked, radioDisabled } = options.request
  let data: D = {} as D
  // 返回的数据不包括children
  Object.keys(v).forEach(attr => {
    if (attr !== children) {
      data[attr] = v[attr]
    }
  })
  if (options.showCheckbox) {
    data[checked] = v[checked] === 2
    data[disabled] = v[disabled] || false
  }
  data[isOpen] = v[isOpen] === 2 ? true : false
  data[isLeaf] = options.lazy ? (v[isLeaf] || false) : v[children].length === 0
  if (options.showRadio) {
    data[radioChecked] = v[radioChecked] === 2
    data[radioDisabled] = v[radioDisabled] || false
  }
  return data
}
