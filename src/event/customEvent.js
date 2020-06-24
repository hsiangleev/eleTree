
export let events = {

}
// 事件保存
export function on(options, type, callback) {
    events[type+"-"+options.el] = callback
    return this
}
// 事件触发
export function emit(type, el, event, data) {
    events[type+"-"+el] && events[type+"-"+el].call(event, data)
}