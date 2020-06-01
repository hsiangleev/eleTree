import iconVnode from './iconVnode'
import checkboxVnode from './checkboxVnode'
import textVnode from './textVnode'
import nodeClick from '../event/nodeClick'
import { h } from 'snabbdom'
export default function(options, v) {
    return h('div.eleTree-title',{
        on: {
            click: [nodeClick, options, v]
        }
    },
    [
        iconVnode(options, v), 
        options.checkbox ? checkboxVnode(options, v) : null, 
        textVnode(options, v)
    ])
}