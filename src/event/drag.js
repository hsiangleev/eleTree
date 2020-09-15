import { copy, paste, emitEvent } from '~/methods/copy'
import remove from '~/methods/remove'
import getCurrentNodeData from '~/opera/getCurrentNodeData'
import { symbolAttr } from '~/config'

let count = 0
let thisTree = null
let v = null
let that = null
let isOnce = false
let isDrag = false
// 一次性函数
function once(callback) {
    if(isOnce) return
    callback()
    isOnce = true
}
export function mousedown(tree, item) {
    thisTree = tree
    v = item
    that = this
    count = 0
    isOnce = false
    isDrag = false
    let options = thisTree.config
    let rootEl = document.querySelector(options.el)
    rootEl.style['-webkit-user-select'] = 'none'
    rootEl.style['-moz-user-select'] = 'none'
    rootEl.style['-ms-user-select'] = 'none'
    rootEl.style['user-select'] = 'none'
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
}

export function mousemove(event) {
    let options = thisTree.config
    let textEl = that.elm.querySelector('.eleTree-text')
    count++
    if(count < 3 || !textEl) return
    isDrag = true
    let rootEl = document.querySelector(options.el)
    let x  = event.clientX + window.pageXOffset - rootEl.offsetLeft
    let y = event.clientY + window.pageYOffset - rootEl.offsetTop
    once(()=>{
        let text = that.elm.querySelector('.eleTree-text').innerText
        let cloneEl = document.createElement('span')
        cloneEl.innerText = text
        cloneEl.classList.add('eleTree-cloneElm')
        cloneEl.style['top'] = y + 'px'
        cloneEl.style['left'] = x + 'px'
        rootEl.appendChild(cloneEl)
        
        thisTree.rightMenuPasteData = v
        copy.call(thisTree, null, '', v)
    })
    
    let cloneEl = rootEl.querySelector('.eleTree-cloneElm')
    if(cloneEl){
        cloneEl.style['top'] = y + 3 + 'px'
        cloneEl.style['left'] = x + 3 + 'px'
    }
}

// 判断是否是父级节点放到子级节点
function isPNode(item, v, key){
    let pItem = item[symbolAttr.parentNode]
    let isPitem = false
    while(pItem){
        if(pItem[key] === v[key]){
            isPitem = true
            pItem = null
        }else{
            pItem = pItem[symbolAttr.parentNode]
        }
    }
    return isPitem
}

export function mouseup(tree, item, event) {
    if(!thisTree) return
    let options = thisTree.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let rootEl = document.querySelector(options.el)
    let cloneEl = document.querySelector('.eleTree-cloneElm')
    cloneEl && cloneEl.parentNode.removeChild(cloneEl)
    if(isDrag){
        if(!item && !event) event = tree
        if(this.elm && options.el === thisTree.config.el){
            // 开始移动和停止移动不是同一个
            if(tree.rightMenuPasteData && v[key] !== item[key] && !isPNode(item, v, key)){
                emitEvent.call(tree, v, 'drag', ()=>{
                    remove.call(tree, null, [tree.rightMenuPasteData[key]])
                    paste.call(tree, null, '', 'children', item, 'move')
                }, {
                    endData: getCurrentNodeData.call(tree, item),
                    range: 'inner'
                })
            }
        }else if(event.target.isEqualNode(rootEl)){
            // 移动到根节点
            let item = options.data[options.data.length - 1]
            emitEvent.call(thisTree, v, 'drag', ()=>{
                remove.call(thisTree, null, [thisTree.rightMenuPasteData[key]])
                paste.call(thisTree, null, '', 'after', item, 'move')
            }, {
                endData: getCurrentNodeData.call(thisTree, item),
                range: 'outer'
            })
        }
        rootEl.style['-webkit-user-select'] = 'auto'
        rootEl.style['-moz-user-select'] = 'auto'
        rootEl.style['-ms-user-select'] = 'auto'
        rootEl.style['user-select'] = 'auto'
    }

    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
}