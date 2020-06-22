import { renderData, changeData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { getDataByIndexArr, getNodeDataById } from '~/opera/tools'
/*
* id: 节点id
* data: 需要修改节点数据(Object)，不能修改子节点
**/
export default function(id, data) {
    let { indexArr } = getNodeDataById({ options: this, id, dataType: 'vnode' })
    // 没找到
    if(indexArr.length === 0) return
    let parentArr = [...indexArr]
    parentArr.pop()
    
    // 判断是否是根节点
    if(parentArr.length !== 0){
        let pVnodeData = getDataByIndexArr({ options: this, indexArr, dataType: 'vnode', nodeType: 'parent' })
        let d1 = getDataByIndexArr({ options: this, indexArr, dataType: 'origin', nodeType: 'current' })
        let pData = getDataByIndexArr({ options: this, indexArr, dataType: 'origin', nodeType: 'parent' })
        Object.keys(data).forEach(v=>{
            if(v !== this.request['children']){
                d1[v] = data[v]
            }
        })
        changeData(this, pData[this.request['children']], parentArr, pVnodeData, false, false)
        reloadVnode(this)
        return
    }
    // 根节点修改
    Object.keys(data).forEach(v=>{
        if(v !== this.request['children']){
            this.data[indexArr[0]][v] = data[v]
        }
    })
    renderData(this)
    reloadVnode(this)
}