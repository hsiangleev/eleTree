import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import { recurseTree, updateData } from '../opera/tools'
import reloadVnode from '../vnode/reloadVnode'
/**
 * 关闭所有展开项
 */
export default function <D extends ITreeData>(this: EleTree<D>) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  recurseTree(this, (data) => {
    if (data[isOpen] !== 0) {
      data[isOpen] = 0
    }
  })
  updateData(this)
  this.reloadVnode()
  return this
}
