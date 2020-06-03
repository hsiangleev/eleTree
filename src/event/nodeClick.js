
import reloadVnode from '../vnode/reloadVnode'
import getNodeIndex from '../opera/getNodeIndex'
import changeParent from '../opera/changeParent'
import changeChildren from '../opera/changeChildren'
import getSiblingsNode from '../opera/getSiblingsNode'
import getCurrentNodeData from '../opera/getCurrentNodeData'
import { events, emit } from '../event/customEvent'

// 事件触发
let emitEvent = function(options, v, indexArr, type, event) {
    let data = getCurrentNodeData(options, v, indexArr)
    emit(type, {data, type, event})
}
export default function(options, v, event) {
    let classList = event.target.classList
    let isTargetCheckbox = classList.contains('eleTree-checkbox')
    let isTargetIcon = classList.contains('eleTree-icon')
    let isTargetText = classList.contains('eleTree-text')
    if(!v.disabled && (isTargetCheckbox || isTargetText && options.checkOnClickNode)) {
        // 点击checkbox选择，点击文字判断是否选择
        v.checkedStatus = v.checkedStatus === 2 ? 0 : 2
        // 判断是否父子不关联
        if(options.checkStrictly){
            reloadVnode(options)
            events['checkbox'] && emitEvent(options, v, getNodeIndex(options, v.id), 'checkbox', event)
        }else{
            let indexArr = getNodeIndex(options, v.id)
            changeParent(options, indexArr)
            changeChildren(v)
            reloadVnode(options)
            events['checkbox'] && emitEvent(options, v, indexArr, 'checkbox', event)
        }
    }else if(isTargetIcon || isTargetText && options.expandOnClickNode){
        // 点击图标展开，点击文字判断是否展开
        v.isOpen = !v.isOpen
        // 手风琴效果
        if(options.accordion){
            let indexArr = getNodeIndex(options, v.id)
            let arr = getSiblingsNode(options, indexArr)
            arr.forEach(item=>{if(item.isOpen && item.id!==v.id) item.isOpen = false})
            reloadVnode(options)
            events['click'] && emitEvent(options, v, indexArr, 'click', event)
        }else{
            reloadVnode(options)
            events['click'] && emitEvent(options, v, getNodeIndex(options, v.id), 'click', event)
        }
    }
    // 高亮显示
    if(options.highlightCurrent){
        options.activeElm && options.activeElm.classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        options.activeElm = this.elm
    }
}