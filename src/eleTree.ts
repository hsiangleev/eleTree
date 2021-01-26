import groupVnode from './vnode/groupVnode'
import documentEvent from './event/documentEvent'
import { showLoding, removeLoding } from './vnode/loadingVnode'
import { renderData } from './opera/renderData'
import './eleTree.css'
import { eleTreeConfig } from './config'
import ajax from './opera/ajax'
import getAllNodeData from './methods/getAllNodeData'
import { isFun, isArray, isObject, dataToPid, deepCopy, dataExtend, changeParentCheckedStatus } from './opera/tools'
import { VNode } from 'snabbdom/vnode.d'
import { init } from 'snabbdom'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { IEleTree, IEleTreeOptions, IEleTreeConfig, ITreeData, IRightMenuOptions } from './interface'
import TreeMethodsBaseClass from './methods/index'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

export class EleTree<D extends ITreeData> extends TreeMethodsBaseClass {
  node: null | VNode           // 保存当前整个虚拟dom树（为了之后的替换）
  activeElm: null | HTMLElement      // 保存上一次点击的dom节点（高亮显示）
  rightMenuCdata: null | D | IRightMenuOptions   // 当前右键时保存当前节点的数据
  rightMenuCdom: null | HTMLElement   // 当前右键时保存当前节点的dom
  rightMenuPasteData: null | D    // 右键复制之后剪贴板中保存的数据
  rightMenuNode: null | VNode | Element      // 右键菜单的虚拟dom（为了之后的替换）
  isShowRightMenu = false      // 是否显示右键菜单
  resData: any            // 获取后台数据
  customIndex: number      // 自定义索引，保证不重复
  eventList: any[] = []        // 事件列表
  config: IEleTreeConfig<D>;
  isAlreadyRadioChecked: boolean
  currentRadioCheckedData: null | D

  constructor(opts: IEleTreeOptions<D>) {
    super()
    this.documentEvent()
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
  init(opts: Partial<IEleTreeOptions<D>>, type?: string) {
    this.config = dataExtend(this.config, opts)
    if (this.config.showRadio && this.config.radioType === 'all') {
      this.isAlreadyRadioChecked = false      // 单选，如果范围为整体，记录是否有已经被选中的节点（防止给的数据有多条选中，则只选中第一条）
      this.currentRadioCheckedData = null      // 单选，如果范围为整体，记录当前被选中的数据
    }
    let rootEl = document.querySelector(this.config.el) as HTMLElement
    if (window.getComputedStyle && window.getComputedStyle(rootEl).position === 'static') {
      rootEl!.style.position = 'relative'
    }
    if (this.config.url) {
      return this.asyncData().then(data => {
        this.config.data = data
        this.render(type!)
      })
    } else if (isArray(this.config.data)) {
      this.render(type!)
    } else {
      throw new Error('没有url参数或data数据不为数组，请检查数据')
    }
  }
  render(type: string) {
    this.config.data = dataToPid<D>(this, this.config.data)
    changeParentCheckedStatus<D>(this, this.config.data)
    renderData<D>(this, true)
    // 判断重载
    if (type === 'reload') {
      let oldVnode = this.node
      if (this.activeElm) {
        this.activeElm.classList.remove('eleTree-title-active')
        this.activeElm = null
      }
      patch(oldVnode!, this.groupVnode<D>(this.config.data, true, true))
    } else {
      let el = document.createElement('div')
      document.querySelector(this.config.el)!.appendChild(el)
      patch(el, this.groupVnode<D>(this.config.data, true, true))
    }
    if (isFun(this.config.done)) {
      let d = this.resData
      if (d) {
        d[this.config.response!['dataName']] = this.getAllNodeData<D>()
      } else {
        d = { data: this.getAllNodeData<D>() }
      }
      this.config.done!(d)
    }
  }
  async asyncData() {
    this.showLoding()
    let data: any = await ajax({
      method: this.config.method || 'get',
      url: this.config.url,
      data: this.config.where || {},
      headers: this.config.headers
    })
    this.resData = data
    this.removeLoding()
    let response = this.config.response!
    if (data[response['statusName']] !== response!['statusCode']) throw data.msg
    return data[response['dataName']]
  }
  reload(opts: Partial<IEleTreeOptions<D>>) {
    this.init(opts, 'reload')
  }
}

const eleTree = <D extends ITreeData>(opts: IEleTreeOptions<D>) => {
  return new EleTree(opts)
}

export default eleTree
