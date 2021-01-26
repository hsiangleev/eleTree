import { copy, paste, emitEvent } from '../methods/copy'
import remove from '../methods/remove'
import getCurrentNodeData from '../opera/getCurrentNodeData'
import { symbolAttr } from '../config'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'
import { VNode } from 'snabbdom/vnode.d'

let count = 0
let thisTree: EleTree<any> | null = null
let v: any = null
let that: VNode | Element | null = null
let isOnce = false
let isDrag = false
// 一次性函数
function once(callback: Function) {
  if (isOnce) return
  callback()
  isOnce = true
}
export function mousedown<D extends ITreeData>(this: VNode | Element, tree: EleTree<D>, item: D) {
  thisTree = tree
  v = item
  that = this
  console.log('that', that)
  count = 0
  isOnce = false
  isDrag = false
  let options = thisTree.config
  let rootEl = document.querySelector(options.el) as HTMLElement
  rootEl.style['-webkit-user-select'] = 'none'
  rootEl.style['-moz-user-select'] = 'none'
  rootEl.style['-ms-user-select'] = 'none'
  rootEl.style['user-select'] = 'none'
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}

export function mousemove<D extends ITreeData>(this: Document, event: MouseEvent) {
  let options = thisTree!.config
  console.log('that', that)
  let textEl = ((that as VNode).elm as Element).querySelector('.eleTree-text')
  count++
  if (count < 3 || !textEl) return
  isDrag = true
  let rootEl = document.querySelector(options.el) as HTMLElement
  let x = event.clientX + window.pageXOffset - rootEl.offsetLeft
  let y = event.clientY + window.pageYOffset - rootEl.offsetTop
  once(() => {
    let text = (((that as VNode).elm as Element).querySelector('.eleTree-text') as HTMLElement).innerText
    let cloneEl = document.createElement('span')
    cloneEl.innerText = text
    cloneEl.classList.add('eleTree-cloneElm')
    cloneEl.style['top'] = y + 'px'
    cloneEl.style['left'] = x + 'px'
    rootEl.appendChild(cloneEl)

    thisTree!.rightMenuPasteData = v as D
    thisTree!.copy('', v)
  })

  let cloneEl = rootEl.querySelector('.eleTree-cloneElm') as HTMLElement
  if (cloneEl) {
    cloneEl.style['top'] = y + 3 + 'px'
    cloneEl.style['left'] = x + 3 + 'px'
  }
}

// 判断是否是父级节点放到子级节点
function isPNode<D extends ITreeData>(item: D, v: VNode, key: string) {
  let pItem = item[symbolAttr.parentNode]
  let isPitem = false
  while (pItem) {
    if (pItem[key] === v[key]) {
      isPitem = true
      pItem = null
    } else {
      pItem = pItem[symbolAttr.parentNode]
    }
  }
  return isPitem
}
export function mouseup<D extends ITreeData>(this: Document | VNode, treeOrEvent: MouseEvent): void;
export function mouseup<D extends ITreeData>(this: Document | VNode, treeOrEvent: EleTree<D>, item: D): void;
export function mouseup<D extends ITreeData>(this: Document | VNode, treeOrEvent: EleTree<D> | MouseEvent, item?: D, event?: MouseEvent) {
  if (!thisTree) return
  let options = thisTree.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  let rootEl = document.querySelector(options.el) as HTMLElement
  let cloneEl = document.querySelector('.eleTree-cloneElm')
  cloneEl && cloneEl.parentNode!.removeChild(cloneEl)
  if (isDrag) {
    if (!item && !event) event = treeOrEvent as MouseEvent
    if ((this as VNode).elm && options.el === thisTree.config.el) {
      // 开始移动和停止移动不是同一个
      const tree = treeOrEvent as EleTree<D>
      if (tree.rightMenuPasteData && v[key] !== item![key] && !isPNode(item!, v, key)) {
        emitEvent(tree, v, 'drag', () => {
          tree.remove([tree.rightMenuPasteData![key]])
          tree.paste('', 'children', item!, 'move')
        }, {
          endData: getCurrentNodeData<D>(tree, item!),
          range: 'inner'
        })
      }
    } else if ((event!.target as Element).isEqualNode(rootEl)) {
      // 移动到根节点
      let item = options.data[options.data.length - 1]
      emitEvent(thisTree, v, 'drag', () => {
        thisTree!.remove([thisTree!.rightMenuPasteData[key]])
        thisTree!.paste('', 'after', item, 'move')
      }, {
        endData: getCurrentNodeData(thisTree, item),
        range: 'outer'
      })
    }
    rootEl!.style['-webkit-user-select'] = 'auto'
    rootEl!.style['-moz-user-select'] = 'auto'
    rootEl!.style['-ms-user-select'] = 'auto'
    rootEl!.style['user-select'] = 'auto'
  }

  document.removeEventListener('mousemove', mousemove)
  document.removeEventListener('mouseup', mouseup)
}
