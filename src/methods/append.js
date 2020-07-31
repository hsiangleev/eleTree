import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, paramDetection, updateDate, isArray, isObject } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 添加子节点
 * @param {*查找节点id，传null或空字符串则会添加到根节点, 不传则代表数据结构为pid} id 
 * @param {*添加的子节点数据} data 
 */
export default function(methods, id, data) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, pid} = options.request

    // 省略id, pid格式添加
    if(isObject(id) || isArray(id)){
        data = isObject(id) ? [id] : id
        for (let i = 0; i < data.length; i++) {
            let id = data[i][pid]
            // 根节点
            if(id === options.defaultPid){
                options.data = options.data.concat([data[i]])
            }else{
                let cData = getNodeDataById.call(this, id)
                if(!cData) continue      // 没找到
                cData[children] = cData[children] ? cData[children].concat([data[i]]) : [data[i]]
                // 添加子节点的时候自动展开当前节点
                cData[isOpen] = 2
                cData[symbolAttr.isRenderChild] = true
            }
        }
        updateDate.call(this)
        reloadVnode.call(this)
        return methods
    }
    
    data = isArray(data) ? data : [data]
    // 添加到最外层
    if(id === '' || id === null){
        options.data = options.data.concat(data)
        updateDate.call(this)
        reloadVnode.call(this)
        return methods
    }

    let cData = getNodeDataById.call(this, id)
    if(!cData) return methods      // 没找到
    cData[children] = cData[children].concat(data)
    // 添加子节点的时候自动展开当前节点
    cData[isOpen] = 2
    cData[symbolAttr.isRenderChild] = true
    updateDate.call(this, cData)
    reloadVnode.call(this)
    return methods
}