
import reloadVnode from '../vnode/reloadVnode'
import changeParent from '../opera/changeParent'
import changeChildren from '../opera/changeChildren'
import radioChange from '../opera/radioChange'
import { emit } from './customEvent'
import { paramDetection } from '../opera/tools'
import { symbolAttr } from '../config'
import { VNode } from 'snabbdom/vnode.d'

import append from '../methods/append'
import { IEleTree, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

export default function <D extends ITreeData>(this: VNode, thisTree: EleTree<D>, v: D, event: MouseEvent) {
  let options = thisTree.config
  let { name, key, isOpen, checked, children, disabled, isLeaf, radioChecked, radioDisabled } = options.request
  let classList = (event.target as HTMLElement).classList
  let isTargetCheckbox = classList.contains('eleTree-checkbox')
  let isTargetRadio = classList.contains('eleTree-radio')
  let isTargetDropdown = classList.contains('eleTree-dropdown')
  let isTargetIcon = classList.contains('eleTree-icon')
  let isTargetText = classList.contains('eleTree-text')
  let isClickCheckbox = !v[disabled] && (isTargetCheckbox || isTargetText && options.checkOnClickNode)
  let isClickRadio = !v[radioDisabled] && (isTargetRadio || isTargetText && options.radioOnClickNode)
  if (isClickCheckbox || isClickRadio) {
    if (isClickCheckbox) {
      // 点击checkbox选择，点击文字判断是否选择
      v[checked] = v[checked] === 2 ? 0 : 2
      // 判断是否父子不关联
      if (options.checkStrictly) {
        thisTree.reloadVnode()
        thisTree.emit({ v, type: 'checkbox', event })
      } else {
        changeParent(thisTree, v, true)
        changeChildren(thisTree, v)
        thisTree.reloadVnode()
        thisTree.emit({ v, type: 'checkbox', event })
      }
    }
    if (isClickRadio) {
      radioChange(thisTree, v)
      thisTree.reloadVnode()
      thisTree.emit({ v, type: 'radio', event })
    }
  } else if (isTargetDropdown || options.expandOnClickNode && (isTargetText || isTargetIcon)) {
    // 点击图标展开，点击文字判断是否展开
    if (v[isOpen] === 2) {
      v[isOpen] = 0
    } else if (v[isOpen] === 0) {
      v[isOpen] = 2
      v[symbolAttr.isRenderChild] = true
    } else if (v[isOpen] === 1) {
      return
    }
    // 手风琴效果
    if (options.accordion) {
      // 修改数据
      let arr = v[symbolAttr.parentNode] as D[]
      arr = !arr ? options.data : arr[children]
      arr.forEach(item => { if (item[isOpen] === 2 && item[key] !== v[key]) item[isOpen] = 0 })
    }
    // 懒加载事件
    if (options.lazy && !v[isLeaf]) {
      // 是否已经懒加载过
      if (!v[symbolAttr.isLazyNode]) {
        // 保存懒加载之前的打开状态
        let oldIsOpen = v[isOpen]
        v[isOpen] = 1
        thisTree.emit({
          v, type: 'lazyload', event, otherOpt: {
            load: (childNodeData: D[]) => {
              if (paramDetection(childNodeData, 'Array', 'load懒加载方法参数必须为Array')) return null
              if (childNodeData.length > 0) {
                // 修改父节点的选中状态，即如果父节点是选中的，子节点没有全部选中，则让父节点半选
                if (options.showCheckbox && !options.checkStrictly && options.isDefaultChangePstatus) {
                  v[checked] = childNodeData.filter(v => !v[disabled]).every(v => v[checked])
                }
                thisTree.append(v[key], childNodeData)
                return
              }
              // 初始有数据
              if (v[children].length > 0) {
                v[isOpen] = oldIsOpen
                thisTree.reloadVnode()
                return
              }
              // 初始无数据，也没有传入数据（叶子节点）
              v[isLeaf] = true
              thisTree.reloadVnode()
            }
          }
        })
      }
      v[symbolAttr.isLazyNode] = true
    }
    thisTree.reloadVnode()
    thisTree.emit({ v, type: 'click', event })
  } else {
    thisTree.emit({ v, type: 'click', event })
  }
  // 高亮显示
  if (options.highlightCurrent) {
    thisTree.activeElm && thisTree.activeElm.classList.remove('eleTree-title-active');
    (this.elm as HTMLElement).classList.add('eleTree-title-active');
    thisTree.activeElm = this.elm as HTMLElement
  }
}
