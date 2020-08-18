import iconVnode from '~/vnode/iconVnode'
import dropdownVnode from '~/vnode/dropdownVnode'
import checkboxVnode from '~/vnode/checkboxVnode'
import radioVnode from '~/vnode/radioVnode'
import textVnode from '~/vnode/textVnode'
import lineHorizontal from '~/vnode/lineHorizontal'
import nodeClick from '~/event/nodeClick'
import rightClick from '~/event/rightClick'
import { mousedown, mouseup } from '~/event/drag'
import { h } from 'snabbdom'
export default function(v, isFirst) {
    let options = this.config
    return h('div.eleTree-title',{
        on: {
            click: [nodeClick, this, v],
            contextmenu: [rightClick, this, v],
            mousedown: options.draggable ? [mousedown, this, v] : null,
            mouseup: options.draggable ? [mouseup, this, v] : null,
        }
    },
    [
        lineHorizontal.call(this, isFirst),
        dropdownVnode.call(this, v), 
        checkboxVnode.call(this, v),
        radioVnode.call(this, v),
        iconVnode.call(this, v),
        textVnode.call(this, v)
    ])
}