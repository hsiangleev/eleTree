import titleVnode from '~/vnode/titleVnode'
import groupVnode from '~/vnode/groupVnode'
import { h } from 'snabbdom'
import { symbolAttr } from '~/config'
export default function(options, v, isOpen, isFirst) {
    let { children } = options.request
    return h('div.eleTree-node',{
            style: {
                display: isOpen && !v[symbolAttr.isHideNode] ? 'block' : 'none'     // 显示条件（展开并且非隐藏的时候）
            },
            key: v.id, 
        }, 
        [
            titleVnode(options, v, isFirst), 
            v[symbolAttr.isRenderChild] ? groupVnode(options, v[children] || [], v.isOpen === 2) : null
        ]
    )
}