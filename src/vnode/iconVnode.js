import { h } from 'snabbdom'
import { isArray, isFun } from '~/opera/tools'
export default function(v) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let isFold = v[children] && isArray(v[children]) && v[children].length > 0
    let node = null
    const cIcon = Object.assign({}, options.icon, (isFun(options.iconItem) ? options.iconItem(v) : {}))
    let fn = async(type)=>{
        if(!cIcon[type]){
            node = null
        }else if(/\.(jpg|png|gif)$/.test(cIcon[type])){
            node = h('span.eleTree-icon', {style: {'background-image': `url("${options.imgUrl + cIcon[type]}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(cIcon[type])){
            node = h(`span.eleTree-icon${cIcon[type]}`)
        }
    }
    // 当前节点是否是叶子节点
    options.lazy && v[options.request.isLeaf] || !options.lazy && !isFold ? fn('leaf') : fn('fold')
    return node
}