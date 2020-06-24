import groupVnode from '~/vnode/groupVnode'
import loadingVnode from '~/vnode/loadingVnode'
import { renderData } from '~/opera/renderData'
import methods from '~/methods/index'
import '~/index.scss'
import { eleTreeConfig, symbolAttr } from '~/config'
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
        this.config[symbolAttr.node] = null             // 保存当前整个虚拟dom树（为了之后的替换）
        this.config[symbolAttr.activeElm] = null        // 保存上一次点击的dom节点（高亮显示）
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
        renderData(this.config, true)
        let el = document.createElement('div')
        document.querySelector(this.config.el).appendChild(el)
        patch(el, groupVnode(this.config, this.config.data, true, true))
        isFun(this.config.done) && this.config.done(this.config.data)
    }
    async asyncData() {
        let el = document.createElement('div')
        document.querySelector(this.config.el).appendChild(el)
        patch(el, loadingVnode(this.config))
        let data = await ajax({
            method: this.config.method || 'get',
            url: this.config.url,
            data: this.config.where || {},
            headers: this.config.headers
        })
        let loadingEl = document.querySelector(this.config.el + ">.eleTree-loading")
        loadingEl.parentNode.removeChild(loadingEl)
        let response = this.config.response
        if(data[response['statusName']] !== response['statusCode']) throw data.msg
        return data[response['dataName']]    
    }
}

const eleTree = {
    render(opt) {
        let inst = new thisTree(opt)
        return methods(inst.config)
    }
}


export default eleTree