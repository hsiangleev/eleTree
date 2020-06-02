import getCurrentNodeData from '../opera/getCurrentNodeData'
export default function(options) {
    return {
        // 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
        getChecked: function(leafOnly = false, includeHalfChecked = false) {
            return new Promise(async(resolve)=>{
                let promises = []
                let f=data=>{
                    for(let i=0;i<data.length;i++){
                        if(data[i].checkedStatus === 2){
                            promises.push(getCurrentNodeData(options, data[i]))
                        }
                        if(data[i].children.length>0) f(data[i].children)
                    }
                }
                f(options.vnodeData)
                let results = await Promise.all(promises);
                resolve(results)
            })
        },
    }
}