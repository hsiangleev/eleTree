import groupVnode from '../vnode/groupVnode'
import { init } from 'snabbdom'
let patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

export default function(options) {
    // 保存旧版的vnode
    let oldVnode = options.node;
    // 重新获取vnode
    options.node = groupVnode(options, options.vnodeData, true, true)
    patch(oldVnode, options.node)
}