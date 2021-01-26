import { h } from 'snabbdom/h'
import { EleTree } from '../eleTree'
import { ITreeData } from '../interface'
export default function <D extends ITreeData>(this: EleTree<D>, isFirst?: boolean) {
  let options = this.config
  let l = -1 * options.indent + 6
  return !isFirst && options.showLine ? h('i.eleTree-line-horizontal', {
    style: {
      position: 'absolute',
      borderTop: '1px dotted #666',
      width: -1 * l + 'px',
      left: l + 1 + 'px',
      top: '11px'
    }
  }) : null
}
