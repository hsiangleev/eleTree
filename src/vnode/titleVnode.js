import iconVnode from './iconVnode'
import checkboxVnode from './checkboxVnode'
import textVnode from './textVnode'
import lineHorizontal from './lineHorizontal'
import nodeClick from '../event/nodeClick'
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