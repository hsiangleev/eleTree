import changeParent from './changeParent'
// 根据所给数据重新整合一份dom节点符合的数据
export default function(options) {
    // oData: 原始当前节点列表, indexArr：当前节点的索引数组, pData：新节点的父节点, isFirst：是否第一层
    function changeData(oData, indexArr, pData, isFirst) {
        let isChangePNode = false       // 是否已经修改过父节点(只执行一次修改父节点)
        indexArr.push(-1)               // 递归一次增加一次占位
        oData.forEach((v, i)=>{
            let o = {
                title: v.title,
                id: v.id,
                isOpen: v.isOpen || false,
                checkedStatus: v.checked ? 2 : 0,
                children: []
            }
            indexArr.splice(indexArr.length-1, 1, i)
            isFirst ? options.vnodeData.push(o) : pData.children.push(o)
            if(v.children) changeData(v.children, indexArr, o)
    
            if(v.checked && !isChangePNode) {
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