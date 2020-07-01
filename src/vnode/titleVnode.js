import iconVnode from '~/vnode/iconVnode'
import dropdownVnode from '~/vnode/dropdownVnode'
import checkboxVnode from '~/vnode/checkboxVnode'
import textVnode from '~/vnode/textVnode'
import lineHorizontal from '~/vnode/lineHorizontal'
import nodeClick from '~/event/nodeClick'
import rightClick from '~/event/rightClick'
import { h } from 'snabbdom'
export default function(options, v, isFirst) {
    return h('div.eleTree-title',{
        on: {
            click: [nodeClick, options, v],
            contextmenu: [rightClick, options, v],
        }
    },
    [
        lineHorizontal(options, isFirst),
        dropdownVnode(options, v), 
        checkboxVnode(options, v),
        iconVnode(options, v),
        textVnode(options, v)
    ])
}