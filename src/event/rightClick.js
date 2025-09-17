import rightMenu from '~/vnode/rightMenu'
import { isArray, isFun } from '~/opera/tools'

export default function(thisTree, v, event) {
    let options = thisTree.config
    // 高亮显示
    if(options.highlightCurrent){
        thisTree.activeElm && thisTree.activeElm.classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        thisTree.activeElm = this.elm
    }
    let menu = options.rightMenuList
    // 右键菜单是函数
    if(isFun(menu) && v) menu = menu(v)
    if(!isArray(menu) || isArray(menu) && menu.length === 0) return
    event.preventDefault()
    // let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    // let rootEl = document.querySelector(options.el)

    thisTree.isShowRightMenu = true
    thisTree.rightMenuCdata = v
    thisTree.rightMenuCdom = this.elm
    let x = 0
    let y = 0
    
    rightMenu.call(thisTree, x, y, menu)
    let menuEl = document.querySelector(`ul.eleTree-menu.menu-${thisTree.customIndex}`)
    let w = window.getComputedStyle(menuEl, null).getPropertyValue('width')
    let h = window.getComputedStyle(menuEl, null).getPropertyValue('height')
    w = parseInt(w) + 6
    h = parseInt(h) + 6

    x  = event.clientX + window.pageXOffset
    y = event.clientY + window.pageYOffset
    // 超出边界判断
    if((event.clientX + window.pageXOffset + w) > document.documentElement.scrollWidth) x -=  w
    if((event.clientY + window.pageYOffset + h) > document.documentElement.scrollHeight) y -= h
    // 判断超出顶部
    if(x < 0) x = 0
    if(y < 0) y = 0
    rightMenu.call(thisTree, x, y, menu)
}