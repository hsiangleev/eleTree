import { recurseTree, paramDetection } from '~/opera/tools'
import { renderData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
/**
 * 清空选中项(如果不传参数，则清空所有选中项)
 * @param {*清空部分选中项，传入需要清空的选中项(如果父子节点都是选中的，则如果要取消子节点，需要先取消父节点，即父节点必须包含在数组中)} unCheckArr 
 * @param {*是否清空所有选中项,默认true} isUnCheckAll 
 */
export default function(options, unCheckArr = [], isUnCheckAll = true) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request

    if(paramDetection(unCheckArr, 'Array', 'unChecked方法第一个参数必须为Array')) return this
    if(paramDetection(isUnCheckAll, 'Boolean', 'unChecked方法第二个参数必须为Boolean')) return this

    recurseTree(options, (data)=>{
        if(!data[disabled]){
            if(isUnCheckAll) {
                data[checked] = 0
            }else if(unCheckArr.includes(data[key])){
                data[checked] = 0
            }
        }
    })
    renderData(options)
    reloadVnode(options)
    return this
}