import rightMenu from '~/vnode/rightMenu'

export default function(thisTree, v, event) {
    let options = thisTree.config
    // 高亮显示
    if(options.highlightCurrent){
        thisTree.activeElm && thisTree.activeElm.classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        thisTree.activeElm = this.elm
    }
    if(options.rightMenuList.length === 0) return
    event.preventDefault()
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let rootEl = document.querySelector(options.el)

    thisTree.isShowRightMenu = true
    thisTree.rightMenuCdata = v
    thisTree.rightMenuCdom = event.target.parentNode
    let x  = event.clientX + window.pageXOffset - rootEl.offsetLeft
    let y = event.clientY + window.pageYOffset - rootEl.offsetTop
    
    rightMenu.call(thisTree, x, y)
}