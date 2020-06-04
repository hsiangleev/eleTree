export let events = {

}
// 事件保存
export function on({resolve, type, callback}) {
    if(callback){
        events[type] = callback
    }else{
        events[type] = data=> resolve(data)
    }
}
// 事件触发
export function emit(type, data) {
    events[type] && events[type].call(undefined, data)
}