import getCurrentNodeData from '../opera/getCurrentNodeData'
// 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
export default function(leafOnly = false, includeHalfChecked = false) {
    let results = []
    let arr = []
    let f=data=>{
        for(let i=0;i<data.length;i++){
            arr.push(i)
            // 当状态为status，代表选中
            let fn = (status)=>{
                if(data[i].checkedStatus === status){
                    results.push(getCurrentNodeData(this, data[i], arr))
                }
            }
            // 是否只是叶子节点
            if(leafOnly){
                if(data[i].children.length === 0) fn(2)
            }else{
                fn(2)
                // 是否包含半选
                if(includeHalfChecked) fn(1)
            }
            if(data[i].children.length>0) f(data[i].children)
            arr.pop()
        }
    }
    f(this.vnodeData)
    return results
}