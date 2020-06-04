import changeParent from './changeParent'
// 根据所给数据重新整合一份dom节点符合的数据
export function renderData(options) {
    let indexArr = []
    let pData = {}
    let isFirst = true
    changeData(options, options.data, indexArr, pData, isFirst)
}
// 根据原始数据复制出一份符合结构的数据
export function changeData(options, oData, indexArr, pData, isFirst) {
    // oData: 原始当前节点列表, indexArr：当前节点的索引数组, pData：新节点的父节点, isFirst：是否第一层
    let isChangePNode = false       // 是否已经修改过父节点(只执行一次修改父节点)
    // 先清空子节点，再重新插入
    if(isFirst){
        options.vnodeData = []
    }else {
        pData.children = []
    }
    indexArr.push(-1)               // 递归一次增加一次占位
    oData.forEach((v, i)=>{
        let o = {
            title: v[options.request['name']],
            id: v[options.request['key']],
            isOpen: options.defaultExpandAll || options.defaultExpandedKeys.includes(v.id) || v.isOpen || false,
            checkedStatus: (options.defaultCheckedKeys.includes(v.id) || v.checked) ? 2 : 0,
            children: [],
            disabled: v[options.request['disabled']] || false,
        }

        let pStatus = null
        if(!options.checkStrictly){
            // 如果父节点禁用,则使用备用状态,否则使用父节点状态
            pStatus = pData.disabled ? pData.disabledParentStatus === 2 : pData.checkedStatus === 2
            // 如果节点禁用,则选中状态不受父子节点影响,也不影响父子节点
            if(o.disabled){
                // 在当前节点记录父节点的选中状态(备用状态)，只有禁用的节点才有这个属性
                o.disabledParentStatus = pStatus ? 2 : 0
            }else{
                // 节点选中状态有父节点决定
                o.checkedStatus = (o.checkedStatus || pStatus) ? 2 :0
            }
        }

        indexArr.splice(indexArr.length-1, 1, i)
        isFirst ? options.vnodeData.push(o) : pData.children.push(o)
        if(v[options.request['children']]) changeData(options, v[options.request['children']], indexArr, o)

        
        // 父子关联，当前节点选中，还未修改过，父节点还未选中，非禁用
        if(!options.checkStrictly && o.checkedStatus === 2 && !isChangePNode && !pStatus && !o.disabled) {
            isChangePNode = true
            changeParent(options, indexArr, true)
        }
    })
    indexArr.pop()          // 递归出来减少一层
}