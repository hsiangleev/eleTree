import groupVnode from '~/vnode/groupVnode'
import { showLoding, removeLoding } from '~/vnode/loadingVnode'
import rightMenu from '~/vnode/rightMenu'
import { renderData } from '~/opera/renderData'
import methods from '~/methods/index'
import '~/index.scss'
import { eleTreeConfig, symbolAttr } from '~/config'
import { init } from 'snabbdom'
import ajax from '~/opera/ajax'
import { isFun, isArray } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
import 'babel-polyfill'
var patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

class thisTree {
    constructor(opts) {
        document.addEventListener('click', ()=>{
            if(this.config.rightMenuList.length === 0) return
            // 右键菜单隐藏
            this.config[symbolAttr.isShowRightMenu] = false
            rightMenu(this.config)
        })
        this.config = {
            [symbolAttr.node]: null,            // 保存当前整个虚拟dom树（为了之后的替换）
            [symbolAttr.activeElm]: null,       // 保存上一次点击的dom节点（高亮显示）
            [symbolAttr.rightMenuCdata]: null,      
            [symbolAttr.rightMenuCdom]: null,      
            [symbolAttr.rightMenuPasteData]: null,      
            [symbolAttr.rightMenuNode]: null,      
            [symbolAttr.isShowRightMenu]: false,      
            [symbolAttr.customIndex]: 2020,      
            [symbolAttr.eventList]: []
        }
        this.config = Object.assign({}, eleTreeConfig, this.config)
        this.init(opts)
    }
    init(opts, type) {
        this.config = Object.assign({}, this.config, opts)
        let rootEl = document.querySelector(this.config.el)
        if(window.getComputedStyle && window.getComputedStyle(rootEl).position === 'static'){
            rootEl.style.position = 'relative'
        }
        if(this.config.url){
            this.asyncData().then(data=>{
                this.config.data = data
                this.render(type)
            })
        }else if(isArray(this.config.data)){
            this.render(type)
        }else{
            throw '没有url参数或data数据不为数组，请检查数据'
        }
    }
    render(type) {
        renderData(this.config, true)
        // 判断重载
        if(type === 'reload'){
            let oldVnode = this.config[symbolAttr.node];
            patch(oldVnode, groupVnode(this.config, this.config.data, true, true))
        }else{
            let el = document.createElement('div')
            document.querySelector(this.config.el).appendChild(el)
            patch(el, groupVnode(this.config, this.config.data, true, true))
        }
        isFun(this.config.done) && this.config.done(this.config.data)
    }
    async asyncData() {
        showLoding(this.config)
        let data = await ajax({
            method: this.config.method || 'get',
            url: this.config.url,
            data: this.config.where || {},
            headers: this.config.headers
        })
        removeLoding(this.config)
        let response = this.config.response
        if(data[response['statusName']] !== response['statusCode']) throw data.msg
        return data[response['dataName']]    
    }
    reload(opts) {
        this.init(opts, 'reload')
    }
}

const eleTree = {
    render(opts) {
        let inst = new thisTree(opts)
        return methods(inst)
    }
}


export default eleTree