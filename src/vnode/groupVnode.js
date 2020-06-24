import eleVnode from '~/vnode/eleVnode'
import emptyVnode from '~/vnode/emptyVnode'
import lineVertical from '~/vnode/lineVertical'
import { symbolAttr } from '~/config'

import { h } from 'snabbdom'
// isFirst: 是否是第一层
// isOpen： 是否展开
export default function(options, data, isOpen, isFirst) {
    options[symbolAttr.node] = h('div.eleTree-group',{style: {
        marginLeft: !isFirst ? (options.indent + 'px') : 'none'
    }}, isFirst && data.length === 0 ? [emptyVnode(options)] : [
        lineVertical(options, isFirst),
        ...data.map(v=>eleVnode(options, v, isOpen, isFirst))
    ])
    return options[symbolAttr.node]
}