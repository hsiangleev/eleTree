import groupVnode from '../vnode/groupVnode'
import { init } from 'snabbdom'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

export default function<D extends ITreeData>(this: EleTree<D>) {
  // 保存旧版的vnode
  let oldVnode = this.node;
  // 重新获取vnode
  this.node = this.groupVnode(this.config.data, true, true)
  patch(oldVnode!, this.node!)
}
