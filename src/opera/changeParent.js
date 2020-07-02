import { isUndefined } from '~/opera/tools'
import { symbolAttr } from '~/config'
// 根据子节点选中情况修改父节点状态
/**
 * 
 * @param {*} options 
 * @param {*} isRecall 是否向祖父级节点递归（默认只修改一层）
 */
export default function changeParent(cData, isRecall = false) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf} = options.request
    let pData = cData[symbolAttr.parentNode]
    // 递归结束条件
    if(!pData) return
    // 判断如果有节点禁用属性则使用子节点状态，否则使用当前节点状态
    let f=(v)=>{return !isUndefined(v[symbolAttr.disabledParentStatus]) ? v[symbolAttr.disabledParentStatus] : v[checked]}
    // 判断某个节点及其子孙节点是否全部被禁用（返回true则为未被禁用）
    var fn=(v)=>{
        // 函数返回值为了跳出递归，即条件成立返回true，如果递归函数为true返回true，其他情况一律返回false
        if(!v[disabled]) return true
        for(let i=0;i<v[children].length;i++){
            if(fn(v[children][i])) return true
        }
        return false
    }
    // 过滤不包括该状态的子节点（如果某个节点及其子节点都是禁用的，则该节点状态不影响父节点的状态）
    let filterData = pData[children].filter(v=>fn(v))
    let s = filterData.length === 0 
        ? pData[checked]
        : filterData.every(v=>f(v) === 2) 
            ? 2 
            : filterData.some(v=>f(v) === 2 || f(v) === 1) 
                ? 1 : 0
    // 如果父节点禁用，该节点的选中状态不改变，并且增加一个新属性标记其节点状态（因为子节点状态虽然不影响禁用的父节点状态，但是会影响祖父节点的状态）
    if(pData[disabled]){
        pData[symbolAttr.disabledParentStatus] = s
    }else{
        pData[checked] = s
    }
    isRecall && changeParent.call(this, pData, isRecall)
}