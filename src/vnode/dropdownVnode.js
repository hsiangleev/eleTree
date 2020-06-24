import { h } from 'snabbdom'
import { isArray } from '~/opera/tools'
export default function(options, v) {
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let isFold = v[children] && isArray(v[children]) && v[children].length > 0

    // 判断叶子节点
    if(options.lazy && v[isLeaf] || !options.lazy && !isFold){
        return h('span.eleTree-dropdown.eleTree-dropdown-hide')
    }
    
    let node = null
    let fn = async(type)=>{
        if(!options.icon[type]){
            let s = type === 'dropdownOn' 
                ? '.eleTree-dropdown-code.eleTree-dropdown-open' 
                : type === 'loading' 
                    ? '.eleTree-loading.eleTree-animate-rotate.eleTree-loading-code' 
                    : '.eleTree-dropdown-code'
            node = h('span.eleTree-dropdown' + s)
        }else if(/\.(jpg|png|gif)$/.test(options.icon[type])){
            node = h('span.eleTree-dropdown', {style: {'background-image': `url("${options.imgUrl + options.icon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(options.icon[type])){
            node = h(`span.eleTree-dropdown${options.icon[type]}`)
        }
    }
    // 当前节点是否展开
    v[isOpen] === 2 ? fn('dropdownOn') : (v[isOpen] === 1 ? fn('loading') : fn('dropdownOff'))
    return node
}