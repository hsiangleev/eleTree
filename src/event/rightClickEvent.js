
import { emit } from '~/event/customEvent'
import { symbolAttr } from '~/config'
import { renderData } from '~/opera/renderData'
import remove from '~/methods/remove'
import append from '~/methods/append'
import insert from '~/methods/insert'
import reloadVnode from '~/vnode/reloadVnode'
import { showLoding, removeLoding } from '~/vnode/loadingVnode'

export default function(options, v, event) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    let cData = options[symbolAttr.rightMenuCdata]

    // 粘贴初始化
    const pasteInit = ()=>{
        let pasteData = options[symbolAttr.rightMenuPasteData]
        if(!pasteData) return
        // 深层copy，并且修改id，防止与原始的节点冲突
        let f = (data)=>{
            let obj = Array.isArray(data) ? [] : {}
            Object.keys(data).forEach(v=>{
                obj[v] = typeof data[v] === 'object' 
                    ? f(data[v]) 
                    : v===key ? options[symbolAttr.customIndex]++ : data[v] 
            })
            return obj
        }
        // 判断是否为剪贴的节点
        if(pasteData[symbolAttr.isPasteNode]){
            remove(options, [pasteData[key]])
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
        renderData(options)
        reloadVnode(options)
    }
    // 节点增加与编辑
    const editNode = (el)=>{
        reloadVnode(options)
        if(!options[symbolAttr.rightMenuCdom]) return
        let text_edit = el.querySelector('.eleTree-text_edit')
        if(!text_edit) return
        text_edit.focus()
        text_edit.select()
    }
    
    const defaultListEvent = {
        copy() {
            // 先取消上次的节点剪贴
            if(options[symbolAttr.rightMenuPasteData]) options[symbolAttr.rightMenuPasteData][symbolAttr.isPasteNode] = false
            // 数据放入剪贴板
            options[symbolAttr.rightMenuPasteData] = cData
        },
        paste() {
            let newData = pasteInit()
            if(!newData) return
            cData[children].push(newData)
            renderData(options)
            reloadVnode(options)
        },
        paste_before() {
            pasteType('before')
        },
        paste_after() {
            pasteType('after')
        },
        cut_paste() {
            if(options[symbolAttr.rightMenuPasteData]) options[symbolAttr.rightMenuPasteData][symbolAttr.isPasteNode] = false
            cData[symbolAttr.isPasteNode] = true
            // 数据放入剪贴板
            options[symbolAttr.rightMenuPasteData] = cData
            reloadVnode(options)
        },
        edit() {
            cData[symbolAttr.editNodeType] = 'edit'
            editNode(options[symbolAttr.rightMenuCdom])
        },
        remove() {
            // 判断是否有edit回调函数
            if(!options[symbolAttr.eventList].remove){
                remove(options, [cData[key]])
                reloadVnode(options)
                return
            }
            showLoding(options)
            emit({options, v: cData, type: 'remove', event, otherOpt: {
                load() {
                    removeLoding(options)
                    remove(options, [cData[key]])
                    reloadVnode(options)
                },
                stop() {
                    removeLoding(options)
                }
            }})
        },
        add_child() {
            append(options, cData[key], [
                {
                    [name]: '未命名',
                    [key]: options[symbolAttr.customIndex]++
                }
            ])
            let index = cData[children].findIndex(item=>item[key] === options[symbolAttr.customIndex] - 1)
            cData[children][index][symbolAttr.editNodeType] = 'add_child'
            editNode(options[symbolAttr.rightMenuCdom].parentNode)
        },
        add_before() {
            insert(options, cData[key], [
                {
                    [name]: '未命名',
                    [key]: options[symbolAttr.customIndex]++
                }
            ], 'before')
            if(cData[symbolAttr.parentNode]){
                let index = cData[symbolAttr.parentNode][children].findIndex(item=>item[key] === options[symbolAttr.customIndex] - 1)
                cData[symbolAttr.parentNode][children][index][symbolAttr.editNodeType] = 'add_before'
            }else{
                let index = options.data.findIndex(item=>item[key] === options[symbolAttr.customIndex] - 1)
                options.data[index][symbolAttr.editNodeType] = 'add_before'
            }
            editNode(options[symbolAttr.rightMenuCdom].parentNode.previousElementSibling)
        },
        add_after() {
            insert(options, cData[key], [
                {
                    [name]: '未命名',
                    [key]: options[symbolAttr.customIndex]++
                }
            ], 'after')
            if(cData[symbolAttr.parentNode]){
                let index = cData[symbolAttr.parentNode][children].findIndex(item=>item[key] === options[symbolAttr.customIndex] - 1)
                cData[symbolAttr.parentNode][children][index][symbolAttr.editNodeType] = 'add_after'
            }else{
                let index = options.data.findIndex(item=>item[key] === options[symbolAttr.customIndex] - 1)
                options.data[index][symbolAttr.editNodeType] = 'add_after'
            }
            editNode(options[symbolAttr.rightMenuCdom].parentNode.nextElementSibling)
        },
    }
    const customEvent = ()=>{
        if(!options[symbolAttr.eventList][v.value]){
            reloadVnode(options)
            return
        }
        showLoding(options)
        emit({options, v: cData, type: v.value, event, otherOpt: {
            load() {
                removeLoding(options)
                reloadVnode(options)
            },
            stop() {
                removeLoding(options)
            }
        }})
    }

    defaultListEvent[v.value] ? defaultListEvent[v.value]() : customEvent()
}
