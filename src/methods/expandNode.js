import { recurseTree, updateDate, paramDetection, getNodeDataById } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
/**
 * 
 * @param {*} nodeList 需要展开的节点列表
 * @param {*} isExpandParent 展开节点的同时是否展开父节点
 * @param {*} isExpandChild 展开节点的同时是否展开子节点
 * @returns 
 */
export default function(methods, nodeList = [], isExpandParent = false, isExpandChild = false) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    
    if(paramDetection(nodeList, 'Array', 'expandNode方法第一个参数必须为Array')) return methods
    if(paramDetection(isExpandParent, 'Boolean', 'expandNode方法第二个参数必须为Boolean')) return methods
    if(paramDetection(isExpandChild, 'Boolean', 'expandNode方法第三个参数必须为Boolean')) return methods
    let arr = [...nodeList]
    // 查找所有节点的父节点
    if(isExpandParent){
        nodeList.forEach(val => {
            let parent = getNodeDataById.call(this, val)
            while(parent){
                arr.push(parent[key])
                parent = parent[symbolAttr.parentNode]
            }
        })
    }
    // 查找所有节点的子节点
    if(isExpandChild){
        nodeList.forEach(val => {
            let parent = getNodeDataById.call(this, val)
            let f = (data)=>{
                for(let i=0,len=data.length;i<len;i++){
                    if(data[i][children].length > 0) f(data[i][children])
                    arr.push(data[i][key])
                }
            }
            f(parent[children])
        })
    }
    // 去重
    arr = [...new Set(arr)]
    recurseTree.call(this, (data)=>{
        if(arr.includes(data[key])){
            // 懒加载情况
            if(options.lazy){
                if(data[symbolAttr.isLazyNode] && data[isOpen] !== 2){
                    data[isOpen] = 2
                }
            }else if(data[isOpen] !== 2){
                data[isOpen] = 2
            }
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}