import groupVnode from './vnode/groupVnode'

// 保存最外层虚拟dom的引用,方便替换
let vnode = function(opt) {
    return groupVnode(opt, opt.vnodeData, true, true)
}

export default vnode