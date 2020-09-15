import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateDate, isArray, isObject, isString, isNumber } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 添加子节点
 * @param {*查找节点id} id 
 * @param {*当前编辑的节点类型，对应触发的回调事件名称，[edit|add_child|add_before|add_after]} editNodeType 
 */
export default function(methods, id, editNodeType) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, pid} = options.request

    let cData = id
    if(isString(cData) || isNumber(cData)){
        cData = getNodeDataById.call(this, cData)
    }
    if(!cData) return methods
    cData[symbolAttr.editNodeType] = editNodeType || 'edit'
    reloadVnode.call(this)
    let text_edit = document.querySelector(options.el + ' .eleTree-text_edit')
    if(!text_edit) return methods
    text_edit.focus()
    text_edit.select()

    return methods
}