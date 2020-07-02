import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateDate } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 修改当前节点
 * @param {*查找节点id，传null或空字符串则会添加到根节点} id 
 * @param {*添加的子节点数据} data 
 */
export default function(methods, id, data) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf} = options.request

    if(paramDetection(id, 'String|Number', 'updateKeySelf方法第一个参数必须为String|Number')) return methods
    if(paramDetection(data, 'Object', 'updateKeySelf方法第二个参数必须为Object')) return methods

    let cData = getNodeDataById.call(this, id)
    // 没找到
    if(!cData) return methods
    let pData = cData[symbolAttr.parentNode]
    // 根节点判断
    if(!pData){
        // 根节点修改
        let index = options.data.findIndex(v=>v[key]===id)
        Object.keys(data).forEach(v=>{
            if(v !== children){
                options.data[index][v] = data[v]
            }
        })
        updateDate.call(this)
    }else{
        Object.keys(data).forEach(v=>{
            if(v !== children){
                cData[v] = data[v]
            }
        })
        updateDate.call(this, cData)
    }
    
    reloadVnode.call(this)
    return methods
}