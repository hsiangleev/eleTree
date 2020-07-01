
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
import { emit } from '~/event/customEvent'
import { paramDetection } from '~/opera/tools'
import updateKeySelf from '~/methods/updateKeySelf'
import { showLoding, removeLoding } from '~/vnode/loadingVnode'

export default function(options, v, event) {
    event.preventDefault()
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let editNodeType = v[symbolAttr.editNodeType]
    v[symbolAttr.editNodeType] = null

    // 判断是否有edit回调函数
    if(!options[symbolAttr.eventList][editNodeType]){
        v[name] = event.target.value
        reloadVnode(options)
        return
    }
    showLoding(options)
    emit({options, v, type: editNodeType, event, otherOpt: {
        load(data) {
            removeLoding(options)
            v[name] = event.target.value
            if(!data) return void reloadVnode(options)
            if(paramDetection(data, 'Object', `${editNodeType}事件load方法参数为Object`)) return null
            updateKeySelf(options, v[key], data)
            reloadVnode(options)
        },
        stop() {
            removeLoding(options)
            reloadVnode(options)
        }
    }})
}