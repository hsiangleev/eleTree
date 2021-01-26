import { h } from 'snabbdom/h'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'
export default function <D extends ITreeData>(this: EleTree<D>, isFirst?: boolean) {
  let l = -1 * this.config.indent + 6
  return !isFirst && this.config.showLine ? h('i.eleTree-line-vertical', {
    style: {
      position: 'absolute',
      borderLeft: '1px dotted #666',
      height: '100%',
      left: l + 'px',
    }
  }) : null
}
