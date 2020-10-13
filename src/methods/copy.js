import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateDate } from '~/opera/tools'
import { symbolAttr } from '~/config'
import { emit } from '~/event/customEvent'
import { showLoding, removeLoding } from '~/vnode/loadingVnode'
import remove from '~/methods/remove'
import getCurrentNodeData from '~/opera/getCurrentNodeData'

export function emitEvent(cData, eventName, successCallback, otherOpt) {
    // 判断是否有edit回调函数
    if(!this.eventList[eventName]){
        successCallback()
        return
    }
    showLoding.call(this)
    let another = {
        load: () => {
            removeLoding.call(this)
            successCallback()
        },
        stop: () => {
            removeLoding.call(this)
        }
    }
    // 如果节点右键则返回当前右键节点的数据
    this.rightMenuCdata && (another.rightClickData = getCurrentNodeData.call(this, this.rightMenuCdata))
    emit.call(this, {v: cData, type: eventName, event, otherOpt: Object.assign({}, otherOpt, another)})
}
// 粘贴初始化
const pasteInit = function(pasteType) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, pid} = options.request
    let pasteData = this.rightMenuPasteData
    if(!pasteData) return
    if(pasteData[symbolAttr.isPasteNode]) pasteType = 'move'        // 剪贴的节点不修改id
    // 深层copy，并且修改id，防止与原始的节点冲突
    let f = (data)=>{
        let obj = Array.isArray(data) ? [] : {}
        Object.keys(data).forEach(v=>{
            obj[v] = typeof data[v] === 'object' 
                ? f(data[v]) 
                : (v===key && pasteType === 'paste') ? this.customIndex++ : data[v] 
        })
        return obj
    }
    // 判断是否为剪贴的节点
    if(pasteData[symbolAttr.isPasteNode]){
        remove.call(this, null, [pasteData[key]])
    }
    return f(pasteData)
}
// 粘贴到前还是后
const pasteTypeFn = function(cData, type, pasteType) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, pid} = options.request
    let newData = pasteInit.call(this, pasteType)
    if(!newData) return
    let pData = cData[symbolAttr.parentNode]
    // 根节点判断
    if(pData){
        let index = pData[children].findIndex(v=>v[key]===cData[key])
        index = type === 'before' ? index : index + 1
        pData[children].splice(index, 0, newData)
    }else{
        let index = options.data.findIndex(v=>v[key]===cData[key])
        index = type === 'before' ? index : index + 1
        options.data.splice(index, 0, newData)
    }
    updateDate.call(this)
    reloadVnode.call(this)
}
// 传id或者id为空直接传cData，后者内部调用
export function copy(methods, id, currData) {
    let options = this.config
    if(paramDetection(id, 'String|Number', 'copy方法第一个参数必须为String|Number')) return methods

    let cData = currData || getNodeDataById.call(this, id)
    emitEvent.call(this, cData, 'copy', ()=>{
        // 先取消上次的节点剪贴
        if(this.rightMenuPasteData) this.rightMenuPasteData[symbolAttr.isPasteNode] = false
        // 数据放入剪贴板
        this.rightMenuPasteData = cData
        reloadVnode.call(this)
    })
    return methods
}
export function cutPaste(methods, id, currData) {
    let options = this.config
    if(paramDetection(id, 'String|Number', 'cutPaste方法第一个参数必须为String|Number')) return methods

    let cData = currData || getNodeDataById.call(this, id)
    emitEvent.call(this, cData, 'cut_paste', ()=>{
        if(this.rightMenuPasteData) this.rightMenuPasteData[symbolAttr.isPasteNode] = false
        cData[symbolAttr.isPasteNode] = true
        // 数据放入剪贴板
        this.rightMenuPasteData = cData
        reloadVnode.call(this)
    })
    return methods
}
/**
 * 粘贴或移动节点
 * @param {*} methods 
 * @param {*} id 
 * @param {*粘贴到子节点，节点前，节点后(children,before,after)} nodeType 
 * @param {*} currData 
 * @param {*是粘贴还是移动(paste,move)，移动不改变id} pasteType 
 */
export function paste(methods, id, nodeType = 'children', currData, pasteType = 'paste') {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, pid} = options.request
    if(paramDetection(id, 'String|Number', 'paste方法第一个参数必须为String|Number')) return methods
    if(paramDetection(id, 'String', 'paste方法第二个参数必须为String')) return methods

    let cData = currData || getNodeDataById.call(this, id)
    if(nodeType === 'children'){
        emitEvent.call(this, cData, 'paste', ()=>{
            let newData = pasteInit.call(this, pasteType)
            if(!newData) return
            cData[children].push(newData)
            updateDate.call(this)
            reloadVnode.call(this)
        })
    }else if(nodeType === 'before'){
        emitEvent.call(this, cData, 'paste_before', ()=>{
            pasteTypeFn.call(this, cData, 'before', pasteType)
        })
    }else if(nodeType === 'after'){
        emitEvent.call(this, cData, 'paste_after', ()=>{
            pasteTypeFn.call(this, cData, 'after', pasteType)
        })
    }
    return methods
}