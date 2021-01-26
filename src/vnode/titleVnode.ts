import iconVnode from './iconVnode'
import dropdownVnode from './dropdownVnode'
import checkboxVnode from './checkboxVnode'
import radioVnode from './radioVnode'
import textVnode from './textVnode'
import lineHorizontal from './lineHorizontal'
import nodeClick from '../event/nodeClick'
import rightClick from '../event/rightClick'
import { mousedown, mouseup } from '../event/drag'
import { h } from 'snabbdom/h'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'
export default function <D extends ITreeData>(this: EleTree<D>, v: D, isFirst?: boolean) {
  let thisTree = this
  let options = this.config
  return h('div.eleTree-title', {
    on: {
      click: [nodeClick, this, v] as any,
      contextmenu: [rightClick, this, v] as any,
      mousedown: options.draggable ? [mousedown, this, v] as any : null,
      mouseup: options.draggable ? [mouseup, this, v] as any : null,
    }
  },
    [
      this.lineHorizontal(isFirst),
      this.dropdownVnode(v),
      this.checkboxVnode(v),
      this.radioVnode(v),
      this.iconVnode(v),
      this.textVnode(v)
    ])
}
