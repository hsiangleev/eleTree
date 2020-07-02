import getCurrentNodeData from '~/opera/getCurrentNodeData'
// 事件保存
export function on(methods, type, callback) {
    this.eventList[type] = callback
    return methods
}
// 事件触发
export function emit({v, type, event, otherOpt}) {
    if(this.eventList[type]){
        let data = getCurrentNodeData.call(this, v)
        this.eventList[type].call(event, Object.assign({}, otherOpt, {data, type}))
    }
}