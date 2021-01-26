import { IEleTree, IRightMenuOptions, ITreeData } from '../interface'
import { EleTree } from '../eleTree'
import rightMenu from '../vnode/rightMenu'
import { VNode } from 'snabbdom/vnode.d'

export default function <D extends ITreeData>(this: VNode, thisTree: EleTree<D>, v: IRightMenuOptions, event: MouseEvent) {
  let options = thisTree.config
  // 高亮显示
  if (options.highlightCurrent) {
    thisTree.activeElm && thisTree.activeElm.classList.remove('eleTree-title-active');
    (this.elm as HTMLElement).classList!.add('eleTree-title-active')
    thisTree.activeElm = this.elm as HTMLElement
  }
  if (options.rightMenuList.length === 0) return
  event.preventDefault()
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  let rootEl = document.querySelector(options.el) as HTMLElement

  thisTree.isShowRightMenu = true
  thisTree.rightMenuCdata = v
  thisTree.rightMenuCdom = this.elm as HTMLElement
  let x = 0
  let y = 0

  rightMenu(thisTree, x, y)
  let menuEl = rootEl.querySelector('.eleTree-menu') as HTMLElement
  let w: string | number = window.getComputedStyle(menuEl, null).getPropertyValue('width')
  let h: string | number = window.getComputedStyle(menuEl, null).getPropertyValue('height')
  w = parseInt(w, 10) + 6
  h = parseInt(h, 10) + 6

  x = event.clientX + window.pageXOffset - rootEl.offsetLeft
  y = event.clientY + window.pageYOffset - rootEl.offsetTop
  // 超出边界判断
  if ((event.clientX + window.pageXOffset + w) > document.documentElement.scrollWidth) x -= w
  if ((event.clientY + window.pageYOffset + h) > document.documentElement.scrollHeight) y -= h
  rightMenu(thisTree, x, y)
}
