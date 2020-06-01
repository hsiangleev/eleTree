import eleVnode from './eleVnode'

import { h } from 'snabbdom'
export default function(options, data, isOpen) {
    options.node = h('div.eleTree-group',data.map(v=>eleVnode(options, v, isOpen)))
    return options.node
}