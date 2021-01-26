import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import getCurrentNodeData from '../opera/getCurrentNodeData'
import { symbolAttr } from '../config'

/**
 * 获取所有数据
 * @param {*返回数据类型，c:父子结构，p:pid结构} type
 */
export default function <D extends ITreeData>(this: EleTree<D>, type: 'c' | 'p' = 'c') {
  let options = this.config
  let { key, isOpen, checked, children, disabled, isLeaf, pid } = options.request

  let result: D[] = []
  let childFn = (data: D[], res: D[]) => {
    for (let i = 0; i < data.length; i++) {
      res.push(getCurrentNodeData(this, data[i]))
      if (data[i][children].length > 0) {
        res[i][children] = []
        childFn(data[i][children], res[i][children])
      }
    }
  }
  let pidFn = (data: D[], res: D[]) => {
    for (let i = 0; i < data.length; i++) {
      let cData = getCurrentNodeData(this, data[i])
      let pData = data[i][symbolAttr.parentNode]
      cData[pid] = pData ? pData[key] : options.defaultPid
      res.push(cData)
      if (data[i][children].length > 0) {
        pidFn(data[i][children], res)
      }
    }
  }
  let f = type === 'c'
    ? childFn
    : type === 'p'
      ? pidFn
      : null
  f && f(options.data, result)

  return result
}
