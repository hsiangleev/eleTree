
import { h } from 'snabbdom'
import { toVNode } from 'snabbdom/tovnode'
import { symbolAttr } from '~/config'
import textEditBlur from '~/event/textEditBlur'
import getCurrentNodeData from '~/opera/getCurrentNodeData'
export default function(v) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let node =null
    if(options.customText){
        let customStr = options.customText(getCurrentNodeData.call(this, v)).trim()
        let customArr = customStr.split(/\%\<[\w|\W]+\>\%/)
        let customEl = document.createElement('span')
        customEl.innerHTML = customStr.replace(/\%\<[\w|\W]+\>\%/, "")
    }
    let fn = () => {
        if(!options.customText) return v[name]
        let customStr = options.customText(getCurrentNodeData.call(this, v)).trim()
        let customEl = document.createElement('span')
        customEl.innerHTML = customStr
        let nodeArr = []
        for(let i = 0;i<customEl.childNodes.length;i++){
            let n = toVNode(customEl.childNodes[i])
            nodeArr.push(normalizeVNode(n))
        }
        return nodeArr
    }
    node = v[symbolAttr.editNodeType] 
        ? h('input.eleTree-text_edit',{
                props: { type: 'text', value: v[name] },
                on: {
                    blur: [textEditBlur, this, v],
                    keypress: [textEditBlur, this, v],
                }
            })
        : h('span.eleTree-text',{
            style: v[symbolAttr.isPasteNode] ? {color: '#aaa'} : {}
        }, fn())
    
    // console.log(node)
    return node
}

const PROP_KEYS = new Set(['src', 'value', 'checked', 'selected', 'disabled', 'readonly', 'multiple', 'title'])
/** 递归修改嵌套的节点中的class和img的路径问题 */
const normalizeVNode = (vnode) => {
    if (!vnode || !vnode.data) return vnode
    const d = vnode.data
    // --- 处理 attrs ---
    if (d.attrs) {
        const attrs = d.attrs
        for (const [key, val] of Object.entries(attrs)) {
            if (key === 'class') {
                // class: 'a b c' -> class: { a:true, b:true, c:true }
                d.class = {}
                val.split(/\s+/).forEach(c => {
                    if (c) d.class[c] = true
                })
                delete attrs.class
            } else if (key === 'style' && typeof val === 'string') {
                // style: 'color:red; font-size:14px' -> style: { color:'red', fontSize:'14px' }
                d.style = {}
                val.split(';').forEach(pair => {
                    const [k, v] = pair.split(':').map(s => s.trim())
                    if (k && v) {
                        const camel = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
                        d.style[camel] = v
                    }
                })
                delete attrs.style

            } else if (PROP_KEYS.has(key)) {
                // 移动到 props
                d.props = d.props || {}
                d.props[key] = val
                delete attrs[key]
            }
        }
        // 如果 attrs 空了可以删掉（可选）
        if (Object.keys(attrs).length === 0) {
            delete d.attrs
        }
    }

    // --- 递归 children ---
    if (vnode.children && vnode.children.length) {
        vnode.children.forEach(normalizeVNode)
    }
    return vnode
}