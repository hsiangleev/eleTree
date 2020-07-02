// 根据父节点选中情况修改字节点状态
export default function(v) {
    let {name, key, isOpen, checked, children, disabled, isLeaf} = this.config.request
    let fn = function(data) {
        data.forEach((item, index)=>{
            if(!item[disabled]){
                item[checked] = v[checked] === 2 ? 2 : 0
            }else{
                item.disabledParentStatus = v[checked] === 2 ? 2 : 0
            }
            item[children].length > 0 && fn(item[children])
        })
    }
    fn(v[children])
}