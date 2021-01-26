import { ITreeData, IEleTree, IEleTreeOptions } from '../interface'
import { EleTree } from '../eleTree'
import { paramDetection } from '../opera/tools'
/**
 * 插入节点
 * @param {*重载传入的新参数} opts
 */
export default function <D extends ITreeData>(this: IEleTree<D>, opts: Partial<IEleTreeOptions<D>> = {}) {
  if (paramDetection(opts, 'Object', 'reload方法第一个参数必须为Object')) return this
  this.constructor.prototype.reload.call(this, opts)
  return this
}
