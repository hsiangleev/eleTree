import changeParent from './changeParent'
// 根据所给数据重新整合一份dom节点符合的数据
export default function(options) {
    // oData: 原始当前节点列表, indexArr：当前节点的索引数组, pData：新节点的父节点, isFirst：是否第一层
    function changeData(oData, indexArr, pData, isFirst) {
        let isChangePNode = false       // 是否已经修改过父节点(只执行一次修改父节点)
        indexArr.push(-1)               // 递归一次增加一次占位
        oData.forEach((v, i)=>{
            let o = {
                title: v[options.request['name']],
                id: v[options.request['key']],
                isOpen: options.defaultExpandAll || options.defaultExpandedKeys.includes(v.id) || v.isOpen || false,
                checkedStatus: (options.defaultCheckedKeys.includes(v.id) || v.checked) ? 2 : 0,
                children: [],
                disabled: v[options.request['disabled']] || false
            }
            indexArr.splice(indexArr.length-1, 1, i)
            isFirst ? options.vnodeData.push(o) : pData.children.push(o)
            if(v[options.request['children']]) changeData(v[options.request['children']], indexArr, o)
    
            if(!options.checkStrictly && o.checkedStatus === 2 && !isChangePNode) {
                isChangePNode = true
                changeParent(options, indexArr, true)
            }
        })
        indexArr.pop()          // 递归出来减少一层
    }
    
    let indexArr = []
    let pData = {}
    let isFirst = true
    changeData(options.data, indexArr, pData, isFirst)
}