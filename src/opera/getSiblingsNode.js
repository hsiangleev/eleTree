// 获取当前父节点的所有子节点，即兄弟节点
export default function(options, indexArr) {
    return new Promise(resolve=>{
        indexArr.length===1 && resolve(options.vnodeData)
        let d1 = options.vnodeData[indexArr[0]]
        for(let i = 1;i<indexArr.length-1;i++){
            d1=d1.children[indexArr[i]]
        }
        resolve(d1.children)
    })
}