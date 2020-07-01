
import reloadVnode from '~/vnode/reloadVnode'
import changeParent from '~/opera/changeParent'
import changeChildren from '~/opera/changeChildren'
import { emit } from '~/event/customEvent'
import { paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'

import append from '~/methods/append'

export default function(options, v, event) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let classList = event.target.classList
    let isTargetCheckbox = classList.contains('eleTree-checkbox')
    let isTargetDropdown = classList.contains('eleTree-dropdown')
    let isTargetIcon = classList.contains('eleTree-icon')
    let isTargetText = classList.contains('eleTree-text')
    if(!v[disabled] && (isTargetCheckbox || isTargetText && options.checkOnClickNode)) {
        // 点击checkbox选择，点击文字判断是否选择
        v[checked] = v[checked] === 2 ? 0 : 2
        // 判断是否父子不关联
        if(options.checkStrictly){
            reloadVnode(options)
            emit({options, v, type: 'checkbox', event})
        }else{
            changeParent(options, v, true)
            changeChildren(options, v)
            reloadVnode(options)
            emit({options, v, type: 'checkbox', event})
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
            arr = !arr[children] ? options.data : arr.children
            arr.forEach(item=>{if(item[isOpen] === 2 && item[key]!==v[key]) item[isOpen] = 0})
        }
        // 懒加载事件
        if(options.lazy && !v[isLeaf]){
            // 是否已经懒加载过
            if(!v[symbolAttr.isLazyNode]){
                // 保存懒加载之前的打开状态
                let oldIsOpen = v[isOpen]
                v[isOpen] = 1
                emit({options, v, type: 'lazyload', event, otherOpt: {
                    load: function(childNodeData) {
                        if(paramDetection(childNodeData, 'Array', 'load懒加载方法参数必须为Array')) return null
                        if(childNodeData.length > 0){
                            append.call(null, options, v[key], childNodeData)
                            return
                        }
                        // 初始有数据
                        if(v[children].length > 0){
                            v[isOpen] = oldIsOpen
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
        emit({options, v, type: 'click', event})
    }else{
        emit({options, v, type: 'click', event})
    }
    // 高亮显示
    if(options.highlightCurrent){
        options[symbolAttr.activeElm] && options[symbolAttr.activeElm].classList.remove('eleTree-title-active')
        this.elm.classList.add('eleTree-title-active')
        options[symbolAttr.activeElm] = this.elm
    }
}