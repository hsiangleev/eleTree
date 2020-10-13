
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
import { emit } from '~/event/customEvent'
import { paramDetection } from '~/opera/tools'
import updateKeySelf from '~/methods/updateKeySelf'
import { showLoding, removeLoding } from '~/vnode/loadingVnode'
import getCurrentNodeData from '~/opera/getCurrentNodeData'

export default function(thisTree, v, event) {
    let options = thisTree.config
    event.preventDefault()
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let editNodeType = v[symbolAttr.editNodeType]
    v[symbolAttr.editNodeType] = null

    // 判断是否有edit回调函数
    if(!thisTree.eventList[editNodeType]){
        v[name] = event.target.value
        reloadVnode.call(thisTree)
        return
    }
    showLoding.call(thisTree)
    let otherOpt = {
        load(data) {
            removeLoding.call(thisTree)
            v[name] = event.target.value
            if(!data) return void reloadVnode.call(thisTree)
            if(paramDetection(data, 'Object', `${editNodeType}事件load方法参数为Object`)) return null
            updateKeySelf.call(thisTree, null, v[key], data)
            reloadVnode.call(thisTree)
        },
        stop() {
            removeLoding.call(thisTree)
            reloadVnode.call(thisTree)
        }
    }
    // 如果节点右键则返回当前右键节点的数据
    thisTree.rightMenuCdata && (otherOpt.rightClickData = getCurrentNodeData.call(thisTree, thisTree.rightMenuCdata))
    emit.call(thisTree, {v, type: editNodeType, event, otherOpt})
}