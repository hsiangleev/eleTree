import { ITreeData, IEventType, IEmitPayload, IDragListenFunction, IListenFunction } from '../interface'
import getCurrentNodeData from '../opera/getCurrentNodeData'
import { EleTree } from '../eleTree'
// 事件保存
export function on<D extends ITreeData>(this: EleTree<D>, type: "drag", callback: IDragListenFunction<D>): void
export function on<D extends ITreeData>(this: EleTree<D>, type: IEventType, callback: IListenFunction<D>): void

export function on<D extends ITreeData>(this: EleTree<D>, type: IEventType, callback: IListenFunction<D> | IDragListenFunction<D>) {
  this.eventList[type] = callback
  return this
}
// 事件触发
export function emit<D extends ITreeData>(this: EleTree<D>, emitDate: IEmitPayload<D>) {
  const { v, type, event, otherOpt } = emitDate
  if (this.eventList[type]) {
    let data = getCurrentNodeData(this, v)
    this.eventList[type].call(event, Object.assign({}, otherOpt, { data, type }))
  }
}
