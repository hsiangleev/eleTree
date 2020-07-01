
import { h } from 'snabbdom'
import { symbolAttr } from '~/config'
import textEditBlur from '~/event/textEditBlur'
export default function(options, v) {
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let node =null
    node = v[symbolAttr.editNodeType] 
        ? h('input.eleTree-text_edit',{
                props: { type: 'text', value: v[name] },
                on: {
                    blur: [textEditBlur, options, v],
                }
            })
        : h('span.eleTree-text',{
            style: v[symbolAttr.isPasteNode] ? {color: '#aaa'} : {}
        },v[name])
    return node
}