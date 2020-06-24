
import { h } from 'snabbdom'
export default function(options, v) {
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    return h('span.eleTree-text',v[name])
}