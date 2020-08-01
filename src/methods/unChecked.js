import { recurseTree, paramDetection, updateDate, isArray } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
import { symbolAttr } from '~/config'
/**
 * 清空选中项(如果不传参数或传空数组，则清空所有选中项)
 * @param {*清空部分选中项，传入需要清空的选中项} unCheckArr 
 */
export default function(methods, unCheckArr = []) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request


    if(paramDetection(unCheckArr, 'String|Number|Array', 'unChecked方法第一个参数必须为String|Number|Array')) return methods
    unCheckArr = !isArray(unCheckArr) ? [unCheckArr] : unCheckArr
    let isUnCheckAll = unCheckArr.length === 0

    let f = (data) => {
        for(let i=0;i<data.length;i++){
            if(data[i][children]) f(data[i][children])
            if(!data[i][disabled]) data[i][checked] = 0
        }
    }

    recurseTree.call(this, (data)=>{
        if(!data[disabled]){
            if(isUnCheckAll) {
                data[checked] = 0
            }else if(unCheckArr.includes(data[key])){
                data[checked] = 0
                // 如果父子关联
                if(!options.checkStrictly){
                    // 且父节点选中，则取消父节点选中
                    let pData = data[symbolAttr.parentNode]
                    if(pData && pData[checked] === 2){
                        pData[checked] = 0
                    }
                    // 取消父节点的选中时，会同时取消所有子孙节点的选中
                    if(data[children] && data[children].length > 0){
                        f(data[children])
                    }
                }

            }
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}