import getCurrentNodeData from '../opera/getCurrentNodeData'
import { on } from '../event/customEvent'
export default function(options) {
    return {
        on(type, callback) {
            on(type, callback)
        },
        // 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
        getChecked: function(leafOnly = false, includeHalfChecked = false) {
            let results = []
            let arr = []
            let f=data=>{
                for(let i=0;i<data.length;i++){
                    arr.push(i)
                    if(data[i].checkedStatus === 2){
                        results.push(getCurrentNodeData(options, data[i], arr))
                    }
                    if(data[i].children.length>0) f(data[i].children)
                    arr.pop()
                }
            }
            f(options.vnodeData)
            return results
        },
    }
}