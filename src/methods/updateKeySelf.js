import { renderData, changeData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { getDataByIndexArr, getNodeDataById, paramDetection } from '~/opera/tools'
/*
* id: 节点id
* data: 需要修改节点数据(Object)，不能修改子节点
**/
export default function(options, id, data) {
    let {key, isOpen, checked, children, disabled, isLeaf} = options.request

    if(paramDetection(id, 'String|Number', 'updateKeySelf方法第一个参数必须为String|Number')) return this
    if(paramDetection(data, 'Object', 'updateKeySelf方法第二个参数必须为Object')) return this

    let { indexArr } = getNodeDataById({ options: options, id })
    // 没找到
    if(indexArr.length === 0) return
    let parentArr = [...indexArr]
    parentArr.pop()
    
    // 判断是否是根节点
    if(parentArr.length !== 0){
        let cData = getDataByIndexArr({ options, indexArr, nodeType: 'current' })
        let pData = getDataByIndexArr({ options, indexArr, nodeType: 'parent' })
        Object.keys(data).forEach(v=>{
            if(v !== children){
                cData[v] = data[v]
            }
        })
        changeData(options, pData[children], pData, parentArr)
        reloadVnode(options)
        return this
    }
    // 根节点修改
    Object.keys(data).forEach(v=>{
        if(v !== children){
            options.data[indexArr[0]][v] = data[v]
        }
    })
    renderData(options)
    reloadVnode(options)
    return this
}