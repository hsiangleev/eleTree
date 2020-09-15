import { symbolAttr } from '~/config'
import remove from '~/methods/remove'
import append from '~/methods/append'
import insert from '~/methods/insert'
import edit from '~/methods/edit'
import reloadVnode from '~/vnode/reloadVnode'
import { updateDate } from '~/opera/tools'
import { copy, cutPaste, paste, emitEvent } from '~/methods/copy'

export default function(thisTree, v, event) {
    let options = thisTree.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let cData = thisTree.rightMenuCdata

    // 节点增加与编辑
    const editNode = (el)=>{
        reloadVnode.call(thisTree)
        if(!thisTree.rightMenuCdom) return
        let text_edit = el.querySelector('.eleTree-text_edit')
        if(!text_edit) return
        text_edit.focus()
        text_edit.select()
    }
    // 默认的方法
    const defaultListEvent = {
        copy: () => copy.call(thisTree, null, '', cData),
        paste: () => paste.call(thisTree, null, '', 'children', cData),
        paste_before: () => paste.call(thisTree, null, '', 'before', cData),
        paste_after: () => paste.call(thisTree, null, '', 'after', cData),
        cut_paste: () => cutPaste.call(thisTree, null, '', cData),
        edit: () => edit.call(thisTree, null, cData, 'edit'),
        remove() {
            emitEvent.call(thisTree, cData, 'remove', ()=>{
                remove.call(thisTree, null, [cData[key]])
                reloadVnode.call(thisTree)
            })
        },
        add_child() {
            append.call(thisTree, null, cData[key], [
                {
                    [name]: '未命名',
                    [key]: ++thisTree.customIndex
                }
            ])
            edit.call(thisTree, null, thisTree.customIndex, 'add_child')
        },
        add_before() {
            insert.call(thisTree, null, cData[key], [
                {
                    [name]: '未命名',
                    [key]: ++thisTree.customIndex
                }
            ], 'before')
            edit.call(thisTree, null, thisTree.customIndex, 'add_before')
        },
        add_after() {
            insert.call(thisTree, null, cData[key], [
                {
                    [name]: '未命名',
                    [key]: ++thisTree.customIndex
                }
            ], 'after')
            edit.call(thisTree, null, thisTree.customIndex, 'add_after')
        },
    }
    // 自定义方法对应的事件监听名为：custom_
    const customEvent = ()=>{
        let eventName = `custom_${v.value}`
        emitEvent.call(thisTree, cData, eventName, ()=>{
            updateDate.call(thisTree, cData)
            reloadVnode.call(thisTree)
        })
    }

    defaultListEvent[v.value] ? defaultListEvent[v.value]() : customEvent()
}
