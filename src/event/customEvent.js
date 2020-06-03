
export let events = {

}
// 事件保存
export function on(type, callback) {
    events[type] = callback
}
// 事件触发
export function emit(type, data) {
    events[type] && events[type].call(data.event, {data: data.data, type: data.type})
}