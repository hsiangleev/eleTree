import { changeData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById } from '~/opera/tools'
/*
* id: 节点id
* data: 需要添加的子节点数据(Array)
**/
export default function(id, data) {
    let { indexArr, resultData: d } = getNodeDataById({ options: this, id, dataType: 'vnode' })
    if(indexArr.length === 0) return
    // 添加子节点的时候自动展开当前节点
    d.isOpen = 2
    d.isRenderChild = true
    // 修改原始数据
    let { resultData: d1 } = getNodeDataById({ options: this, id, dataType: 'origin' })
    if(d1[this.request['children']]){
        d1[this.request['children']] = d1[this.request['children']].concat(data)
    }else{
        d1[this.request['children']] = data
    }
    d1[this.request['isOpen']] = true
    d1.isRenderChild = true
    changeData(this, d1[this.request['children']], indexArr, d, false, false)
    reloadVnode(this)
}