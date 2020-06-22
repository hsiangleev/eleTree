import { getDataByIndexArr, isUndefined } from '~/opera/tools'
// 根据子节点选中情况修改父节点状态
// indexArr: 当前节点索引数组,由里向外递归,成功之后删除最后一个索引, 
// isFirst: 是否为第一次执行(第一次执行子节点可能没有所有的数据,需要使用原始数据)
export default function changeParent(options, indexArr, isFirst) {
    var arr = [...indexArr]
    arr.pop()
    if(arr.length===0) return
    // 查找当前节点父节点数据
    let d1 = getDataByIndexArr({ options, indexArr, dataType: 'vnode', nodeType: 'parent' })
    let d2 = getDataByIndexArr({ options, indexArr, dataType: 'origin', nodeType: 'parent' })
    // 判断如果有子节点属性则使用子节点状态，否则使用当前节点状态
    let f=(v)=>{return !isUndefined(v.disabledParentStatus) ? v.disabledParentStatus : v.checkedStatus}
    if(isFirst){
        let s = d2[options.request['children']].every(v=>{
            return options.defaultCheckedKeys.includes(v.id) || v.checked || f(v) === 2
        }) ? 2 : (d2[options.request['children']].some(v=>{
            return options.defaultCheckedKeys.includes(v.id) || v.checked || f(v) === 2 || f(v) === 1
        }) ? 1 : 0)
        // 如果节点禁用，则增加一个新属性标记其子节点状态，该节点的选中状态不改变
        if(d1.disabled){
            d1.disabledParentStatus = s
            d2.disabledParentStatus = s
        }else{
            d1.checkedStatus = s
            d2.checkedStatus = s
            d2[options.request['checked']] = s === 2 ? true : false
        }
    }else{
        let s = d1.children.every(v=>f(v) === 2) ? 2 : (d1.children.some(v=>f(v) === 2 || f(v) === 1) ? 1 : 0)
        // 如果节点禁用，则增加一个新属性标记其子节点状态，该节点的选中状态不改变
        if(d1.disabled){
            d1.disabledParentStatus = s
        }else{
            d1.checkedStatus = s
            d2[options.request['checked']] = s === 2 ? true : false
        }
        
    }
    changeParent(options, arr, isFirst)
}