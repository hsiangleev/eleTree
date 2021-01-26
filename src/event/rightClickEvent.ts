import { symbolAttr } from '../config'
import remove from '../methods/remove'
import append from '../methods/append'
import insert from '../methods/insert'
import edit from '../methods/edit'
import reloadVnode from '../vnode/reloadVnode'
import { updateData } from '../opera/tools'
import { copy, cutPaste, paste, emitEvent } from '../methods/copy'
import { IEleTree, IRightMenuOptions, ITreeData } from '../interface'
import { EleTree } from '../eleTree'

export default function <D extends ITreeData>(thisTree: EleTree<D>, v: IRightMenuOptions, event: MouseEvent) {
  let options = thisTree.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  let cData = thisTree.rightMenuCdata as D

  // 节点增加与编辑
  const editNode = (el: Element) => {
    thisTree.reloadVnode()
    if (!thisTree.rightMenuCdom) return
    let text_edit = el.querySelector('.eleTree-text_edit') as HTMLInputElement
    if (!text_edit) return
    text_edit.focus()
    text_edit.select()
  }
  // 默认的方法
  const defaultListEvent = {
    copy: () => thisTree.copy('', cData),
    paste: () => thisTree.paste('', 'children', cData),
    paste_before: () => thisTree.paste('', 'before', cData),
    paste_after: () => thisTree.paste('', 'after', cData),
    cut_paste: () => thisTree.cutPaste('', cData),
    edit: () => thisTree.edit(cData, 'edit'),
    remove() {
      emitEvent(thisTree, cData, 'remove', () => {
        thisTree.remove([cData[key]])
        thisTree.reloadVnode()
      })
    },
    add_child() {
      thisTree.append(cData[key], [
        {
          [name]: '未命名',
          [key]: ++thisTree.customIndex
        } as unknown as D
      ])
      thisTree.edit(thisTree.customIndex, 'add_child')
    },
    add_before() {
      thisTree.insert(cData[key], [
        {
          [name]: '未命名',
          [key]: ++thisTree.customIndex
        } as unknown as D
      ], 'before')
      thisTree.edit(thisTree.customIndex, 'add_before')
    },
    add_after() {
      thisTree.insert(cData[key], [
        {
          [name]: '未命名',
          [key]: ++thisTree.customIndex
        } as unknown as D
      ], 'after')
      thisTree.edit(thisTree.customIndex, 'add_after')
    },
  }
  // 自定义方法对应的事件监听名为：custom_
  const customEvent = () => {
    let eventName = `custom_${v.value}`
    emitEvent(thisTree, cData, eventName, () => {
      updateData(thisTree, cData)
      thisTree.reloadVnode()
    })
  }

  defaultListEvent[v.value] ? defaultListEvent[v.value]() : customEvent()
}
