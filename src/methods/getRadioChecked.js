import getCurrentNodeData from '~/opera/getCurrentNodeData'
import { paramDetection } from '~/opera/tools'
import { symbolAttr } from '~/config'
export default function(methods) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf, radioChecked} = options.request

    if(options.radioType === 'all' && this.currentRadioCheckedData){
        return [getCurrentNodeData.call(this, this.currentRadioCheckedData)]
    }

    if(options.radioType === 'level'){
        let results = []
        let f=data=>{
            for(let i=0;i<data.length;i++){
                if(data[i][radioChecked] === 2){
                    results.push(getCurrentNodeData.call(this, data[i]))
                }
                if(data[i][children].length>0) f(data[i][children])
            }
        }
        f(options.data)
        return results
    }
    
    return []
}