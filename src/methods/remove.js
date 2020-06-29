import { paramDetection } from '~/opera/tools'
import { renderData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
/**
 * 删除节点
 * @param {*需要删除的节点id数组} removeArr 
 */
export default function(options, removeArr = []) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request

    if(paramDetection(removeArr, 'Array', 'remove方法第一个参数必须为Array')) return this

    let f = (data)=>{
        for(let i=0;i<data.length;i++){
            if(removeArr.includes(data[i][key])){
                let pData = data[i][symbolAttr.parentNode]
                // 判断是否是最外层
                pData ? pData[children].splice(i, 1) : data.splice(i,1)
                i--
                continue
            }
            if(data[i][children].length > 0){
                f(data[i][children])
            }
        }
    }
    f(options.data)

    renderData(options)
    reloadVnode(options)
    return this
}