import { recurseTree, paramDetection, updateDate } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
export default function(methods) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request

    recurseTree.call(this, (data)=>{
        if(!data[disabled]){
            data[checked] = 2
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}