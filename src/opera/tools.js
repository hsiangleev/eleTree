/**
 * 通过索引数组查找数据查找数据
 * @param {*} opts 
 * options，indexArr，nodeType
 * nodeType获取的节点类型，current：当前节点，parent：父节点，sibling：兄弟节点
 */
export function getDataByIndexArr(opts) {
    let { options, indexArr, nodeType = 'current' } = opts
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let data = options.data

    if((nodeType === 'parent' || nodeType === 'sibling') && indexArr.length === 1) return data
    let len = nodeType === 'current' 
        ? indexArr.length 
        : (nodeType === 'parent' || nodeType === 'sibling') 
            ? indexArr.length - 1
            : 0
    let d = data[indexArr[0]]
    for(let i = 1;i<len;i++){
        d=d[children][indexArr[i]]
    }
    return nodeType === 'sibling' ? d[children] : d
}
// 通过id查找数据和索引
export function getNodeDataById(opts) {
    let { options, id } = opts
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let data = options.data
    // 函数返回值为了跳出递归，即条件成立返回true，如果递归函数为true返回true，其他情况一律返回false
    let fn = function(data, indexArr) {
        indexArr.push(-1)
        for(let i=0,len=data.length;i<len;i++){
            indexArr.splice(indexArr.length-1, 1, i)
            if(data[i][key] === id){
                arr = [...indexArr]
                resultData = data[i]
                return true
            }else if(isArray(data[i][children]) && data[i][children].length > 0){
                if(fn(data[i][children], indexArr)) return true
            }
        }
        indexArr.pop()
        return false
    }
    let indexArr = []
    let arr = []
    let resultData = []
    fn(data, indexArr)
    return {
        resultData,         // 获取某个节点数据
        indexArr: arr,      // 获取某个节点在整个数据中的索引数组
    }
}
/**
 * 递归遍历树节点
 * @param {*} options 
 * @param {*回调数据} callback 
 */
export function recurseTree(options, callback) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let f = (data)=>{
        for(let i=0,len=data.length;i<len;i++){
            callback(data[i])
            if(data[i][children].length > 0){
                f(data[i][children])
            }
        }
    }
    f(options.data)
}
export function isFun(data) {
    return Object.prototype.toString.call(data) === '[object Function]'
}
export function isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]'
}
export function isUndefined(data) {
    return Object.prototype.toString.call(data) === '[object Undefined]'
}
export function isArray(data) {
    return Object.prototype.toString.call(data) === '[object Array]'
}
export function isBoolean(data) {
    return Object.prototype.toString.call(data) === '[object Boolean]'
}
export function isString(data) {
    return Object.prototype.toString.call(data) === '[object String]'
}
export function isNumber(data) {
    return Object.prototype.toString.call(data) === '[object Number]'
}
// 参数检测
export function paramDetection(param, type, msg) {
    let typeArray = type.split("|")
    let isSuccess = false
    for(let i=0,len=typeArray.length;i<len;i++){
        let fn = isString
        switch (typeArray[i]) {
            case 'String': fn = isString; break;
            case 'Boolean': fn = isBoolean; break;
            case 'Array': fn = isArray; break;
            case 'Object': fn = isObject; break;
            case 'Function': fn = isFun; break;
            case 'Number': fn = isNumber; break;
            default: break;
        }
        // 只要有一个条件满足就结束循环
        if(fn(param)) {
            isSuccess = true
            break
        }
    }
    // 判断是否所有条件都不满足
    if(!isSuccess) {
        console.warn(`eleTree方法参数错误：${msg}`)
        return true
    }
    return false
}