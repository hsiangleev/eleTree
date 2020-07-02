
import { renderData, changeData } from '~/opera/renderData'
import { symbolAttr } from '~/config'
// 通过id查找数据和索引
export function getNodeDataById(id) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = this.config.request
    let resultData = null
    // 函数返回值为了跳出递归，即条件成立返回true，如果递归函数为true返回true，其他情况一律返回false
    let fn = function(data) {
        for(let i=0,len=data.length;i<len;i++){
            if(data[i][key] === id){
                resultData = data[i]
                return true
            }else if(isArray(data[i][children]) && data[i][children].length > 0){
                if(fn(data[i][children])) return true
            }
        }
        return false
    }
    fn(this.config.data)
    return resultData
}
/**
 * 递归遍历树节点
 * @param {*} options 
 * @param {*回调数据} callback 
 */
export function recurseTree(callback) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = this.config.request
    let f = (data)=>{
        for(let i=0,len=data.length;i<len;i++){
            callback(data[i])
            if(data[i][children].length > 0){
                f(data[i][children])
            }
        }
    }
    f(this.config.data)
}
// 更新当前节点数据,不传cData则更新所有数据(把给的原始数据修改为符合节点的数据)
export function updateDate(cData) {
    if(!cData) {
        renderData.call(this)
        return
    }
    // 根节点判断，根节点则更新所有数据
    let pData = cData[symbolAttr.parentNode]
    if(!pData){
        renderData.call(this)
    }else{
        changeData.call(this, pData[this.config.request.children], pData, false, true)
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