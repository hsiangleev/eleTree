import changeParent from '~/opera/changeParent'
import { symbolAttr } from '~/config'
// 根据所给数据重新整合一份dom节点符合的数据
export function renderData(isFirstRender = false) {
    let pData = null
    changeData.call(this, this.config.data, pData, isFirstRender, false)
}
/**
 * 
 * @param {* 需要修改的原始数据数组} data
 * @param {* 父节点数据} pData
 * @param {* 是否是初始渲染} isFirstRender（初始渲染选中状态和下拉状态由多种条件组成，之后的状态只由当前节点状态决定）
 * @param {* 修改父节点是否继续向上层递归（默认只改一层）} isRecall
 */
export function changeData(data, pData, isFirstRender = false, isRecall = false) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf, radioChecked, radioDisabled} = options.request
    let isAlreadyRadioChecked = false
    data.forEach((v, i)=>{
        let f = (attr)=>{
            return typeof attr === 'boolean'
                ? attr 
                : (typeof attr === 'number' ? attr === 2 : false)
        }
        // 判断是否初次渲染
        let vOpen = isFirstRender 
            ? (f(v[isOpen]) || options.defaultExpandAll || options.defaultExpandedKeys.includes(v[key]) || (options.autoExpandParent && f(pData[isOpen])))
            : f(v[isOpen])
        v[isOpen] = vOpen ? 2 : 0
        v[children] = v[children] || []
        v[isLeaf] = options.lazy ? (v[isLeaf] || false) : v[children].length === 0
        
        v[symbolAttr.isRenderChild] = v[isOpen] === 2 || v[symbolAttr.isRenderChild] || false      // 是否已经渲染子节点
        // v[symbolAttr.isRenderChild] = true
        v[symbolAttr.parentNode] = pData     // 当前节点保存父节点信息
        v[symbolAttr.isHideNode] = false     // 节点是否隐藏
        v[symbolAttr.isPasteNode] = false     // 节点是否被剪贴
        v[symbolAttr.editNodeType] = null     // 节点是否正在编辑
        if(options.lazy){
            v[symbolAttr.isLazyNode] = v[symbolAttr.isLazyNode] || false        // 是否已经懒加载过子节点
        }
        // checkbox
        if(options.showCheckbox){
            let vCheck = isFirstRender
                ? (options.defaultCheckedKeys.includes(v[key]) || f(v[checked]))
                : f(v[checked])
            v[checked] = vCheck ? 2 : 0
            v[disabled] = v[disabled] || false

            if(!options.checkStrictly){
                let pStatus = null
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
                // 需要修改父节点的条件（父子关联，子节点已经走到最后一个）
                if(i === data.length - 1) {
                    // 缩小遍历范围
                    // 判断是否需要必须递归修改父节点，父节点是最后一个节点且没选中，子节点有选中（解决二级所有节点未选中时，二级节点的最后一个节点的子节点选中，导致一级节点未选中的bug）
                    let isPdataLast = false
                    if(pData && pData[symbolAttr.parentNode]){
                        let pSiblingsData = pData[symbolAttr.parentNode][children]
                        isPdataLast = pSiblingsData.findIndex(item=>pData[key] === item[key]) === pSiblingsData.length - 1
                    }
                    if(isPdataLast && pData[checked] === 0 && pData[children].some(item=>item[checked] === 2)){
                        changeParent.call(this, v, true)
                    }else{
                        changeParent.call(this, v, isRecall)
                    }
                }
            }
        }
        // radio
        if(options.showRadio){
            let vRadio = isFirstRender 
                ? (options.defaultRadioCheckedKeys.includes(v[key]) || f(v[radioChecked]))
                : f(v[radioChecked])
            v[radioChecked] = vRadio ? 2 : 0
            v[radioDisabled] = v[radioDisabled] || false
            if(v[radioChecked]){
                // 同级如果多个被选中，则只选中第一个
                if(options.radioType === 'level'){
                    v[radioChecked] = !isAlreadyRadioChecked && vRadio ? 2 : 0
                    isAlreadyRadioChecked = true
                }else if(options.radioType === 'all'){
                    v[radioChecked] = !this.isAlreadyRadioChecked && vRadio ? 2 : 0
                    this.isAlreadyRadioChecked = true
                    this.currentRadioCheckedData = v[radioChecked] === 2 ? v : this.currentRadioCheckedData
                }
            }
        }
        // 递归
        if(v[options.request['children']] && v[options.request['children']].length > 0) {
            changeData.call(this, v[children], v, isFirstRender, isRecall)
        }
    })
}