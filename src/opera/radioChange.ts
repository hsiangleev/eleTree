import { symbolAttr } from '../config'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'
export default function <D extends ITreeData>(thisTree: EleTree<D>, v: D) {
  let options = thisTree.config
  let { name, key, isOpen, checked, children, disabled, isLeaf, radioChecked } = options.request

  if (options.radioType === 'level') {
    let data: D[] = v[symbolAttr.parentNode] ? v[symbolAttr.parentNode][children] : options.data
    // 判断当前是否被选中
    if (v[radioChecked] === 2) {
      v[radioChecked] = 0
    } else {
      // 查找被选中的同级节点
      let radioCheckedSib = data.filter(item => item[radioChecked] === 2)[0]
      if (radioCheckedSib) radioCheckedSib[radioChecked] = 0
      v[radioChecked] = 2
    }
  } else if (options.radioType === 'all') {
    v[radioChecked] = v[radioChecked] === 2 ? 0 : 2
    // 如果有选中项
    if (thisTree.currentRadioCheckedData) {
      // 上一次和这一次选的是否一样
      if (thisTree.currentRadioCheckedData[key] !== v[key]) {
        thisTree.currentRadioCheckedData[radioChecked] = 0
        thisTree.currentRadioCheckedData = v
      } else {
        // 两次选的一样
        thisTree.currentRadioCheckedData = null
      }
    } else {
      thisTree.currentRadioCheckedData = v
    }
  }
}
