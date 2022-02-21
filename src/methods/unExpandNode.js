import { recurseTree, updateDate, paramDetection, getNodeDataById } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
/**
 * 
 * @param {*} nodeList 需要合并的节点列表
 * @param {*} isUnExpandParent 合并节点的同时是否合并父节点
 * @param {*} isUnExpandChild 合并节点的同时是否合并子节点
 * @returns 
 */
export default function(methods, nodeList = [], isUnExpandParent = false, isUnExpandChild = false) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    
    if(paramDetection(nodeList, 'Array', 'unExpandNode方法第一个参数必须为Array')) return methods
    if(paramDetection(isUnExpandParent, 'Boolean', 'unExpandNode方法第二个参数必须为Boolean')) return methods
    if(paramDetection(isUnExpandChild, 'Boolean', 'unExpandNode方法第三个参数必须为Boolean')) return methods
    let arr = [...nodeList]
    // 查找所有节点的父节点
    if(isUnExpandParent){
        nodeList.forEach(val => {
            let parent = getNodeDataById.call(this, val)
            while(parent){
                arr.push(parent[key])
                parent = parent[symbolAttr.parentNode]
            }
        })
    }
    // 查找所有节点的子节点
    if(isUnExpandChild){
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
        if(arr.includes(data[key]) && data[isOpen] !== 0){
            data[isOpen] = 0
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}