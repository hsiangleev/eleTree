import { recurseTree, paramDetection, updateDate } from '~/opera/tools'
import reloadVnode from '~/vnode/reloadVnode'
/**
 * 清空选中项(如果不传参数或传空数组，则清空所有选中项)
 * @param {*清空部分选中项，传入需要清空的选中项(如果父子节点都是选中的，则如果要取消子节点，需要先取消父节点，即父节点必须包含在数组中)} unCheckArr 
 */
export default function(methods, unCheckArr = []) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request


    if(paramDetection(unCheckArr, 'Array', 'unChecked方法第一个参数必须为Array')) return methods
    let isUnCheckAll = unCheckArr.length === 0

    recurseTree.call(this, (data)=>{
        if(!data[disabled]){
            if(isUnCheckAll) {
                data[checked] = 0
            }else if(unCheckArr.includes(data[key])){
                data[checked] = 0
            }
        }
    })
    updateDate.call(this)
    reloadVnode.call(this)
    return methods
}