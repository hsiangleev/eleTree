import getCurrentNodeData from '~/opera/getCurrentNodeData'
import { paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'
/**
 * 
 * @param {*是否只是叶子节点,默认值为 false} leafOnly 
 * @param {*是否包含半选节点,默认值为 false} includeHalfChecked 
 * @param {*是否包含隐藏节点,默认值为 true,搜索时部分节点隐藏} includeHideChecked 
 */
export default function(methods, leafOnly = false, includeHalfChecked = false, includeHideChecked = true) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf} = options.request
    let results = []

    if(paramDetection(leafOnly, 'Boolean', 'getChecked方法第一个参数必须为Boolean')) return results
    if(paramDetection(includeHalfChecked, 'Boolean', 'getChecked方法第二个参数必须为Boolean')) return results
    if(paramDetection(includeHideChecked, 'Boolean', 'getChecked方法第三个参数必须为Boolean')) return results

    let f=data=>{
        for(let i=0;i<data.length;i++){
            // 当状态为status，代表选中
            let fn = (status)=>{
                if(data[i][checked] === status && (includeHideChecked || !includeHideChecked && !data[i][symbolAttr.isHideNode])){
                    results.push(getCurrentNodeData.call(this, data[i]))
                }
            }
            // 是否只是叶子节点
            if(leafOnly){
                if(data[i][children].length === 0) fn(2)
            }else{
                fn(2)
                // 是否包含半选
                if(includeHalfChecked) fn(1)
            }
            if(data[i][children].length>0) f(data[i][children])
        }
    }
    f(options.data)
    return results
}