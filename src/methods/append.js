import { renderData, changeData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, isArray, paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 添加子节点
 * @param {*查找节点id，传null或空字符串则会添加到根节点} id 
 * @param {*添加的子节点数据} data 
 */
export default function(options, id, data) {
    let {key, isOpen, checked, children, disabled, isLeaf} = options.request
    if(id === null) id = ''
    if(paramDetection(id, 'String|Number', 'append方法第一个参数必须为String|Number')) return this
    if(paramDetection(data, 'Array', 'append方法第二个参数必须为Array')) return this

    // 添加到最外层
    if(id === ''){
        options.data = options.data.concat(data)
        renderData(options)
        reloadVnode(options)
        return this
    }
    let cData = getNodeDataById(options, id)
    if(!cData) return this      // 没找到
    if(isArray(cData[children])){
        cData[children] = cData[children].concat(data)
    }else{
        cData[children] = data
    }
    // 添加子节点的时候自动展开当前节点
    cData[isOpen] = 2
    cData[symbolAttr.isRenderChild] = true
    // 根节点判断
    let pData = cData[symbolAttr.parentNode]
    if(!pData){
        renderData(options)
    }else{
        changeData(options, pData[children], pData, false, true)
    }
    reloadVnode(options)
    return this
}