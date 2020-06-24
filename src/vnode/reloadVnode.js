import groupVnode from '~/vnode/groupVnode'
import { init } from 'snabbdom'
import { symbolAttr } from '~/config'
let patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

export default function(options) {
    // 保存旧版的vnode
    let oldVnode = options[symbolAttr.node];
    // 重新获取vnode
    options[symbolAttr.node] = groupVnode(options, options.data, true, true)
    patch(oldVnode, options[symbolAttr.node])
}