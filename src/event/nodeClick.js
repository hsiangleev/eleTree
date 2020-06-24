
import reloadVnode from '~/vnode/reloadVnode'
import changeParent from '~/opera/changeParent'
import changeChildren from '~/opera/changeChildren'
import getCurrentNodeData from '~/opera/getCurrentNodeData'
import { events, emit } from '~/event/customEvent'
import { getDataByIndexArr, getNodeDataById, paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'

import updateKeyChildren from '~/methods/updateKeyChildren'

// 事件触发
let emitEvent = function({options, v, indexArr, type, event, otherOpt}) {
    if(events[type+"-"+options.el]){
        let data = getCurrentNodeData(options, v, indexArr)
        emit(type, options.el, event, Object.assign({}, otherOpt, {data, type}))
    }
}
export default function(options, v, event) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let classList = event.target.classList
    let isTargetCheckbox = classList.contains('eleTree-checkbox')
    let isTargetDropdown = classList.contains('eleTree-dropdown')
    let isTargetIcon = classList.contains('eleTree-icon')
    let isTargetText = classList.contains('eleTree-text')
    if(!v[disabled] && (isTargetCheckbox || isTargetText && options.checkOnClickNode)) {
        let { indexArr } = getNodeDataById({ options, id: v.id })
        // 点击checkbox选择，点击文字判断是否选择
        v[checked] = v[checked] === 2 ? 0 : 2
        // 判断是否父子不关联
        if(options.checkStrictly){
            reloadVnode(options)
            emitEvent({options, v, indexArr, type: 'checkbox', event})
        }else{
            changeParent(options, indexArr, true)
            changeChildren(options, v)
            reloadVnode(options)
            emitEvent({options, v, indexArr, type: 'checkbox', event})
        }
    }else if(isTargetDropdown || options.expandOnClickNode && (isTargetText || isTargetIcon)){
        let { indexArr } = getNodeDataById({ options, id: v.id })
        // 点击图标展开，点击文字判断是否展开
        if(v[isOpen] === 2){
            v[isOpen] = 0
        }else if(v[isOpen] === 0){
            v[isOpen] = 2
            v[symbolAttr.isRenderChild] = true
        }else if(v[isOpen] === 1){
            return
        }
        // 手风琴效果
        if(options.accordion){
            // 修改数据
            let arr = getDataByIndexArr({ options, indexArr, nodeType: 'parent' })
            arr = indexArr.length === 1 ? arr : arr.children
            arr.forEach(item=>{if(item[isOpen] === 2 && item.id!==v.id) item[isOpen] = 0})
        }
        // 懒加载事件
        if(options.lazy && !v[isLeaf]){
            // 是否已经懒加载过
            if(!v[symbolAttr.isLazyNode]){
                v[isOpen] = 1
                emitEvent({options, v, indexArr, type: 'lazyload', event, otherOpt: {
                    load: function(childNodeData) {
                        if(paramDetection(childNodeData, 'Array', 'load懒加载方法参数必须为Array')) return null
                        if(childNodeData.length > 0){
                            updateKeyChildren.call(null, options, v.id, childNodeData)
                            return
                        }
                        // 初始有数据
                        if(v[children].length > 0){
                            v[isOpen] = 2
                            reloadVnode(options)
                            return
                        }
                        // 初始无数据，也没有传入数据（叶子节点）
                        v[isLeaf] = true
                        reloadVnode(options)
                    }
                }})
            }
            v[symbolAttr.isLazyNode] = true
        }
        reloadVnode(options)
        emitEvent({options, v, indexArr, type: 'click', event})
    }
    // 高亮显示
    if(options.highlightCurrent){
        options[symbolAttr.activeElm] && options[symbolAttr.activeElm].classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        options[symbolAttr.activeElm] = this.elm
    }
}