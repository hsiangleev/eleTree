import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import { recurseTree, updateData } from '../opera/tools'
import reloadVnode from '../vnode/reloadVnode'
import { symbolAttr } from '../config'
/**
 * 展开所有项（懒加载情况下只展开已经懒加载过的节点）
 */
export default function <D extends ITreeData>(this: EleTree<D>) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  recurseTree(this, (data) => {
    // 懒加载情况
    if (options.lazy) {
      if (data[symbolAttr.isLazyNode] && data[isOpen] !== 2) {
        data[isOpen] = 2
      }
    } else if (data[isOpen] !== 2) {
      data[isOpen] = 2
    }
  })
  updateData(this)
  this.reloadVnode()
  return this
}
