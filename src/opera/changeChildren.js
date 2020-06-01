// 根据父节点选中情况修改字节点状态
export default function(v) {
    let fn = function(data) {
        data.forEach(item=>{
            item.checkedStatus = v.checkedStatus === 2 ? 2 : 0
            item.children.length > 0 && fn(item.children)
        })
    }
    fn(v.children)
}