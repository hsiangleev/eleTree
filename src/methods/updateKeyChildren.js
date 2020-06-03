import getNodeIndex from '../opera/getNodeIndex'
import { changeData } from '../opera/renderData'
import reloadVnode from '../vnode/reloadVnode'
/*
* id: 节点id
* data: 需要添加的子节点数据(Array)
**/
export default function(id, data) {
    let indexArr = getNodeIndex(this, id)
    let d = this.vnodeData[indexArr[0]]      // 查找当前节点父节点数据
    for(let i = 1;i<indexArr.length;i++){
        d=d.children[indexArr[i]]
    }
    d.isOpen = true
    // 修改原始数据
    let changeOriginData = (indexArr)=>{
        let d1 = this.data[indexArr[0]]      // 查找当前节点父节点数据
        for(let i = 1;i<indexArr.length;i++){
            d1=d1[this.request['children']][indexArr[i]]
        }
        if(d1[this.request['children']]){
            d1[this.request['children']] = d1[this.request['children']].concat(data)
        }else{
            d1[this.request['children']] = data
        }
    }
    if(indexArr.length === 0) return
    changeOriginData(indexArr)
    changeData(this, data, indexArr, d)
    reloadVnode(this)
}