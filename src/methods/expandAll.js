import { recurseTree, updateDate } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
/**
 * 展开所有项（懒加载情况下只展开已经懒加载过的节点）
 */
export default function(methods) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    recurseTree.call(this, (data)=>{
        // 懒加载情况
        if(options.lazy){
            if(data[symbolAttr.isLazyNode] && data[isOpen] !== 2){
                data[isOpen] = 2
            }
        }else if(data[isOpen] !== 2){
            data[isOpen] = 2
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}