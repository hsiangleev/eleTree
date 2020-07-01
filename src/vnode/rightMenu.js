import { h, init } from 'snabbdom'
var patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);
import { symbolAttr } from '~/config'
import rightClickEvent from '~/event/rightClickEvent'

export default function(options, left, top) {
    let menu = options.rightMenuList
    const defaultList = [
        {name: '复制', value: 'copy'},
        {name: '粘贴', value: 'paste'},
        {name: '粘贴到前', value: 'paste_before'},
        {name: '粘贴到后', value: 'paste_after'},
        {name: '剪贴', value: 'cut_paste'},
        {name: '编辑', value: 'edit'},
        {name: '删除', value: 'remove'},
        {name: '添加到子', value: 'add_child'},
        {name: '添加到前', value: 'add_before'},
        {name: '添加到后', value: 'add_after'},
    ]
    const menuList = menu.map(v=>{
        let obj = {}
        if(typeof v === 'string'){
            let l = defaultList.filter(item=>item.value===v)[0]
            if(l) {
                obj = l
            }else{
                obj.name = v
                obj.value = v
            }
        }else{
            obj = v
        }
        return obj
    })
    let oldNode = options[symbolAttr.rightMenuNode]
    if(!oldNode){
        oldNode = document.createElement('div')
        document.querySelector(options.el).appendChild(oldNode)
    }
    options[symbolAttr.rightMenuNode] = h('ul.eleTree-menu', {
        style: {
            display: options[symbolAttr.isShowRightMenu] ? 'block' : 'none',
            left: left + 'px',
            top: top + 'px',
        }
    }, menuList.map(v=>{
        return h('li', {
            style: v.value === 'paste' && !options[symbolAttr.rightMenuPasteData] ? {color: '#ccc'} : {},
            on: {
                click: [rightClickEvent, options, v]
            }
        }, v.name)
    }))
    patch(oldNode, options[symbolAttr.rightMenuNode])
}