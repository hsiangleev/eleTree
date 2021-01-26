import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import getCurrentNodeData from '../opera/getCurrentNodeData'
export default function <D extends ITreeData>(this: EleTree<D>) {
  if (this.rightMenuPasteData) {
    return getCurrentNodeData(this, this.rightMenuPasteData)
  }
  return null
}
