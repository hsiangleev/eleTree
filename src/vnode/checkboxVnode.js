import { h } from 'snabbdom'
export default function(options, v) {
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let node = null
    let disabledStr = v[disabled] ? '.eleTree-checkbox-code_disabled' : ''
    let checkboxStr = v[checked] === 2 ? '.eleTree-checkbox-code_checked' : (v[checked] === 1 ? '.eleTree-checkbox-code_half' : '')
    let originStr = `span.eleTree-checkbox.eleTree-checkbox-code${checkboxStr}${disabledStr}`
    let fn = async(type)=>{
        if(!options.icon[type]){
            node = h(originStr)
        }else if(/\.(jpg|png|gif)$/.test(options.icon[type])){
            node = disabledStr 
                ? h(originStr) 
                : h('span.eleTree-checkbox', {style: {'background-image': `url("${options.imgUrl + options.icon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(options.icon[type])){
            node = disabledStr 
                ? h(originStr) 
                : h(`span.eleTree-checkbox${disabledStr}${options.icon[type]}`, {style: {'font-size': '20px', 'right': '2px'}})
        }
    }

    // 当前节点是否展开
    v[checked] === 2 ? fn('checkFull') : (v[checked] === 1 ? fn('checkHalf') : fn('checkNone'))
    return options.showCheckbox ? node : null
}