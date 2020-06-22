import { getDataByIndexArr } from '~/opera/tools'
// 获取当前节点对应的原始数据
// arr当前节点的索引数组
export default function(options, v, arr) {
    let d = getDataByIndexArr({ options, indexArr: arr, dataType: 'origin', nodeType: 'current' })
    let data = {}
    // 返回的数据不包括一下属性值
    let removeAttrArr = [options.request['children'], 'isRenderChild', 'isLazyNode']
    Object.keys(d).forEach(attr=>{
        if(!removeAttrArr.includes(attr)){
            data[attr] = d[attr]
        }
    })
    if(options.showCheckbox) data[options.request['checked']] = v.checkedStatus === 2
    data[options.request['isOpen']] = v.isOpen === 2 ? true : false
    data[options.request['disabled']] = v.disabled || false
    data[options.request['isLeaf']] = v[options.request['children']].length === 0

    return data
}