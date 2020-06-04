
import reloadVnode from '../vnode/reloadVnode'
import getNodeIndex from '../opera/getNodeIndex'
import changeParent from '../opera/changeParent'
import changeChildren from '../opera/changeChildren'
import getCurrentNodeData from '../opera/getCurrentNodeData'
import { events, emit } from '../event/customEvent'
import { getCurrentDataByIndexArr, getParentDataByIndexArr } from '../opera/tools'

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
        let indexArr = getNodeIndex(options, v.id)
        let originData = getCurrentDataByIndexArr(options.data, indexArr, options.request['children'])
        // 点击checkbox选择，点击文字判断是否选择
        v.checkedStatus = v.checkedStatus === 2 ? 0 : 2
        originData[options.request['checked']] = v.checkedStatus === 2 ? true : false
        // 判断是否父子不关联
        if(options.checkStrictly){
            reloadVnode(options)
            events['checkbox'] && emitEvent(options, v, indexArr, 'checkbox', event)
        }else{
            changeParent(options, indexArr)
            changeChildren(options, v, originData)
            reloadVnode(options)
            events['checkbox'] && emitEvent(options, v, indexArr, 'checkbox', event)
        }
    }else if(isTargetIcon || isTargetText && options.expandOnClickNode){
        let indexArr = getNodeIndex(options, v.id)
        let originData = getCurrentDataByIndexArr(options.data, indexArr, options.request['children'])
        // 点击图标展开，点击文字判断是否展开
        v.isOpen = !v.isOpen
        originData.isOpen = !originData.isOpen
        // 手风琴效果
        if(options.accordion){
            // 修改数据
            let arr = getParentDataByIndexArr(options.vnodeData, indexArr, 'children')
            arr = indexArr.length === 1 ? arr : arr.children
            arr.forEach(item=>{if(item.isOpen && item.id!==v.id) item.isOpen = false})
            // 修改原始数据
            let arr2 = getParentDataByIndexArr(options.data, indexArr, options.request['children'])
            arr2 = indexArr.length === 1 ? arr2 : arr2[options.request['children']]
            arr2.forEach(item=>{if(item.isOpen && item.id!==v.id) item.isOpen = false})
            reloadVnode(options)
            events['click'] && emitEvent(options, v, indexArr, 'click', event)
        }else{
            reloadVnode(options)
            events['click'] && emitEvent(options, v, indexArr, 'click', event)
        }
    }
    // 高亮显示
    if(options.highlightCurrent){
        options.activeElm && options.activeElm.classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        options.activeElm = this.elm
    }
}