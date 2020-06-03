// 获取某个节点在整个数据中的索引数组
export default function(options, id) {
    // 递归添加返回值，为了跳出递归函数，即找到之后不往下走了
    let fn = function(data, indexArr) {
        indexArr.push(-1)
        for(let i=0;i<data.length;i++){
            indexArr.splice(indexArr.length-1, 1, i)
            if(data[i].id === id){
                arr = [...indexArr]
                return true
            }else if(data[i].children.length > 0){
                if(fn(data[i].children, indexArr)) return true
            }
        }
        indexArr.pop()
        return false
    }
    let indexArr = []
    let arr = []
    fn(options.vnodeData, indexArr)
    return arr
}