
import { renderData, changeData } from './renderData'
import { symbolAttr } from '../config'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

// 通过id查找数据和索引
export function getNodeDataById<D extends ITreeData>(thisTree: EleTree<D>, id: string | number): D | null {
  let { name, key, isOpen, checked, children, disabled, isLeaf } = thisTree.config.request
  let resultData: D | null = null
  // 函数返回值为了跳出递归，即条件成立返回true，如果递归函数为true返回true，其他情况一律返回false
  let fn = function (data: D[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][key] === id) {
        resultData = data[i]
        return true
      } else if (isArray(data[i][children]) && data[i][children].length > 0) {
        if (fn(data[i][children])) return true
      }
    }
    return false
  }
  fn(thisTree.config.data)
  return resultData
}
/**
 * 递归遍历树节点
 * @param {*} options
 * @param {*回调数据} callback
 */
export function recurseTree<D extends ITreeData>(thisTree: EleTree<D>, callback: (data: D) => void) {
  let { name, key, isOpen, checked, children, disabled, isLeaf } = thisTree.config.request
  let f = (data: D[]) => {
    for (let i = 0; i < data.length; i++) {
      callback(data[i])
      if (data[i][children].length > 0) {
        f(data[i][children])
      }
    }
  }
  f(thisTree.config.data)
}
// 更新当前节点数据,不传cData则更新所有数据(把给的原始数据修改为符合节点的数据)
export function updateData<D extends ITreeData>(thisTree: EleTree<D>, cData?: D) {
  let { name, key, isOpen, checked, children, disabled, isLeaf } = thisTree.config.request
  let fn = (type?: string) => {
    // 更新radio数据需要判断是否需要清除数据
    if (!thisTree.config.showRadio || thisTree.config.radioType !== 'all') return
    if (type !== 'current') {
      thisTree.isAlreadyRadioChecked = false
      thisTree.currentRadioCheckedData = null
      return
    }
    // 数据部分更新时，判断被选中的节点是否在所更新的节点之内
    let f = (data: D[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i][key] === thisTree.currentRadioCheckedData![key]) {
          thisTree.isAlreadyRadioChecked = false
          thisTree.currentRadioCheckedData = null
          return true
        } else if (isArray(data[i][children]) && data[i][children].length > 0) {
          if (f(data[i][children])) return true
        }
      }
      return false
    }
    f(cData && cData[symbolAttr.parentNode][children])
  }
  if (!cData) {
    fn()
    renderData(thisTree)
    return
  }
  // 根节点判断，根节点则更新所有数据
  let pData = cData[symbolAttr.parentNode]
  if (!pData) {
    fn()
    renderData(thisTree)
  } else {
    fn('current')
    changeData(thisTree, pData[thisTree.config.request.children], pData, false, true)
  }
}
// pid转换
export function dataToPid<D extends ITreeData>(thisTree: EleTree<D>, data: D[]) {
  let { name, key, isOpen, checked, children, disabled, isLeaf, pid } = thisTree.config.request
  let data0 = data[0] as D
  if (isArray(data) && data.length > 0 && (pid in data0) && !(children in data0)) {
    return data.filter((val: D) => {
      const d = data.filter((v) => val[key] === v[pid]);
      if (d.length > 0) {
        val[children] = d;
      }
      return val[pid] === thisTree.config.defaultPid;
    })
  }
  return data
}
// json对象深copy
export function deepCopy(data: any): any {
  let target = isArray(data) ? [] : {}
  for (let key in data) {
    if (isObject(data[key]) || isArray(data[key])) {
      target[key] = deepCopy(data[key])
    } else {
      target[key] = data[key]
    }
  }
  return target
}
// 深层对象继承(针对old含默认值，new含新属性)
export function dataExtend(oldData: any, newData: any): any {
  let target = {}
  let data = Object.assign({}, oldData, newData)
  for (let key in data) {
    if (isObject(oldData[key])) {
      target[key] = dataExtend(oldData[key], newData[key] || {})
    } else {
      // 如果没有传入新数据，则使用旧数据
      target[key] = isUndefined(newData[key]) ? oldData[key] : newData[key]
    }
  }
  return target
}
// 修改父节点的选中状态，即如果父节点是选中的，子节点没有全部选中，则让父节点半选
export function changeParentCheckedStatus<D extends ITreeData>(thisTree: EleTree<D>, data: D[], pData?: D) {
  let { name, key, isOpen, checked, children, disabled, isLeaf, pid } = thisTree.config.request
  if (thisTree.config.showCheckbox && !thisTree.config.checkStrictly && thisTree.config.isDefaultChangePstatus) {
    data.forEach(val => {
      if (val[children] && val[children].length > 0) {
        changeParentCheckedStatus(thisTree, val[children], val)
      }
    })
    // 父节点选中，子节点除了disabled的节点外全部没选中，则父节点变成选中状态
    if (pData) {
      pData[checked] = pData[children].filter((v: D) => !v[disabled]).every((v: D) => v[checked])
    }
  }
}
export function isFun(data: any): data is Function {
  return Object.prototype.toString.call(data) === '[object Function]'
}
export function isObject(data: any): data is Object {
  return Object.prototype.toString.call(data) === '[object Object]'
}
export function isUndefined(data: any): data is undefined {
  return Object.prototype.toString.call(data) === '[object Undefined]'
}
export function isArray(data: any): data is [] {
  return Object.prototype.toString.call(data) === '[object Array]'
}
export function isBoolean(data: any): data is boolean {
  return Object.prototype.toString.call(data) === '[object Boolean]'
}
export function isString(data: any): data is string {
  return Object.prototype.toString.call(data) === '[object String]'
}
export function isNumber(data: any): data is number {
  return Object.prototype.toString.call(data) === '[object Number]'
}
// 参数检测
export function paramDetection(param: any, type: string, msg: string) {
  let typeArray = type.split("|")
  let isSuccess = false
  for (let i = 0; i < typeArray.length; i++) {
    let fn: Function = isString
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
    if (fn(param)) {
      isSuccess = true
      break
    }
  }
  // 判断是否所有条件都不满足
  if (!isSuccess) {
    console.warn(`eleTree方法参数错误：${msg}`)
    return true
  }
  return false
}
