import { h } from 'snabbdom'
import { isArray } from '~/opera/tools'
export default function(options, v) {
    let isFold = v.children && isArray(v.children) && v.children.length > 0
    if(!isFold) return h('span.eleTree-dropdown.eleTree-dropdown-hide')
    let node = null
    let fn = async(type)=>{
        if(!options.icon[type]){
            let s = type === 'dropdownOn' ? '.eleTree-dropdown-open' : ''
            node = h('span.eleTree-dropdown.eleTree-dropdown-code' + s)
        }else if(/\.(jpg|png|gif)$/.test(options.icon[type])){
            node = h('span.eleTree-dropdown', {style: {'background-image': `url("./images/${options.icon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(options.icon[type])){
            node = h(`span.eleTree-dropdown${options.icon[type]}`)
        }
    }
    // 当前节点是否展开
    v.isOpen ? fn('dropdownOn') : fn('dropdownOff')
    return node
}