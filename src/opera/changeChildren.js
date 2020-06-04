// 根据父节点选中情况修改字节点状态
export default function(options, v, originData) {
    let fn = function(data, originData) {
        data.forEach((item, index)=>{
            if(!item.disabled){
                item.checkedStatus = v.checkedStatus === 2 ? 2 : 0
            }else{
                item.disabledParentStatus = v.checkedStatus === 2 ? 2 : 0
            }
            originData[index][options.request['checked']] = v.checkedStatus === 2 ? true : false
            item.children.length > 0 && fn(item.children, originData[index][options.request['children']])
        })
    }
    fn(v.children, originData[options.request['children']])
}