
import reloadVnode from '~/vnode/reloadVnode'
import changeParent from '~/opera/changeParent'
import changeChildren from '~/opera/changeChildren'
import radioChange from '~/opera/radioChange'
import { emit } from '~/event/customEvent'
import { paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'

import append from '~/methods/append'

export default function(thisTree, v, event) {
    let options = thisTree.config
    let {name, key, isOpen, checked, children, disabled, isLeaf, radioChecked, radioDisabled } = options.request
    let classList = event.target.classList
    let isTargetCheckbox = classList.contains('eleTree-checkbox')
    let isTargetRadio = classList.contains('eleTree-radio')
    let isTargetDropdown = classList.contains('eleTree-dropdown')
    let isTargetIcon = classList.contains('eleTree-icon')
    let isTargetText = classList.contains('eleTree-text')
    let isClickCheckbox = !v[disabled] && (isTargetCheckbox || isTargetText && options.checkOnClickNode)
    let isClickRadio = !v[radioDisabled] && (isTargetRadio || isTargetText && options.radioOnClickNode)
    if(isClickCheckbox || isClickRadio){
        if(isClickCheckbox) {
            // 点击checkbox选择，点击文字判断是否选择
            v[checked] = v[checked] === 2 ? 0 : 2
            // 判断是否父子不关联
            if(options.checkStrictly){
                reloadVnode.call(thisTree)
                emit.call(thisTree, {v, type: 'checkbox', event})
            }else{
                changeParent.call(thisTree, v, true)
                changeChildren.call(thisTree, v)
                reloadVnode.call(thisTree)
                emit.call(thisTree, {v, type: 'checkbox', event})
            }
        }
        if(isClickRadio) {
            radioChange.call(thisTree, v)
            reloadVnode.call(thisTree)
            emit.call(thisTree, {v, type: 'radio', event})
        }
    }else if(isTargetDropdown || options.expandOnClickNode && (isTargetText || isTargetIcon)){
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
            let arr = v[symbolAttr.parentNode]
            arr = !arr ? options.data : arr[children]
            arr.forEach(item=>{if(item[isOpen] === 2 && item[key]!==v[key]) item[isOpen] = 0})
        }
        // 懒加载事件
        if(options.lazy && !v[isLeaf]){
            // 是否已经懒加载过
            if(!v[symbolAttr.isLazyNode]){
                // 保存懒加载之前的打开状态
                let oldIsOpen = v[isOpen]
                v[isOpen] = 1
                emit.call(thisTree, {v, type: 'lazyload', event, otherOpt: {
                    load: (childNodeData) => {
                        if(paramDetection(childNodeData, 'Array', 'load懒加载方法参数必须为Array')) return null
                        if(childNodeData.length > 0){
                            append.call(thisTree, null, v[key], childNodeData)
                            return
                        }
                        // 初始有数据
                        if(v[children].length > 0){
                            v[isOpen] = oldIsOpen
                            reloadVnode.call(thisTree)
                            return
                        }
                        // 初始无数据，也没有传入数据（叶子节点）
                        v[isLeaf] = true
                        reloadVnode.call(thisTree)
                    }
                }})
            }
            v[symbolAttr.isLazyNode] = true
        }
        reloadVnode.call(thisTree)
        emit.call(thisTree, {v, type: 'click', event})
    }else{
        emit.call(thisTree, {v, type: 'click', event})
    }
    // 高亮显示
    if(options.highlightCurrent){
        thisTree.activeElm && thisTree.activeElm.classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        thisTree.activeElm = this.elm
    }
}