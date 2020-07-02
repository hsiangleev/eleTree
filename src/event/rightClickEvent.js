
import { emit } from '~/event/customEvent'
import { symbolAttr } from '~/config'
import remove from '~/methods/remove'
import append from '~/methods/append'
import insert from '~/methods/insert'
import reloadVnode from '~/vnode/reloadVnode'
import { showLoding, removeLoding } from '~/vnode/loadingVnode'
import { updateDate } from '~/opera/tools'

export default function(thisTree, v, event) {
    let options = thisTree.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let cData = thisTree.rightMenuCdata

    // 粘贴初始化
    const pasteInit = ()=>{
        let pasteData = thisTree.rightMenuPasteData
        if(!pasteData) return
        // 深层copy，并且修改id，防止与原始的节点冲突
        let f = (data)=>{
            let obj = Array.isArray(data) ? [] : {}
            Object.keys(data).forEach(v=>{
                obj[v] = typeof data[v] === 'object' 
                    ? f(data[v]) 
                    : v===key ? thisTree.customIndex++ : data[v] 
            })
            return obj
        }
        // 判断是否为剪贴的节点
        if(pasteData[symbolAttr.isPasteNode]){
            remove.call(thisTree, null, [pasteData[key]])
        }
        return f(pasteData)
    }
    // 粘贴到前还是后
    const pasteType = (type)=>{
        let newData = pasteInit()
        if(!newData) return
        let pData = cData[symbolAttr.parentNode]
        // 根节点判断
        if(pData){
            let index = pData[children].findIndex(v=>v[key]===cData[key])
            index = type === 'before' ? index : index + 1
            pData[children].splice(index, 0, newData)
        }else{
            let index = options.data.findIndex(v=>v[key]===cData[key])
            index = type === 'before' ? index : index + 1
            options.data.splice(index, 0, newData)
        }
        updateDate.call(thisTree)
        reloadVnode.call(thisTree)
    }
    // 节点增加与编辑
    const editNode = (el)=>{
        reloadVnode.call(thisTree)
        if(!thisTree.rightMenuCdom) return
        let text_edit = el.querySelector('.eleTree-text_edit')
        if(!text_edit) return
        text_edit.focus()
        text_edit.select()
    }
    const emitEvent = (eventName, successCallback)=>{
        // 判断是否有edit回调函数
        if(!thisTree.eventList[eventName]){
            successCallback()
            return
        }
        showLoding.call(thisTree)
        emit.call(thisTree, {v: cData, type: eventName, event, otherOpt: {
            load() {
                removeLoding.call(thisTree)
                successCallback()
            },
            stop() {
                removeLoding.call(thisTree)
            }
        }})
    }
    // 默认的方法
    const defaultListEvent = {
        copy() {
            emitEvent('copy', ()=>{
                // 先取消上次的节点剪贴
                if(thisTree.rightMenuPasteData) thisTree.rightMenuPasteData[symbolAttr.isPasteNode] = false
                // 数据放入剪贴板
                thisTree.rightMenuPasteData = cData
            })
        },
        paste() {
            emitEvent('paste', ()=>{
                let newData = pasteInit()
                if(!newData) return
                cData[children].push(newData)
                updateDate.call(thisTree)
                reloadVnode.call(thisTree)
            })
        },
        paste_before() {
            emitEvent('paste_before', ()=>{
                pasteType('before')
            })
        },
        paste_after() {
            emitEvent('paste_after', ()=>{
                pasteType('after')
            })
        },
        cut_paste() {
            emitEvent('paste_after', ()=>{
                if(thisTree.rightMenuPasteData) thisTree.rightMenuPasteData[symbolAttr.isPasteNode] = false
                cData[symbolAttr.isPasteNode] = true
                // 数据放入剪贴板
                thisTree.rightMenuPasteData = cData
                reloadVnode.call(thisTree)
            })
        },
        edit() {
            cData[symbolAttr.editNodeType] = 'edit'
            editNode(thisTree.rightMenuCdom)
        },
        remove() {
            emitEvent('remove', ()=>{
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
        emitEvent(eventName, ()=>{
            updateDate.call(thisTree, cData)
            reloadVnode.call(thisTree)
        })
    }

    defaultListEvent[v.value] ? defaultListEvent[v.value]() : customEvent()
}
