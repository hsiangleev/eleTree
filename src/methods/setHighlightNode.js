import { paramDetection, getNodeDataById, getDomByIndex } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 
 * @param {*} id 节点id，传空字符串，则清空高亮选中
 * @returns 
 */
export default function(methods, id) {
    let options = this.config
    if(paramDetection(id, 'String|Number', 'setHighlightNode方法第一个参数必须为String|Number')) return methods
    if(id === '') {
        this.activeElm && this.activeElm.classList.remove('eleTree-title-active')
        this.activeElm = null
        return methods
    }
    let node = getNodeDataById.call(this, id)
    if(!node) return methods
    const elm = getDomByIndex.call(this, this[symbolAttr.nodeFloorIndex]).querySelector('.eleTree-title')
    if(options.highlightCurrent){
        this.activeElm && this.activeElm.classList.remove('eleTree-title-active')
        elm.classList.add('eleTree-title-active')
        this.activeElm = elm
    }
    return methods
}