import { h } from 'snabbdom/h'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'
export default function <D extends ITreeData>(this: EleTree<D>) {
  return h('div.eleTree-empty-text', this.config.emptText)
}
