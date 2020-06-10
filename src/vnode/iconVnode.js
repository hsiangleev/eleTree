import { h } from 'snabbdom'
import { isArray } from '~/opera/tools'
export default function(options, v) {
    let s1 = v.children 
        && isArray(v.children)
        && v.children.length>0 ? '' : '.eleTree-icon-hide'
    let s2 = v.isOpen ? '.eleTree-icon-open' : ''
    return h('span.eleTree-icon'+ s1 + s2)
}