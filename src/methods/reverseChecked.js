import { recurseTree, paramDetection, updateDate } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
export default function(methods) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request

    recurseTree.call(this, (data)=>{
        if(!data[disabled]){
            if(data[checked] === 2){
                data[checked] = 0
            }else if(data[checked] === 0){
                data[checked] = 2
            }
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}