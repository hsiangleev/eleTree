import getNodeIndex from '~/opera/getNodeIndex'
import { changeData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { getCurrentDataByIndexArr } from '~/opera/tools'
/*
* id: 节点id
* data: 需要添加的子节点数据(Array)
**/
export default function(id, data) {
    let indexArr = getNodeIndex(this, id)
    if(indexArr.length === 0) return
    
    let d = getCurrentDataByIndexArr(this.vnodeData, indexArr, 'children')
    d.isOpen = true
    // 修改原始数据
    let d1 = getCurrentDataByIndexArr(this.data, indexArr, this.request['children'])
    if(d1[this.request['children']]){
        d1[this.request['children']] = d1[this.request['children']].concat(data)
    }else{
        d1[this.request['children']] = data
    }
    changeData(this, d1[this.request['children']], indexArr, d)
    reloadVnode(this)
}