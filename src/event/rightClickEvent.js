import { symbolAttr } from '~/config'
import remove from '~/methods/remove'
import append from '~/methods/append'
import insert from '~/methods/insert'
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
        edit() {
            cData[symbolAttr.editNodeType] = 'edit'
            editNode(thisTree.rightMenuCdom)
        },
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
                    [key]: thisTree.customIndex++
                }
            ])
            let index = cData[children].findIndex(item=>item[key] === thisTree.customIndex - 1)
            cData[children][index][symbolAttr.editNodeType] = 'add_child'
            editNode(thisTree.rightMenuCdom.parentNode)
        },
        add_before() {
            insert.call(thisTree, null, cData[key], [
                {
                    [name]: '未命名',
                    [key]: thisTree.customIndex++
                }
            ], 'before')
            if(cData[symbolAttr.parentNode]){
                let index = cData[symbolAttr.parentNode][children].findIndex(item=>item[key] === thisTree.customIndex - 1)
                cData[symbolAttr.parentNode][children][index][symbolAttr.editNodeType] = 'add_before'
            }else{
                let index = options.data.findIndex(item=>item[key] === thisTree.customIndex - 1)
                options.data[index][symbolAttr.editNodeType] = 'add_before'
            }
            editNode(thisTree.rightMenuCdom.parentNode.previousElementSibling)
        },
        add_after() {
            insert.call(thisTree, null, cData[key], [
                {
                    [name]: '未命名',
                    [key]: thisTree.customIndex++
                }
            ], 'after')
            if(cData[symbolAttr.parentNode]){
                let index = cData[symbolAttr.parentNode][children].findIndex(item=>item[key] === thisTree.customIndex - 1)
                cData[symbolAttr.parentNode][children][index][symbolAttr.editNodeType] = 'add_after'
            }else{
                let index = options.data.findIndex(item=>item[key] === thisTree.customIndex - 1)
                options.data[index][symbolAttr.editNodeType] = 'add_after'
            }
            editNode(thisTree.rightMenuCdom.parentNode.nextElementSibling)
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
