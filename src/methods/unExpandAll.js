import { recurseTree } from '~/opera/tools'
import { renderData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
/**
 * 关闭所有展开项
 */
export default function(options) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    recurseTree(options, (data)=>{
        if(data[isOpen] !== 0){
            data[isOpen] = 0
        }
    })
    renderData(options)
    reloadVnode(options)
    return this
}