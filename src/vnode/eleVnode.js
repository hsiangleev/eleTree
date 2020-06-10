import titleVnode from '~/vnode/titleVnode'
import groupVnode from '~/vnode/groupVnode'
import { h } from 'snabbdom'
export default function(options, v, isOpen, isFirst) {
    return h('div.eleTree-node',{
            style: {
                display: isOpen ? 'block' : 'none'
            },
            key: v.id, 
        }, 
        [
            titleVnode(options, v, isFirst), 
            groupVnode(options, v.children || [], v.isOpen)
        ]
    )
}