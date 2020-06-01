// 获取某个节点在整个数据中的索引数组
export default function(options, v) {
    let fn = function(data, indexArr) {
        indexArr.push(-1)
        for(let i=0;i<data.length;i++){
            indexArr.splice(indexArr.length-1, 1, i)
            if(data[i].id !== v.id){
                data[i].children.length > 0 && fn(data[i].children, indexArr)
            }else{
                arr = [...indexArr]
                return
            }
        }
        indexArr.pop()
    }
    let indexArr = []
    let arr = []
    return new Promise(resolve=>{
        fn(options.vnodeData, indexArr)
        resolve(arr)
    })
}