import groupVnode from '~/vnode/groupVnode'
import { init } from 'snabbdom'
import { symbolAttr } from '~/config'
let patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

export default function() {
    // 保存旧版的vnode
    let oldVnode = this.node;
    // 重新获取vnode
    this.node = groupVnode.call(this, this.config.data, true, true)
    patch(oldVnode, this.node)
}