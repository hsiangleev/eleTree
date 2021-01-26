
import { h } from 'snabbdom/h'
import { toVNode } from 'snabbdom/tovnode'
import { symbolAttr } from '../config'
import { EleTree } from '../eleTree'
import textEditBlur from '../event/textEditBlur'
import { ITreeData } from '../interface'
import getCurrentNodeData from '../opera/getCurrentNodeData'
export default function <D extends ITreeData>(this: EleTree<D>, v: D) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request
  let node = null
  if (options.customText) {
    let customStr = options.customText(getCurrentNodeData(this, v)).trim()
    let customArr = customStr.split(/\%\<[\w|\W]+\>\%/)
    let customEl = document.createElement('span')
    customEl.innerHTML = customStr.replace(/\%\<[\w|\W]+\>\%/, "")
  }
  let fn = () => {
    if (!options.customText) return v[name]
    let customStr = options.customText(getCurrentNodeData(this, v)).trim()
    let customEl = document.createElement('span')
    customEl.innerHTML = customStr
    let nodeArr = []
    for (let i = 0; i < customEl.childNodes.length; i++) {
      nodeArr.push(toVNode(customEl.childNodes[i]))
    }
    return nodeArr
  }
  node = v[symbolAttr.editNodeType]
    ? h('input.eleTree-text_edit', {
      props: { type: 'text', value: v[name] },
      on: {
        blur: [textEditBlur, this, v] as any,
      }
    })
    : h('span.eleTree-text', {
      style: v[symbolAttr.isPasteNode] ? { color: '#aaa' } : {}
    }, fn())

  // console.log(node)
  return node
}
