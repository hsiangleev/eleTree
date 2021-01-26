import { VNode } from 'snabbdom/vnode.d'

interface MapLike<T> {
  [index: string]: T;
}

type IIconOptions = {
  fold?: string,
  leaf?: string,
  checkFull?: string,
  checkHalf?: string,
  checkNone?: string,
  dropdownOff?: string,
  dropdownOn?: string,
  loading?: string,
  radioCheck?: string,
  radioCheckNone?: string
}

type IRequestOptions = {
  name?: string,
  key?: string,
  children?: string,
  disabled?: string,       // 被禁用的节点不会影响父子节点的选中状态
  checked?: string,
  isOpen?: string,
  isLeaf?: string,
  pid?: string,
  radioChecked?: string,
  radioDisabled?: string
}

// Required 功能和 Partial 相反，是将类型的属性「变成必填」
export type IRequestConfig = Required<IRequestOptions>

type IRightMenuName = "copy" | "paste" | "paste_before" | "paste_after" | "cut_paste" | "edit" | "remove" | "add_child" | "add_before" | "add_after"

export type IRightMenuOptions = {
  name: string
  value: string
}

export type IEditEventType = 'edit' | 'add_child' | 'add_before' | 'add_after'

export type IEventType = 'edit' | 'add_child' | 'add_before' | 'add_after' | "checkbox" | "radio" | "click" | "copy" | "paste" | "paste_before" | "paste_after" | "cut_paste" | "remove" | "drag" |"lazyload"
type IEventData<D extends ITreeData> = {
  type: IEventType, data: D, load: Function, stop: Function
}
type IDragEventData<D extends ITreeData> = {
  type: 'drag', data: D, load: Function, stop: Function, endData: D, range: 'outer' | 'inner'
}
export type IListenFunction<D extends ITreeData> = (this: Event, evtData: IEventData<D>) => void
export type IDragListenFunction<D extends ITreeData> = (this: Event, evtData: IDragEventData<D>) => void

type ICustomText<D extends ITreeData> = (data: D) => string;

export type ITreeData = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  isLeaf?: boolean;
  data?: MapLike<any>;
  children?: ITreeData[];
  disabledParentStatus?: 0 | 2
}

export type IEleTreeOptions<D extends ITreeData> = {
  /** dom选择器 */
  el: string,
  data?: D[],
  /** 内容为空的时候展示的文本, 默认为 "暂无数据" */
  emptText?: string,
  /** 是否高亮当前选中节点，默认值是 false */
  highlightCurrent?: boolean,
  /** 是否默认展开所有节点 默认为 false */
  defaultExpandAll?: boolean,
  /** 展开子节点的时候是否自动展开父节点 默认为 false */
  autoExpandParent?: boolean,
  /** 是否在点击文本的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 */
  expandOnClickNode?: boolean,
  /** 复选框是否在点击文本的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。 */
  checkOnClickNode?: boolean,
  /** 单选框是否在点击文本的时候选中节点，默认值为 false，即只有在点击单选框时才会选中节点。 */
  radioOnClickNode?: boolean,
  /** 默认展开的节点的 key 的数组 */
  defaultExpandedKeys?: string[],
  /** 节点是否可被选择 默认为false */
  showCheckbox?: boolean,
  /** 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false   */
  checkStrictly?: boolean,
  /** 在父子关联的情况下，初始数据是否只是子节点影响父节点，即父节点选中，子节点全部没有选中或部分选中，则让父节点也没有选中或者半选，默认false，即父子结点互相影响 */
  isDefaultChangePstatus?: boolean,
  /** 默认勾选的节点的 key 的数组   */
  defaultCheckedKeys?: string[],
  /** 是否每次只打开一个同级树节点展开（手风琴效果） */
  accordion?: boolean,
  /** 相邻级节点间的水平缩进，单位为像素 默认为 16 */
  indent?: number,
  /** 是否显示连线，默认true */
  showLine?: boolean,
  /** 图片所在的文件夹路径 */
  imgUrl?: string,
  /** 自定义图标 */
  icon?: IIconOptions,
  /** 树渲染完成之后的回调 */
  done?: null | Function,
  /** 当不是懒加载时，叶子节点由当前节点是否由子节点判断，如果为懒加载，则叶子节点由当前节点的属性isLeaf: true决定 */
  lazy?: boolean,
  /** 右键菜单 */
  rightMenuList?: Array<IRightMenuName | IRightMenuOptions>,
  /** 是否显示radio 默认为 false */
  showRadio?: boolean,
  /** 单选范围（是同一级还是整体只能选择一个） 默认为 level */
  radioType?: 'level' | 'all',
  /** radio默认选中项 */
  defaultRadioCheckedKeys?: string[],
  /** 第一层pid的初始值 */
  defaultPid?: string | number,
  /** 是否开启拖拽节点功能 默认为 false */
  draggable?: boolean,
  /** 节点文本自定义函数 */
  customText?: null | ICustomText<D>,
  /** 异步获取数据相关 - 异步接口地址 */
  url?: string,
  /** 异步获取数据相关 - 接口http请求类型 */
  method?: 'get' | 'post',
  /** 异步获取数据相关 - 接口的其它参数 */
  where?: MapLike<any>,
  /** 异步获取数据相关 - 接口的请求头 */
  headers?: MapLike<string>,
  /** 异步获取数据相关 - 对后台返回的数据格式重新定义 */
  response?: MapLike<any>,
  /** 异步获取数据相关 - 对于后台数据重新定义名字 */
  request?: IRequestOptions,
}

// Required 功能和 Partial 相反，是将类型的属性「变成必填」
export type IEleTreeConfig<D extends ITreeData> = Required<IEleTreeOptions<D>> & {request: IRequestConfig}

export type IEmitPayloadOtherOptions<D extends ITreeData> = {
  load(data: D[]): void;
  stop?(): void;
  rightClickData?: D;
}
export type IEmitPayload<D extends ITreeData> = {
  v: D;
  type: string;
  event?: Event;
  otherOpt?: IEmitPayloadOtherOptions<D>
}

export interface IEleTree<D extends ITreeData> {
  node: null | VNode           // 保存当前整个虚拟dom树（为了之后的替换）
  activeElm: null | HTMLElement      // 保存上一次点击的dom节点（高亮显示）
  rightMenuCdata: null | D    // 当前右键时保存当前节点的数据
  rightMenuCdom: null | HTMLElement   // 当前右键时保存当前节点的dom
  rightMenuPasteData: null | D    // 右键复制之后剪贴板中保存的数据
  rightMenuNode: null | VNode | Element      // 右键菜单的虚拟dom（为了之后的替换）
  isShowRightMenu: boolean      // 是否显示右键菜单
  resData: any            // 获取后台数据
  customIndex: number      // 自定义索引，保证不重复
  eventList: any[]        // 事件列表
  config: IEleTreeConfig<D>;
  isAlreadyRadioChecked: boolean
  currentRadioCheckedData: null | D

  on(event: "drag", listener: IDragListenFunction<D>): void;
  on(type: IEventType, listener: IListenFunction<D>): void;
  emit(evtData: IEmitPayload<D>): void;
  getChecked(leafOnly?: boolean, includeHalfChecked?: boolean): D[];
  setChecked(checkArr: string[], isUnCheckAll?: boolean): void;
  /** 取消选中的节点数组；不传参数则默认清空所有选中项； */
  unChecked(unCheckArr?: string | string[]): void;
  setAllChecked(): void;
  reverseChecked(): void;
  getRadioChecked(): void;
  setRadioChecked(checkArr: string[], isUnCheckAll?: boolean): void;
  /** 取消选中的节点数组；不传参数则默认清空所有选中项 */
  unRadioChecked(unCheckArr?: string[]): void;
  expandAll(): void;
  unExpandAll(): void;
  append(id: string | D | D[], nodeData: D | D[]): void;
  updateKeySelf(id: string | D | D[], nodeData: D | D[]): void;
  remove(removeArr: any[]): void;
  edit(id: number | string | D, nodeType: IEditEventType): void;
  insert(id: string, nodeData: D[] | D, type: 'before' | 'after'): void;
  reload(options: Partial<IEleTreeOptions<D>>): void;
  search(value: string, callback: Function): void;
  getAllNodeData(structure: 'c' | 'p'): D[];
  copy(id: string, currData: D): void;
  cutPaste(id: string, currData: D): IEleTree<D>;
  paste(id: string, nodeType: 'before' | 'after' | 'children', currData: D, pasteType?: 'paste' | 'move'): void;
  getClipboardData(): any
}
