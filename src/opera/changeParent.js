// 根据子节点选中情况修改父节点状态
// indexArr: 当前节点索引数组,由里向外递归,成功之后删除最后一个索引, 
// isFirst: 是否为第一次执行(第一次执行子节点可能没有所有的数据,需要使用原始数据)
export default function changeParent(options, indexArr, isFirst) {
    var arr = [...indexArr]
    arr.pop()
    if(arr.length===0) return
    let d1 = options.vnodeData[arr[0]]      // 查找当前节点父节点数据
    for(let i = 1;i<arr.length;i++){
        d1=d1.children[arr[i]]
    }
    // 判断如果有子节点属性则使用子节点状态，否则使用当前节点状态
    let f=(v)=>{return Object.prototype.toString.call(v.childrenStatus) !== '[object Undefined]' ? v.childrenStatus : v.checkedStatus}
    if(isFirst){
        let d2 = options.data[arr[0]]
        for(let i = 1;i<arr.length;i++){
            d2=d2[options.request['children']][arr[i]]
        }
        let s = d2[options.request['children']].every(v=>{
            return options.defaultCheckedKeys.includes(v.id) || v.checked || f(v) === 2
        }) ? 2 : (d2[options.request['children']].some(v=>{
            return options.defaultCheckedKeys.includes(v.id) || v.checked || f(v) === 2 || f(v) === 1
        }) ? 1 : 0)
        // 如果节点禁用，则增加一个新属性标记其子节点状态，该节点的选中状态不改变
        if(d1.disabled){
            d1.childrenStatus = s
            d2.childrenStatus = s
        }else{
            d1.checkedStatus = s
            d2.checkedStatus = s
        }
    }else{
        let s = d1.children.every(v=>f(v) === 2) ? 2 : (d1.children.some(v=>f(v) === 2 || f(v) === 1) ? 1 : 0)
        // 如果节点禁用，则增加一个新属性标记其子节点状态，该节点的选中状态不改变
        if(d1.disabled){
            d1.childrenStatus = s
        }else{
            d1.checkedStatus = s
        }
        
    }
    changeParent(options, arr, isFirst)
}