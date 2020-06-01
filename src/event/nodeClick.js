
import groupVnode from '../vnode/groupVnode'
import { init } from 'snabbdom'
let patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

import getNodeIndex from '../opera/getNodeIndex'
import changeParent from '../opera/changeParent'
import changeChildren from '../opera/changeChildren'
import getSiblingsNode from '../opera/getSiblingsNode'

let changeVnode = function(options) {
    // 保存旧版的vnode
    let oldVnode = options.node;
    // 重新获取vnode
    options.node = groupVnode(options, options.vnodeData, true, true)
    patch(oldVnode, options.node)
}

export default function(options, v, event) {
    // if(v.children.length === 0) return
    let classList = event.target.classList
    let isTargetCheckbox = classList.contains('eleTree-checkbox')
    let isTargetIcon = classList.contains('eleTree-icon')
    let isTargetText = classList.contains('eleTree-text')
    if(!v.disabled && (isTargetCheckbox || isTargetText && options.checkOnClickNode)) {
        // 点击checkbox选择，点击文字判断是否选择
        v.checkedStatus = v.checkedStatus === 2 ? 0 : 2
        // 判断是否父子不关联
        if(options.checkStrictly){
            changeVnode(options)
        }else{
            getNodeIndex(options, v).then(indexArr=>{
                changeParent(options, indexArr)
                changeChildren(v)
                changeVnode(options)
            })
        }
    }else if(isTargetIcon || isTargetText && options.expandOnClickNode){
        // 点击图标展开，点击文字判断是否展开
        v.isOpen = !v.isOpen
        // 手风琴效果
        if(options.accordion){
            getNodeIndex(options, v).then(indexArr=>{
                getSiblingsNode(options, indexArr).then(arr=>{
                    arr.forEach(item=>{if(item.isOpen && item.id!==v.id) item.isOpen = false})
                    changeVnode(options)
                })
            })
        }else{
            changeVnode(options)
        }
        
    }
    // 高亮显示
    if(options.highlightCurrent){
        options.activeElm && options.activeElm.classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        options.activeElm = this.elm
    }
}