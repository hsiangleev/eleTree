
import reloadVnode from '../vnode/reloadVnode'
import { symbolAttr } from '../config'
import { emit } from './customEvent'
import { paramDetection } from '../opera/tools'
import updateKeySelf from '../methods/updateKeySelf'
import { showLoding, removeLoding } from '../vnode/loadingVnode'
import getCurrentNodeData from '../opera/getCurrentNodeData'
import remove from '../methods/remove'
import { IEleTree, IEmitPayloadOtherOptions, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

export default function <D extends ITreeData>(thisTree: EleTree<D>, v: D, event: Event) {
  let options = thisTree.config
  event.preventDefault()
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  let editNodeType = v[symbolAttr.editNodeType]
  v[symbolAttr.editNodeType] = null

  // 判断是否有edit回调函数
  if (!thisTree.eventList[editNodeType]) {
    v[name] = (event.target as HTMLInputElement).value
    thisTree.reloadVnode()
    return
  }
  thisTree.showLoding()
  let otherOpt: IEmitPayloadOtherOptions<D> = {
    load(data: D[]) {
      thisTree.removeLoding()
      v[name] = (event.target as HTMLInputElement).value
      if (!data) return void thisTree.reloadVnode()
      if (paramDetection(data, 'Object', `${editNodeType}事件load方法参数为Object`)) return null
      thisTree.updateKeySelf(v[key], data)
      thisTree.reloadVnode()
    },
    stop() {
      // 如果是新增，则删除新增加的节点
      if (editNodeType !== 'edit') {
        thisTree.remove([v[key]])
      }
      thisTree.removeLoding()
      thisTree.reloadVnode()
    }
  }
  // 如果节点右键则返回当前右键节点的数据
  thisTree.rightMenuCdata && (otherOpt.rightClickData = getCurrentNodeData<D>(thisTree, thisTree.rightMenuCdata))
  // 返回的name为新输入的值
  thisTree.emit({ v: Object.assign({}, v, { [name]: (event.target as HTMLInputElement).value }), type: editNodeType, event, otherOpt })
}
