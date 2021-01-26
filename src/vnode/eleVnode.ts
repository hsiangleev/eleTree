import titleVnode from '../vnode/titleVnode'
import groupVnode from '../vnode/groupVnode'
import { h } from 'snabbdom/h'
import { VNode } from 'snabbdom/vnode.d'
import { symbolAttr } from '../config'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

export default function <D extends ITreeData>(this: EleTree<D>, v: D, isOpen: boolean, isFirst?: boolean): VNode {
  let options = this.config
  let { children, isOpen: isOpenAttr } = options.request
  return h('div.eleTree-node', {
    style: {
      display: isOpen && !v[symbolAttr.isHideNode] ? 'block' : 'none'     // 显示条件（展开并且非隐藏的时候）
    },
    key: v.id,
  },
    [
      this.titleVnode(v, isFirst),
      v[symbolAttr.isRenderChild] ? this.groupVnode(v[children] || [], v[isOpenAttr] === 2) : null
    ]
  )
}
