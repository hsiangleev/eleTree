import reloadVnode from '~/vnode/reloadVnode'
import { paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 插入节点
 * @param {*传入搜索的文本值，不传或传空则显示所有节点} value 
 */
export default function(methods, value) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf } = options.request
    if(value === null || value === undefined) value = ''
    if(paramDetection(value, 'String|Number', 'search方法第一个参数必须为String|Number')) return methods

    let f = (data)=>{
        for(let i=0,len=data.length;i<len;i++){
            // 节点不包含搜索信息
            if(!String(data[i][name]).includes(String(value))){
                data[i][symbolAttr.isHideNode] = true
            }else if(value === ''){
                // 搜索条件为空显示所有，但不向父层递归（因为所有节点都满足条件）
                data[i][symbolAttr.isHideNode] = false
            }else{
                // 搜索到节点，显示节点的同时显示父层节点
                data[i][symbolAttr.isHideNode] = false
                changePData(data[i][symbolAttr.parentNode])
            }
            if(data[i][children].length > 0){
                f(data[i][children])
            }
        }
    }
    // 修改父节点信息
    let changePData = (pData)=>{
        if(!pData) return
        pData[symbolAttr.isHideNode] = false
        changePData(pData[symbolAttr.parentNode])
    }

    f(options.data)

    reloadVnode.call(this)
    return methods
}