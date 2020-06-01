import titleVnode from './titleVnode'
import groupVnode from './groupVnode'
import { h } from 'snabbdom'
export default function(options, v, isOpen) {
    return h('div.eleTree-node',{
            style: {
                display: isOpen ? 'block' : 'none'
            },
            key: v.id, 
        }, 
        [
            titleVnode(options, v), 
            groupVnode(options, v.children || [], v.isOpen)
        ]
    )
}