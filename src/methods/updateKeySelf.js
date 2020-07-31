import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateDate, isObject, isArray } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 修改当前节点
 * @param {*查找节点id} id 
 * @param {*添加的子节点数据} data 
 */
export default function(methods, id, data) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, pid} = options.request

    // if(paramDetection(id, 'String|Number', 'updateKeySelf方法第一个参数必须为String|Number')) return methods
    // if(paramDetection(data, 'Object', 'updateKeySelf方法第二个参数必须为Object')) return methods

    // pid格式更新(更改pid则为移动节点)
    if(isObject(id) || isArray(id)){
        data = isObject(id) ? [id] : id
        for (let i = 0; i < data.length; i++) {
            let pId = data[i][pid]
            let id = data[i][key]
            let cData = getNodeDataById.call(this, id)
            // 没找到
            if(!cData) continue
            let pData = cData[symbolAttr.parentNode]

            // 父节点不变，只更新节点，不移动
            if(pData && pId === pData[key]){
                Object.keys(data[i]).forEach(v=>cData[v] = data[i][v])
                continue
            }
            // 移动并更新节点（先删后插）
            let d = pData ? pData[children] : options.data
            let index = d.findIndex(v=>v[key]===cData[key])
            let removeDate = d.splice(index,1)
            Object.keys(data[i]).forEach(v=>removeDate[0][v] = data[i][v])
            let newPData = getNodeDataById.call(this, pId)
            if(!newPData) {
                // 移动到根节点
                if(pId === options.defaultPid){
                    options.data.push(removeDate[0])
                }
                continue
            }
            newPData[children] ? (newPData[children].push(removeDate[0])) : (newPData[children] = removeDate)
            newPData[isOpen] = 2
            newPData[symbolAttr.isRenderChild] = true
        }
        updateDate.call(this)
        reloadVnode.call(this)
        return methods
    }
    
    let cData = getNodeDataById.call(this, id)
    // 没找到
    if(!cData) return methods
    let pData = cData[symbolAttr.parentNode]
    // 根节点判断
    if(!pData){
        let index = options.data.findIndex(v=>v[key]===id)
        Object.keys(data).forEach(v=>(v !== children) && (options.data[index][v] = data[v]))
        updateDate.call(this)
    }else{
        Object.keys(data).forEach(v=>(v !== children) && (cData[v] = data[v]))
        updateDate.call(this, cData)
    }
    reloadVnode.call(this)
    return methods
}