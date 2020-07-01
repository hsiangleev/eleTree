
import reloadVnode from '~/vnode/reloadVnode'
import rightMenu from '~/vnode/rightMenu'
import { symbolAttr } from '~/config'

export default function(options, v, event) {
    // 高亮显示
    if(options.highlightCurrent){
        options[symbolAttr.activeElm] && options[symbolAttr.activeElm].classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        options[symbolAttr.activeElm] = this.elm
    }
    if(options.rightMenuList.length === 0) return
    event.preventDefault()
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let rootEl = document.querySelector(options.el)

    options[symbolAttr.isShowRightMenu] = true
    options[symbolAttr.rightMenuCdata] = v
    options[symbolAttr.rightMenuCdom] = event.target.parentNode
    let x  = event.clientX + window.scrollX - rootEl.offsetLeft
    let y = event.clientY + window.scrollY - rootEl.offsetTop
    
    rightMenu(options, x, y)

    reloadVnode(options)
}