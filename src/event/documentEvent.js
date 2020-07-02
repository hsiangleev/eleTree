
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
        if(el.classList.contains('eleTree-title')) return
        if(el.parentNode.classList && el.parentNode.classList.contains('eleTree-title')) return
        // 右键菜单隐藏
        thisTree.isShowRightMenu = false
        rightMenu.call(thisTree)
    })
}