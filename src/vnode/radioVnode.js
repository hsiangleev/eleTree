import { h } from 'snabbdom'
import { isArray, isFun } from '~/opera/tools'
export default function(v) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf, radioChecked, radioDisabled} = options.request
    let node = null
    let disabledStr = v[radioDisabled] ? '.eleTree-radio-code_disabled' : ''
    let radioCheckedStr = v[radioChecked] === 2 ? '.eleTree-radio-code_checked' : ''
    let originStr = `span.eleTree-radio.eleTree-radio-code${radioCheckedStr}${disabledStr}`
    let isFold = v[children] && isArray(v[children]) && v[children].length > 0
    const cIcon = Object.assign({}, options.icon, (isFun(options.iconItem) ? options.iconItem(v) : {}))
    let fn = async(type)=>{
        if(!cIcon[type]){
            node = h(originStr)
        }else if(/\.(jpg|png|gif)$/.test(cIcon[type])){
            node = disabledStr 
                ? h(originStr) 
                : h('span.eleTree-radio', {style: {'background-image': `url("${options.imgUrl + cIcon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(cIcon[type])){
            node = disabledStr 
                ? h(originStr) 
                : h(`span.eleTree-radio${disabledStr}${cIcon[type]}`, {style: {'font-size': '16px'}})
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