// 根据子节点选中情况修改父节点状态
// indexArr: 当前节点索引数组,由里向外递归,成功之后删除最后一个索引, 
// isLast: 是否为第一次执行(第一次执行子节点可能没有所有的数据,需要使用原始数据)
export default function changeParent(options, indexArr, isLast) {
    var arr = [...indexArr]
    arr.pop()
    if(arr.length===0) return
    let d1 = options.vnodeData[arr[0]]      // 查找当前节点父节点数据
    for(let i = 1;i<arr.length;i++){
        d1=d1.children[arr[i]]
    }
    if(isLast){
        let d2 = options.data[arr[0]]
        for(let i = 1;i<arr.length;i++){
            d2=d2[options.request['children']][arr[i]]
        }
        d1.checkedStatus = d2[options.request['children']].every(v=>{
            return options.defaultCheckedKeys.includes(v.id) || v.checked || v.checkedStatus === 2
        }) ? 2 : (d2[options.request['children']].some(v=>{
            return options.defaultCheckedKeys.includes(v.id) || v.checked || v.checkedStatus === 2 || v.checkedStatus === 1
        }) ? 1 : 0)
        d2.checkedStatus = d1.checkedStatus
    }else{
        d1.checkedStatus = d1.children.every(v=>v.checkedStatus === 2) ? 2 : (d1.children.some(v=>v.checkedStatus === 2 || v.checkedStatus === 1) ? 1 : 0)
    }
    changeParent(options, arr, isLast)
}