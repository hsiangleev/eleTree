import changeParent from '~/opera/changeParent'
import { symbolAttr } from '~/config'
// 根据所给数据重新整合一份dom节点符合的数据
export function renderData(options, isFirstRender = false) {
    let pData = null
    changeData(options, options.data, pData, isFirstRender, false)
}
/**
 * 
 * @param {*} options 
 * @param {* 需要修改的原始数据数组} data
 * @param {* 父节点数据} pData
 * @param {* 是否是初始渲染} isFirstRender（初始渲染选中状态和下拉状态由多种条件组成，之后的状态只由当前节点状态决定）
 * @param {* 修改父节点是否继续向上层递归（默认只改一层）} isRecall
 */
export function changeData(options, data, pData, isFirstRender = false, isRecall = false) {
    let {isOpen, checked, children, disabled, isLeaf} = options.request
    data.forEach((v, i)=>{
        let f = (attr)=>{
            return typeof attr === 'boolean'
                ? attr 
                : (typeof attr === 'number' ? attr === 2 : false)
        }
        // 判断是否初次渲染
        let vOpen = isFirstRender 
            ? (f(v[isOpen]) || options.defaultExpandAll || options.defaultExpandedKeys.includes(v.id) || (options.autoExpandParent && f(pData[isOpen])))
            : f(v[isOpen])
        let vCheck = isFirstRender
            ? (options.defaultCheckedKeys.includes(v.id) || f(v[checked]))
            : f(v[checked])
                
        v[isOpen] = vOpen ? 2 : 0
        v[checked] = vCheck ? 2 : 0
        v[children] = v[children] || []
        v[disabled] = v[disabled] || false
        v[isLeaf] = options.lazy ? (v[isLeaf] || false) : v[children].length === 0

        v[symbolAttr.isRenderChild] = v[isOpen] === 2 || v[symbolAttr.isRenderChild] || false      // 是否已经渲染子节点
        v[symbolAttr.parentNode] = pData     // 当前节点保存父节点信息
        v[symbolAttr.isHideNode] = false     // 节点是否隐藏
        if(options.lazy){
            v[symbolAttr.isLazyNode] = v[symbolAttr.isLazyNode] || false        // 是否已经懒加载过子节点
        }
        let pStatus = null
        if(!options.checkStrictly){
            // 如果父节点禁用,则使用备用状态,否则使用父节点状态
            pStatus = pData ? (pData[disabled] ? pData[symbolAttr.disabledParentStatus] === 2 : pData[checked] === 2) : false
            // 如果节点禁用,则选中状态不受父子节点影响,也不影响父子节点
            if(v[disabled]){
                // 在当前节点记录父节点的选中状态(备用状态)，只有禁用的节点才有这个属性
                v[symbolAttr.disabledParentStatus] = pStatus ? 2 : 0
            }else{
                // 节点选中状态有父节点决定
                v[checked] = (v[checked] === 2 || pStatus) ? 2 :0
            }
        }
        // 递归
        if(v[options.request['children']]) {
            changeData(options, v[children], v, isFirstRender, isRecall)
        }
        // 需要修改父节点的条件（父子关联，子节点已经走到最后一个）
        if(!options.checkStrictly && (i === data.length - 1)) {
            changeParent(options, v, isRecall)
        }
    })
}