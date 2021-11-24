import { h } from 'snabbdom'
import { isArray, isFun } from '~/opera/tools'
export default function(v) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let isFold = v[children] && isArray(v[children]) && v[children].length > 0

    // 判断叶子节点
    if(options.lazy && v[isLeaf] || !options.lazy && !isFold){
        return h('span.eleTree-dropdown.eleTree-dropdown-hide')
    }
    const cIcon = Object.assign({}, options.icon, (isFun(options.iconItem) ? options.iconItem(v) : {}))
    
    let node = null
    let fn = async(type)=>{
        if(!cIcon[type]){
            let s = type === 'dropdownOn' 
                ? '.eleTree-dropdown-code.eleTree-dropdown-open' 
                : type === 'loading' 
                    ? '.eleTree-loading.eleTree-animate-rotate.eleTree-loading-code' 
                    : '.eleTree-dropdown-code'
            node = h('span.eleTree-dropdown' + s)
        }else if(/\.(jpg|png|gif)$/.test(cIcon[type])){
            node = h('span.eleTree-dropdown', {style: {'background-image': `url("${options.imgUrl + cIcon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(cIcon[type])){
            node = h(`span.eleTree-dropdown${cIcon[type]}`)
        }
    }
    // 当前节点是否展开
    v[isOpen] === 2 ? fn('dropdownOn') : (v[isOpen] === 1 ? fn('loading') : fn('dropdownOff'))
    return node
}