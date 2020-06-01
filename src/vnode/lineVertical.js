import { h } from 'snabbdom'
export default function(options, isFirst) {
    let l =  -1 * options.indent + 6
    return !isFirst && options.showLine ? h('i.eleTree-line-vertical',{style: {
        position: 'absolute',
        borderLeft: '1px dotted #666',
        height: '100%',
        left: l + 'px',
    }}) : null
}