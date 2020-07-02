import { recurseTree, updateDate } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
/**
 * 关闭所有展开项
 */
export default function(methods) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    recurseTree.call(this, (data)=>{
        if(data[isOpen] !== 0){
            data[isOpen] = 0
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}