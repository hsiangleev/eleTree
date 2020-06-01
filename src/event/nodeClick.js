
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

let changeVnode = function(options) {
    // 保存旧版的vnode
    let oldVnode = options.node;
    // 重新获取vnode
    options.node = groupVnode(options, options.vnodeData, true)
    patch(oldVnode, options.node)
}

export default function(options, v, event) {
    // if(v.children.length === 0) return
    let classList = event.target.classList
    let isTargetCheckbox = classList.contains('eleTree-checkbox')
    let isTargetIcon = classList.contains('eleTree-icon')
    let isTargetText = classList.contains('eleTree-text')
    if(isTargetCheckbox) {
        v.checkedStatus = v.checkedStatus === 2 ? 0 : 2
        getNodeIndex(options, v).then(indexArr=>{
            changeParent(options, indexArr)
            changeChildren(v)
            changeVnode(options)
        })
    }else if(isTargetIcon || isTargetText){
        v.isOpen = !v.isOpen
        changeVnode(options)
    }
}