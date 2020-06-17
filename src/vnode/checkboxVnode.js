import { h } from 'snabbdom'
export default function(options, v) {
    let node = null
    let disabledStr = v.disabled ? '.eleTree-checkbox-code_disabled' : ''
    let fn = async(type)=>{
        if(!options.icon[type]){
            let checkboxStr = v.checkedStatus === 2 ? '.eleTree-checkbox-code_checked' : (v.checkedStatus === 1 ? '.eleTree-checkbox-code_half' : '')
            node = h('span.eleTree-checkbox.eleTree-checkbox-code' + checkboxStr + disabledStr)
        }else if(/\.(jpg|png|gif)$/.test(options.icon[type])){
            node = disabledStr 
                ? h('span.eleTree-checkbox' + disabledStr) 
                : h('span.eleTree-checkbox', {style: {'background-image': `url("./images/${options.icon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(options.icon[type])){
            node = h(`span.eleTree-checkbox${disabledStr ? disabledStr : options.icon[type]}`)
        }
    }

    // 当前节点是否展开
    v.checkedStatus === 2 ? fn('checkFull') : (v.checkedStatus === 1 ? fn('checkHalf') : fn('checkNone'))
    return options.showCheckbox ? node : null
}