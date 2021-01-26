
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
    let {name, key, isOpen, checked, children, disabled, isLeaf } = this.config.request
    let fn = (type)=>{
        // 更新radio数据需要判断是否需要清除数据
        if(!this.config.showRadio || this.config.radioType !== 'all') return
        if(type !== 'current'){
            this.isAlreadyRadioChecked = false
            this.currentRadioCheckedData = null
            return
        }
        // 数据部分更新时，判断被选中的节点是否在所更新的节点之内
        let f = (data) => {
            for(let i=0,len=data.length;i<len;i++){
                if(data[i][key] === this.currentRadioCheckedData[key]){
                    this.isAlreadyRadioChecked = false
                    this.currentRadioCheckedData = null
                    return true
                }else if(isArray(data[i][children]) && data[i][children].length > 0){
                    if(f(data[i][children])) return true
                }
            }
            return false
        }
        f(cData[symbolAttr.parentNode][children])
    }
    if(!cData) {
        fn()
        renderData.call(this)
        return
    }
    // 根节点判断，根节点则更新所有数据
    let pData = cData[symbolAttr.parentNode]
    if(!pData){
        fn()
        renderData.call(this)
    }else{
        fn('current')
        changeData.call(this, pData[this.config.request.children], pData, false, true)
    }
}
// pid转换
export function dataToPid(data) {
    let {name, key, isOpen, checked, children, disabled, isLeaf, pid } = this.config.request
    if(isArray(data) && data.length > 0 && (pid in data[0]) && !(children in data[0])){
        return data.filter((val) => {
            var d = data.filter((v) => val[key] === v[pid]);
            if (d.length > 0) {
                val[children] = d;
            }
            return val[pid] === this.config.defaultPid;
        })
    }
    return data
}
// json对象深copy
export function deepCopy(data) {
    let target = isArray(data) ? [] : {}
    for(let key in data){
        if(isObject(data[key]) || isArray(data[key])){
            target[key] = deepCopy(data[key])
        }else{
            target[key] = data[key]
        }
    }
    return target
}
// 深层对象继承(针对old含默认值，new含新属性)
export function dataExtend(oldData, newData) {
    let target = {}
    let data = Object.assign({}, oldData, newData)
    for(let key in data){
        if(isObject(oldData[key])){
            target[key] = dataExtend(oldData[key], newData[key] || {})
        }else{
            // 如果没有传入新数据，则使用旧数据
            target[key] = isUndefined(newData[key]) ? oldData[key] : newData[key]
        }
    }
    return target
}
// 修改父节点的选中状态，即如果父节点是选中的，子节点没有全部选中，则让父节点半选
export function changeParentCheckedStatus(data, pData) {
    let {name, key, isOpen, checked, children, disabled, isLeaf, pid } = this.config.request
    if(this.config.showCheckbox && !this.config.checkStrictly && this.config.isDefaultChangePstatus){
        data.forEach(val => {
            val[symbolAttr.parentNode] = pData
            if (val[children] && val[children].length > 0) {
                changeParentCheckedStatus.call(this, val[children], val)
            }
        })
        // 父节点选中，子节点除了disabled的节点外全部没选中，则父节点变成选中状态
        let parent = pData
        while(parent){
            parent[checked] = parent[children].filter(v=>!v[disabled]).every(v=>v[checked])
            parent = parent[symbolAttr.parentNode]
        }
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