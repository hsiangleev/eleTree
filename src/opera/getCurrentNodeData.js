import { symbolAttr } from '~/config'
// 获取当前节点对应的原始数据
// arr当前节点的索引数组
export default function(options, v) {
    let {name, key, isOpen, checked, children, disabled, isLeaf} = options.request
    let data = {}
    // 返回的数据不包括children
    Object.keys(v).forEach(attr=>{
        if(attr !== children){
            data[attr] = v[attr]
        }
    })
    if(options.showCheckbox) data[checked] = v[checked] === 2
    data[isOpen] = v[isOpen] === 2 ? true : false
    data[disabled] = v[disabled] || false
    data[isLeaf] = options.lazy ? (v[isLeaf] || false) : v[children].length === 0

    return data
}