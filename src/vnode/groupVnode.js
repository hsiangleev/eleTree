import eleVnode from '~/vnode/eleVnode'
import emptyVnode from '~/vnode/emptyVnode'
import lineVertical from '~/vnode/lineVertical'
import { symbolAttr } from '~/config'

import { h } from 'snabbdom'
// isFirst: 是否是第一层
// isOpen： 是否展开
export default function(data, isOpen, isFirst) {
    let options = this.config
    this.node = h('div.eleTree-group',{style: {
        marginLeft: !isFirst ? (options.indent + 'px') : 'none'
    }}, isFirst && data.length === 0 
        ? [emptyVnode.call(this)] 
        : [
            lineVertical.call(this, isFirst),
            ...data.map(v=>eleVnode.call(this, v, isOpen, isFirst))
        ]
    )
    return this.node
}