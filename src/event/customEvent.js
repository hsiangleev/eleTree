import getCurrentNodeData from '~/opera/getCurrentNodeData'
import { symbolAttr } from '~/config'
// 事件保存
export function on(options, type, callback) {
    options[symbolAttr.eventList][type] = callback
    return this
}
// 事件触发
export function emit({options, v, type, event, otherOpt}) {
    if(options[symbolAttr.eventList][type]){
        let data = getCurrentNodeData(options, v)
        options[symbolAttr.eventList][type].call(event, Object.assign({}, otherOpt, {data, type}))
    }
}