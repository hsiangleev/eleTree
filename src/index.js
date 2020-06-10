import groupVnode from '~/vnode/groupVnode'
import { renderData } from '~/opera/renderData'
import methods from '~/methods/index'
import '~/index.scss'
import { eleTreeConfig } from '~/config'
import { init } from 'snabbdom'
import ajax from '~/opera/ajax'
import { isFun } from '~/opera/tools'
import 'babel-polyfill'
var patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

const asyncData = async()=>{
    let data = await ajax({
        method: eleTreeConfig.method || 'get',
        url: eleTreeConfig.url,
        data: eleTreeConfig.where || {},
        headers: eleTreeConfig.headers
    })
    if(data[eleTreeConfig.response['statusName']] !== eleTreeConfig.response['statusCode']) throw data.msg
    isFun(eleTreeConfig.done) && eleTreeConfig.done(data)
    return data[eleTreeConfig.response['dataName']]    
}
const render = ()=>{
    renderData(eleTreeConfig)
    let el = document.createElement('div')
    document.querySelector(eleTreeConfig.el).appendChild(el)
    patch(el, groupVnode(eleTreeConfig, eleTreeConfig.vnodeData, true, true))
}
const eleTree = {
    render(opt) {
        Object.assign(eleTreeConfig, opt)
        if(Object.prototype.toString.call(opt.data) === "[object Array]"){
            render()
        }else if(eleTreeConfig.url){
            asyncData().then(data=>{
                eleTreeConfig.data = data
                render()
            })
        }else{
            throw '没有数据源，请检查是否有data或url参数'
        }

        return methods(eleTreeConfig)
    }
}


export default eleTree