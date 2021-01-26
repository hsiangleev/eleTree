import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import { recurseTree, paramDetection, updateData, getNodeDataById } from '../opera/tools'
import reloadVnode from '../vnode/reloadVnode'
import { symbolAttr } from '../config'
/**
 * 在原来的选中项基础上增加选中项
 * @param {*需要设置的选中项} checkArr
 * @param {*是否先清空原有的选中项，默认true} isUnCheckAll
 */
export default function <D extends ITreeData>(this: EleTree<D>, checkArr: string[] = [], isUnCheckAll = true) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf, radioChecked, radioDisabled } = options.request

  if (paramDetection(checkArr, 'Array', 'setRadioChecked方法第一个参数必须为Array')) return this
  if (paramDetection(isUnCheckAll, 'Boolean', 'setRadioChecked方法第二个参数必须为Boolean')) return this
  if (checkArr.length === 0) return this

  if (options.radioType === 'all') {
    let cData = getNodeDataById(this, checkArr[checkArr.length - 1]) as D
    cData[radioChecked] = 2
    // 上一次和这一次选的不一样
    if (this.currentRadioCheckedData && this.currentRadioCheckedData[key] !== cData[key]) {
      this.currentRadioCheckedData[radioChecked] = 0
    }
    this.currentRadioCheckedData = cData
  } else if (options.radioType === 'level') {
    recurseTree(this, (v) => {
      if (!v[radioDisabled]) {
        if (isUnCheckAll) {
          v[radioChecked] = 0
        }
        if (checkArr.includes(v[key])) {
          let data: D[] = v[symbolAttr.parentNode] ? v[symbolAttr.parentNode][children] : options.data
          // 判断当前是否被选中
          if (v[radioChecked] !== 2) {
            // 取消同级节点的选中
            let radioCheckedSib = data.filter(item => item[radioChecked] === 2)[0]
            if (radioCheckedSib) radioCheckedSib[radioChecked] = 0
            v[radioChecked] = 2
          }
        }
      }
    })
  }

  updateData(this)
  this.reloadVnode()
  return this
}
