import groupVnode from '~/vnode/groupVnode'
import documentEvent from '~/event/documentEvent'
import { showLoding, removeLoding } from '~/vnode/loadingVnode'
import { renderData } from '~/opera/renderData'
import methods from '~/methods/index'
import '~/index.scss'
import { eleTreeConfig } from '~/config'
import { init } from 'snabbdom'
import ajax from '~/opera/ajax'
import getAllNodeData from '~/methods/getAllNodeData'
import { isFun, isArray, isObject, dataToPid, deepCopy, dataExtend, changeParentCheckedStatus } from '~/opera/tools'
var patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

class thisTree {
    constructor(opts) {
        documentEvent.call(this)
        this.node = null            // 保存当前整个虚拟dom树（为了之后的替换）
        this.activeElm = null       // 保存上一次点击的dom节点（高亮显示）
        this.rightMenuCdata = null      // 当前右键时保存当前节点的数据
        this.rightMenuCdom = null      // 当前右键时保存当前节点的dom
        this.rightMenuPasteData = null      // 右键复制之后剪贴板中保存的数据
        this.rightMenuNode = null      // 右键菜单的虚拟dom（为了之后的替换）
        this.isShowRightMenu = false      // 是否显示右键菜单
        this.resData = null             // 获取后台数据
        this.customIndex = Date.now()      // 自定义索引，保证不重复
        this.eventList = []        // 事件列表
        this.config = deepCopy(eleTreeConfig)
        this.init(opts)
    }
    init(opts, type) {
        this.config = dataExtend(this.config, opts)
        if(this.config.showRadio && this.config.radioType === 'all'){
            this.isAlreadyRadioChecked = false      // 单选，如果范围为整体，记录是否有已经被选中的节点（防止给的数据有多条选中，则只选中第一条）
            this.currentRadioCheckedData = null      // 单选，如果范围为整体，记录当前被选中的数据
        }
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
        this.config.data = dataToPid.call(this, this.config.data)
        changeParentCheckedStatus.call(this, this.config.data)
        renderData.call(this, true)
        // 判断重载
        if(type === 'reload'){
            let oldVnode = this.node
            if(this.activeElm){
                this.activeElm.classList.remove('eleTree-title-active')
                thisTree.activeElm = null
            }
            patch(oldVnode, groupVnode.call(this, this.config.data, true, true))
        }else{
            let el = document.createElement('div')
            document.querySelector(this.config.el).appendChild(el)
            patch(el, groupVnode.call(this, this.config.data, true, true))
        }
        if(isFun(this.config.done)){
            let d = this.resData
            if(d){
                d[this.config.response['dataName']] = getAllNodeData.call(this)
            }else{
                d = {data: getAllNodeData.call(this)}
            }
            this.config.done(d)
        }
    }
    async asyncData() {
        showLoding.call(this)
        let data = await ajax({
            method: this.config.method || 'get',
            url: this.config.url,
            data: this.config.where || {},
            headers: this.config.headers
        })
        this.resData = data
        removeLoding.call(this)
        let response = this.config.response
        if(data[response['statusName']] !== response['statusCode']) throw data.msg
        return data[response['dataName']]    
    }
    reload(opts) {
        this.init(opts, 'reload')
    }
}

const eleTree = (opts) => methods.call(new thisTree(opts))

export default eleTree