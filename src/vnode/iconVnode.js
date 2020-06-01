import { h } from 'snabbdom'
export default function(options, v) {
    let s1 = v.children 
        && Object.prototype.toString.call(v.children) === "[object Array]" 
        && v.children.length>0 ? '' : '.eleTree-icon-hide'
    let s2 = v.isOpen ? '.eleTree-icon-open' : ''
    return h('span.eleTree-icon'+ s1 + s2)
}