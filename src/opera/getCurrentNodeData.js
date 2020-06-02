import getNodeIndex from './getNodeIndex'
export default function(options, v) {
    return new Promise(resolve=>{
        getNodeIndex(options, v).then(arr=>{
            let d = options.data[arr[0]]
            for(let i = 1;i<arr.length;i++){
                d=d[options.request['children']][arr[i]]
            }
            let data = {}
            Object.keys(d).forEach(attr=>{
                if(attr !== options.request['children']){
                    data[attr] = d[attr]
                }
            })
            if(options.showCheckbox) data[options.request['checked']] = v.checkedStatus === 2
            data[options.request['isOpen']] = v.isOpen || false
            data[options.request['disabled']] = v.disabled || false
            data[options.request['isLeaf']] = v[options.request['children']].length === 0
            resolve(data)
        })
    })
}