
import reloadVnode from '~/vnode/reloadVnode'
import getNodeIndex from '~/opera/getNodeIndex'
import changeParent from '~/opera/changeParent'
import changeChildren from '~/opera/changeChildren'
import getCurrentNodeData from '~/opera/getCurrentNodeData'
import { events, emit } from '~/event/customEvent'
import { getCurrentDataByIndexArr, getParentDataByIndexArr, isArray } from '~/opera/tools'

import updateKeyChildren from '~/methods/updateKeyChildren'

// 事件触发
let emitEvent = function({options, v, indexArr, type, event, otherOpt}) {
    if(events[type+"-"+options.el]){
        let data = getCurrentNodeData(options, v, indexArr)
        emit(type, options.el, event, Object.assign({}, otherOpt, {data, type}))
    }
}
export default function(options, v, event) {
    let classList = event.target.classList
    let isTargetCheckbox = classList.contains('eleTree-checkbox')
    let isTargetDropdown = classList.contains('eleTree-dropdown')
    let isTargetIcon = classList.contains('eleTree-icon')
    let isTargetText = classList.contains('eleTree-text')
    if(!v.disabled && (isTargetCheckbox || isTargetText && options.checkOnClickNode)) {
        let indexArr = getNodeIndex(options, v.id)
        let originData = getCurrentDataByIndexArr(options.data, indexArr, options.request['children'])
        // 点击checkbox选择，点击文字判断是否选择
        v.checkedStatus = v.checkedStatus === 2 ? 0 : 2
        originData[options.request['checked']] = v.checkedStatus === 2 ? true : false
        // 判断是否父子不关联
        if(options.checkStrictly){
            reloadVnode(options)
            emitEvent({options, v, indexArr, type: 'checkbox', event})
        }else{
            changeParent(options, indexArr)
            changeChildren(options, v, originData)
            reloadVnode(options)
            emitEvent({options, v, indexArr, type: 'checkbox', event})
        }
    }else if(isTargetDropdown || options.expandOnClickNode && (isTargetText || isTargetIcon)){
        let indexArr = getNodeIndex(options, v.id)
        let originData = getCurrentDataByIndexArr(options.data, indexArr, options.request['children'])
        // 点击图标展开，点击文字判断是否展开
        if(v.isOpen === 2){
            v.isOpen = 0
            originData[options.request.isOpen] = false
        }else if(v.isOpen === 0){
            v.isOpen = 2
            originData[options.request.isOpen] = true
        }else if(v.isOpen === 1){
            return
        }
        if(v.isOpen === 2) {
            v.isRenderChild = true
            originData.isRenderChild = true
        }
        // 手风琴效果
        if(options.accordion){
            // 修改数据
            let arr = getParentDataByIndexArr(options.vnodeData, indexArr, 'children')
            arr = indexArr.length === 1 ? arr : arr.children
            arr.forEach(item=>{if(item.isOpen === 2 && item.id!==v.id) item.isOpen = 0})
            // 修改原始数据
            let arr2 = getParentDataByIndexArr(options.data, indexArr, options.request['children'])
            arr2 = indexArr.length === 1 ? arr2 : arr2[options.request['children']]
            arr2.forEach(item=>{if(item.isOpen === 2 && item.id!==v.id) item.isOpen = 0})
        }
        // 懒加载事件
        if(options.lazy && !v.isLeaf){
            // 是否已经懒加载过
            if(!v.isLazyNode){
                v.isOpen = 1
                emitEvent({options, v, indexArr, type: 'lazyload', event, otherOpt: {
                    load: function(childNodeData) {
                        if(!childNodeData || !isArray(childNodeData)){
                            childNodeData = []
                        }
                        updateKeyChildren.call(options, v.id, childNodeData)
                        v.isOpen = 2
                        originData[options.request.isOpen] = true
                        if(v.children.length === 0) {
                            v.isLeaf = true
                            originData[options.request.isLeaf] = true
                        }
                        reloadVnode(options)
                    }
                }})
            }
            v.isLazyNode = true
            originData.isLazyNode = true
        }
        reloadVnode(options)
        emitEvent({options, v, indexArr, type: 'click', event})
    }
    // 高亮显示
    if(options.highlightCurrent){
        options.activeElm && options.activeElm.classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        options.activeElm = this.elm
    }
}