import iconVnode from '~/vnode/iconVnode'
import dropdownVnode from '~/vnode/dropdownVnode'
import checkboxVnode from '~/vnode/checkboxVnode'
import textVnode from '~/vnode/textVnode'
import lineHorizontal from '~/vnode/lineHorizontal'
import nodeClick from '~/event/nodeClick'
import rightClick from '~/event/rightClick'
import { h } from 'snabbdom'
export default function(v, isFirst) {
    return h('div.eleTree-title',{
        on: {
            click: [nodeClick, this, v],
            contextmenu: [rightClick, this, v],
        }
    },
    [
        lineHorizontal.call(this, isFirst),
        dropdownVnode.call(this, v), 
        checkboxVnode.call(this, v),
        iconVnode.call(this, v),
        textVnode.call(this, v)
    ])
}