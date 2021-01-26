import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

// 根据父节点选中情况修改字节点状态
export default function <D extends ITreeData>(thisTree: EleTree<D>, v: D) {
  let { name, key, isOpen, checked, children, disabled, isLeaf } = thisTree.config.request
  let fn = function (data: D[]) {
    data.forEach((item, index) => {
      if (!item[disabled]) {
        item[checked] = v[checked] === 2 ? 2 : 0
      } else {
        item.disabledParentStatus = v[checked] === 2 ? 2 : 0
      }
      item[children].length > 0 && fn(item[children])
    })
  }
  fn(v[children])
}
