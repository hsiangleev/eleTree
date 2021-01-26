
import rightMenu from '../vnode/rightMenu'
import { symbolAttr } from '../config'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'
export default function <D extends ITreeData>(this: EleTree<D>) {
  let thisTree = this
  document.addEventListener('click', () => {
    if (thisTree.config.rightMenuList.length === 0 || !thisTree.isShowRightMenu) return
    // 右键菜单隐藏
    thisTree.isShowRightMenu = false
    rightMenu(thisTree)
  })
  document.addEventListener('contextmenu', (event) => {
    if (thisTree.config.rightMenuList.length === 0 || !thisTree.isShowRightMenu) return
    // 判断是否右键当前节点
    let el = event.target as HTMLElement
    // 判断是否是同一棵树
    let rootEl = document.querySelector(thisTree.config.el) as HTMLElement
    let isCroot = el
    while (isCroot && !rootEl.isEqualNode(isCroot)) {
      isCroot = isCroot.parentNode as HTMLElement
    }
    // 是否右键node节点
    let isNode = el.classList.contains('eleTree-title') || (el.parentNode as HTMLElement).classList && (el.parentNode as HTMLElement).classList.contains('eleTree-title')
    if (!isCroot || isCroot && !isNode) {
      // 右键菜单隐藏
      thisTree.isShowRightMenu = false
      rightMenu(thisTree)
    }
  })
}
