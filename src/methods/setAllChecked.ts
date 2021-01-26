import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import { recurseTree, paramDetection, updateData } from '../opera/tools'
import reloadVnode from '../vnode/reloadVnode'
export default function <D extends ITreeData>(this: EleTree<D>) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request

  recurseTree(this, (data) => {
    if (!data[disabled]) {
      data[checked] = 2
    }
  })
  updateData(this)
  this.reloadVnode()
  return this
}
