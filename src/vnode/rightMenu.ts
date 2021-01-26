import { h, init } from 'snabbdom'
import rightClickEvent from '../event/rightClickEvent'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { IEleTree, IRightMenuOptions, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

export default function <D extends ITreeData>(thisTree: EleTree<D>, left?: number, top?: number) {
  let options = thisTree.config
  let menu = options.rightMenuList
  const defaultList = [
    { name: '复制', value: 'copy' },
    { name: '粘贴', value: 'paste' },
    { name: '粘贴到前', value: 'paste_before' },
    { name: '粘贴到后', value: 'paste_after' },
    { name: '剪贴', value: 'cut_paste' },
    { name: '编辑', value: 'edit' },
    { name: '删除', value: 'remove' },
    { name: '添加到子', value: 'add_child' },
    { name: '添加到前', value: 'add_before' },
    { name: '添加到后', value: 'add_after' },
  ]
  const menuList: IRightMenuOptions[] = menu.map((v: IRightMenuOptions | string) => {
    let obj: IRightMenuOptions = {} as IRightMenuOptions
    if (typeof v === 'string') {
      let l = defaultList.filter(item => item.value === v)[0]
      if (l) {
        obj = l
      } else {
        obj.name = v
        obj.value = v
      }
    } else {
      obj = v
    }
    return obj
  })
  let oldNode = thisTree.rightMenuNode
  if (!oldNode) {
    oldNode = document.createElement('div')
    document.querySelector(options.el)!.appendChild(oldNode)
  }
  thisTree.rightMenuNode = h('ul.eleTree-menu', {
    style: {
      display: thisTree.isShowRightMenu ? 'block' : 'none',
      left: left + 'px',
      top: top + 'px',
    }
  }, menuList.map(v => {
    return h('li', {
      style: (v.value === 'paste' || v.value === 'paste_before' || v.value === 'paste_after') && !thisTree.rightMenuPasteData ? { color: '#ccc' } : {},
      on: {
        click: (e: Event) => rightClickEvent(thisTree, v, e as MouseEvent)
      }
    }, v.name)
  }))
  patch(oldNode, thisTree.rightMenuNode)
}
