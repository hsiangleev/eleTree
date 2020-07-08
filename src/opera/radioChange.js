import { symbolAttr } from '~/config'
export default function(v) {
    let options = this.config
    let {name, key, isOpen, checked, children, disabled, isLeaf, radioChecked} = options.request

    if(options.radioType === 'level'){
        let data = v[symbolAttr.parentNode] ? v[symbolAttr.parentNode][children] : options.data
        // 判断当前是否被选中
        if(v[radioChecked] === 2){
            v[radioChecked] = 0
        }else{
            //查找被选中的同级节点
            let radioCheckedSib = data.filter(item=>item[radioChecked] === 2)[0]
            if(radioCheckedSib) radioCheckedSib[radioChecked] = 0
            v[radioChecked] = 2
        }
    }else if(options.radioType === 'all'){
        v[radioChecked] = v[radioChecked] === 2 ? 0 : 2
        // 上一次和这一次选的不一样
        if(this.currentRadioCheckedData && this.currentRadioCheckedData[key] !== v[key]){
            this.currentRadioCheckedData[radioChecked] = 0
        }
        this.currentRadioCheckedData = v
    }
}