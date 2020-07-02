import titleVnode from '~/vnode/titleVnode'
import groupVnode from '~/vnode/groupVnode'
import { h } from 'snabbdom'
import { symbolAttr } from '~/config'
export default function(v, isOpen, isFirst) {
    let options = this.config
    let { children, isOpen: isOpenAttr } = options.request
    return h('div.eleTree-node',{
            style: {
                display: isOpen && !v[symbolAttr.isHideNode] ? 'block' : 'none'     // 显示条件（展开并且非隐藏的时候）
            },
            key: v.id, 
        }, 
        [
            titleVnode.call(this, v, isFirst), 
            v[symbolAttr.isRenderChild] ? groupVnode.call(this, v[children] || [], v[isOpenAttr] === 2) : null
        ]
    )
}