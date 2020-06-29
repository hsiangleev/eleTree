import { recurseTree, paramDetection } from '~/opera/tools'
import { renderData } from '~/opera/renderData'
import reloadVnode from '~/vnode/reloadVnode'
/**
 * 在原来的选中项基础上增加选中项
 * @param {*需要设置的选中项} checkArr 
 * @param {*是否先清空原有的选中项，默认true} isUnCheckAll 
 */
export default function(options, checkArr = [], isUnCheckAll = true) {
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request

    if(paramDetection(checkArr, 'Array', 'setChecked方法第一个参数必须为Array')) return this
    if(paramDetection(isUnCheckAll, 'Boolean', 'setChecked方法第二个参数必须为Boolean')) return this

    recurseTree(options, (data)=>{
        if(!data[disabled]){
            if(isUnCheckAll) {
                data[checked] = 0
            }
            if(checkArr.includes(data[key])){
                data[checked] = 2
            }
        }
    })
    renderData(options)
    reloadVnode(options)
    return this
}