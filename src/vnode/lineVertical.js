import { h } from 'snabbdom'
export default function(isFirst) {
    let l =  -1 * this.config.indent + 6
    return !isFirst && this.config.showLine ? h('i.eleTree-line-vertical',{style: {
        position: 'absolute',
        borderLeft: '1px dotted #666',
        height: '100%',
        left: l + 'px',
    }}) : null
}