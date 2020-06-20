
export let events = {

}
// 事件保存
export function on(type, el, callback) {
    events[type+"-"+el] = callback
}
// 事件触发
export function emit(type, el, event, data) {
    events[type+"-"+el] && events[type+"-"+el].call(event, data)
}