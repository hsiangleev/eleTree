/**
 * 通过索引数组查找数据查找数据，
 * dataType数据类型，判断是原始数据还是vnode数据
 * nodeType获取的节点类型，current：当前节点，parent：父节点，sibling：兄弟节点
 */
export function getDataByIndexArr(opts) {
    let { options, indexArr, dataType = 'vnode', nodeType = 'current' } = opts
    let data = dataType === 'vnode' ? options.vnodeData : options.data
    let childAttr = dataType === 'vnode' ? 'children' : options.request['children']

    if((nodeType === 'parent' || nodeType === 'sibling') && indexArr.length === 1) return data
    let len = nodeType === 'current' 
        ? indexArr.length 
        : (nodeType === 'parent' || nodeType === 'sibling') 
            ? indexArr.length - 1
            : 0
    let d = data[indexArr[0]]
    for(let i = 1;i<len;i++){
        d=d[childAttr][indexArr[i]]
    }
    return nodeType === 'sibling' ? d[childAttr] : d
}
// 通过id查找数据和索引，dataType数据类型，判断是原始数据还是vnode数据
export function getNodeDataById(opts) {
    let { options, id, dataType = 'vnode' } = opts
    let data = dataType === 'vnode' ? options.vnodeData : options.data
    let childAttr = dataType === 'vnode' ? 'children' : options.request['children']
    let idAttr = dataType === 'vnode' ? 'id' : options.request['key']
    let fn = function(data, indexArr) {
        indexArr.push(-1)
        for(let i=0,len=data.length;i<len;i++){
            indexArr.splice(indexArr.length-1, 1, i)
            if(data[i][idAttr] === id){
                arr = [...indexArr]
                resultData = data[i]
                return true
            }else if(isArray(data[i][childAttr]) && data[i][childAttr].length > 0){
                if(fn(data[i][childAttr], indexArr)) return true
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