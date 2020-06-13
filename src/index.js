import groupVnode from '~/vnode/groupVnode'
import { renderData } from '~/opera/renderData'
import methods from '~/methods/index'
import '~/index.scss'
import { eleTreeConfig } from '~/config'
import { init } from 'snabbdom'
import ajax from '~/opera/ajax'
import { isFun, isArray } from '~/opera/tools'
import 'babel-polyfill'
var patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

class thisTree {
    constructor(opt) {
        this.config = Object.assign({}, eleTreeConfig, opt)
        if(this.config.url){
            this.asyncData().then(data=>{
                this.config.data = data
                this.render()
            })
        }else if(isArray(this.config.data)){
            this.render()
        }else{
            throw '没有url参数或data数据不为数组，请检查数据'
        }
    }
    render() {
        renderData(this.config)
        let el = document.createElement('div')
        document.querySelector(this.config.el).appendChild(el)
        patch(el, groupVnode(this.config, this.config.vnodeData, true, true))
    }
    async asyncData() {
        let data = await ajax({
            method: this.config.method || 'get',
            url: this.config.url,
            data: this.config.where || {},
            headers: this.config.headers
        })
        if(data[this.config.response['statusName']] !== this.config.response['statusCode']) throw data.msg
        isFun(this.config.done) && this.config.done(data)
        return data[this.config.response['dataName']]    
    }
}

const eleTree = {
    render(opt) {
        let inst = new thisTree(opt)
        return methods(inst.config)
    }
}


export default eleTree