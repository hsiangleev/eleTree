
import rightMenu from '~/vnode/rightMenu'
import { symbolAttr } from '~/config'
export default function() {
    let thisTree = this
    document.addEventListener('click', ()=>{
        if(thisTree.config.rightMenuList.length === 0 || !thisTree.isShowRightMenu) return
        // 右键菜单隐藏
        thisTree.isShowRightMenu = false
        rightMenu.call(thisTree)
    })
    document.addEventListener('contextmenu', (event)=>{
        if(thisTree.config.rightMenuList.length === 0 || !thisTree.isShowRightMenu) return
        // 判断是否右键当前节点
        let el = event.target
        // 判断是否是同一棵树
        let rootEl = document.querySelector(thisTree.config.el)
        let isCroot = el
        while (isCroot && !rootEl.isEqualNode(isCroot)) {
            isCroot = isCroot.parentNode
        }
        // 是否右键node节点
        let isNode = el.classList.contains('eleTree-title') || el.parentNode.classList && el.parentNode.classList.contains('eleTree-title')
        if(!isCroot || isCroot && !isNode){
            // 右键菜单隐藏
            thisTree.isShowRightMenu = false
            rightMenu.call(thisTree)
        }
    })
}