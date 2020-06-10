import iconVnode from '~/vnode/iconVnode'
import checkboxVnode from '~/vnode/checkboxVnode'
import textVnode from '~/vnode/textVnode'
import lineHorizontal from '~/vnode/lineHorizontal'
import nodeClick from '~/event/nodeClick'
import { h } from 'snabbdom'
export default function(options, v, isFirst) {
    return h('div.eleTree-title',{
        on: {
            click: [nodeClick, options, v]
        }
    },
    [
        lineHorizontal(options, isFirst),
        iconVnode(options, v), 
        checkboxVnode(options, v),
        textVnode(options, v)
    ])
}