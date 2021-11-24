import reloadVnode from '~/vnode/reloadVnode'
import { getNodeDataById, isString, isNumber } from '~/opera/tools'
/**
 * 排序
 * @param {*查找节点id} id 
 * @param {*排序字段} field 
 * @param {*排序方式  asc: 升序、desc: 降序，不支持还原} type 
 * @param {*深度} depth 
 */
 export default function(methods, opts) {
    let options = this.config
    sort.call(this, opts)
    reloadVnode.call(this)
    return methods
}
export function sort(opts) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, pid} = options.request
    let { id, field, type, depth } = opts
    let cData = null
    if(isString(id) || isNumber(id)) {
        cData = getNodeDataById.call(this, id)
        if(!cData) return methods      // 没找到
        cData = cData[children]
    }else{
        cData = options.data
    }

    let f = (d, cDepth)=>{
        cDepth++
        for(let i=0,len=d.length;i<len;i++){
            if(d[i][children] && d[i][children].length > 0 && (depth && cDepth < depth || !depth)){
                f(d[i][children], cDepth)
            }
        }
        type === "asc" 
            ? d.sort((a, b) => typeof a[field] === "number" ? a[field]-b[field] : a[field].localeCompare(b[field]))
            : type === "desc"
                ? d.sort((a, b) => typeof a[field] === "number" ? b[field]-a[field] : b[field].localeCompare(a[field]))
                : ""
    }
    f(cData, 0)
}