import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import getCurrentNodeData from '../opera/getCurrentNodeData'
import { paramDetection } from '../opera/tools'
import { symbolAttr } from '../config'

export default function <D extends ITreeData>(this: EleTree<D>) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf, radioChecked } = options.request

  if (options.radioType === 'all' && this.currentRadioCheckedData) {
    return [getCurrentNodeData(this, this.currentRadioCheckedData)]
  }

  if (options.radioType === 'level') {
    let results: D[] = []
    let f = (data: D[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i][radioChecked] === 2) {
          results.push(getCurrentNodeData(this, data[i]))
        }
        if (data[i][children].length > 0) f(data[i][children])
      }
    }
    f(options.data)
    return results
  }

  return []
}
