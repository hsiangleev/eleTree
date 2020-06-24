import { changeData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, getDataByIndexArr, isArray, paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'
/*
* id: 节点id
* data: 需要添加的子节点数据(Array)
**/
export default function(options, id, data) {
    let {key, isOpen, checked, children, disabled, isLeaf} = options.request

    if(paramDetection(id, 'String|Number', 'updateKeyChildren方法第一个参数必须为String|Number')) return this
    if(paramDetection(data, 'Array', 'updateKeyChildren方法第二个参数必须为Array')) return this

    let { indexArr, resultData } = getNodeDataById({ options, id })
    let pData = getDataByIndexArr({ options: options, indexArr, nodeType: 'parent' })
    if(indexArr.length === 0) return
    // 添加子节点的时候自动展开当前节点
    if(isArray(resultData[children])){
        resultData[children] = resultData[children].concat(data)
    }else{
        resultData[children] = data
    }
    resultData[isOpen] = 2
    resultData[symbolAttr.isRenderChild] = true
    changeData(options, resultData[children], pData, indexArr)
    reloadVnode(options)
    return this
}