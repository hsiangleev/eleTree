
export function getCurrentDataByIndexArr(data, indexArr, attr) {
    let d = data[indexArr[0]]
    for(let i = 1;i<indexArr.length;i++){
        d=d[attr][indexArr[i]]
    }
    return d
}
export function getParentDataByIndexArr(data, indexArr, attr) {
    if(indexArr.length===1) return data
    let d = data[indexArr[0]]
    for(let i = 1;i<indexArr.length-1;i++){
        d=d[attr][indexArr[i]]
    }
    return d
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