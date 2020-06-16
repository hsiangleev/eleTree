import { h } from 'snabbdom'
import { isArray } from '~/opera/tools'
export default function(options, v) {
    let isFold = v.children && isArray(v.children) && v.children.length > 0
    let node = null
    let fn = async(type)=>{
        if(!options.icon[type]){
            node = null
        }else if(/^(img)/.test(options.icon[type])){
            let imgType = /(\.\w+)$/.exec(options.icon[type])
            imgType = imgType ? imgType[0] : '.png'
            node = h('span.eleTree-icon', {style: {'background-image': `url("./images/${type + imgType}")`, 'background-size': 'contain'}})
        }else if(/^(\.)/.test(options.icon[type])){
            node = h(`span.eleTree-icon${options.icon[type]}`)
        }
    }
    // 当前节点是否是非叶子节点
    isFold ? fn('fold') : fn('leaf')
    return node
}