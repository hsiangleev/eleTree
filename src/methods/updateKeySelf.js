import getNodeIndex from '../opera/getNodeIndex'
import { changeData } from '../opera/renderData'
import reloadVnode from '../vnode/reloadVnode'
/*
* id: 节点id
* data: 需要添加的子节点数据(Object)，不能修改子节点
**/
export default function(id, data) {
    let indexArr = getNodeIndex(this, id)
    // 没找到
    if(indexArr.length === 0) return
    let parentArr = [...indexArr]
    parentArr.pop()
    let d = null
    // 判断是否是根节点，根节点取当前节点，否则取父节点
    if(parentArr.length === 0){
        d = this.vnodeData[indexArr[0]]      // 查找当前节点父节点数据
        for(let i = 1;i<indexArr.length;i++){
            d=d.children[indexArr[i]]
        }
    }else{
        d = this.vnodeData[parentArr[0]]      // 查找当前节点父节点数据
        for(let i = 1;i<parentArr.length;i++){
            d=d.children[parentArr[i]]
        }
    }
    console.log(d)
    // let d = getParentNodeById(this, id)
    // d.isOpen = true
    // // 修改原始数据
    // let changeOriginData = (indexArr)=>{
    //     let d1 = this.data[indexArr[0]]      // 查找当前节点父节点数据
    //     for(let i = 1;i<indexArr.length;i++){
    //         d1=d1[this.request['children']][indexArr[i]]
    //     }

    //     Object.keys(data).forEach(v=>{
    //         if(v !== this.request['children']){
    //             d1[v] = data[v]
    //         }
    //     })
    // }
    // let indexArr = getNodeIndex(this, d)
    // if(indexArr.length === 0) return
    // changeOriginData(indexArr)
    // changeData(this, data, indexArr, d)
    // reloadVnode(this)
}