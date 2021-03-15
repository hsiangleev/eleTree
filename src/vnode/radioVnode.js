import { h } from 'snabbdom'
import { isArray } from '~/opera/tools'
export default function(v) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf, radioChecked, radioDisabled} = options.request
    let node = null
    let disabledStr = v[radioDisabled] ? '.eleTree-radio-code_disabled' : ''
    let radioCheckedStr = v[radioChecked] === 2 ? '.eleTree-radio-code_checked' : ''
    let originStr = `span.eleTree-radio.eleTree-radio-code${radioCheckedStr}${disabledStr}`
    let isFold = v[children] && isArray(v[children]) && v[children].length > 0
    let fn = async(type)=>{
        if(!options.icon[type]){
            node = h(originStr)
        }else if(/\.(jpg|png|gif)$/.test(options.icon[type])){
            node = disabledStr 
                ? h(originStr) 
                : h('span.eleTree-radio', {style: {'background-image': `url("${options.imgUrl + options.icon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(options.icon[type])){
            node = disabledStr 
                ? h(originStr) 
                : h(`span.eleTree-radio${disabledStr}${options.icon[type]}`, {style: {'font-size': '16px'}})
        }
    }

    // 当前节点是否展开
    v[radioChecked] === 2 ? fn('radioCheck') : fn('radioCheckNone')
    // 显示所有节点
    if(options.showRadio && !options.isOnlyShowLeafRadio) return node
    // 只显示叶子节点
    if(options.showRadio && (options.isOnlyShowLeafRadio && options.lazy && v[options.request.isLeaf] || !options.lazy && !isFold)) return node
    return null
}