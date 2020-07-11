import getCurrentNodeData from '~/opera/getCurrentNodeData'

export default function(methods) {
    let options = this.config
    let {key, isOpen, checked, children, disabled, isLeaf} = options.request

    let result = []
    let f = (data, res)=>{
        for(let i=0,len=data.length;i<len;i++){
            res.push(getCurrentNodeData.call(this, data[i]))
            if(data[i][children].length > 0){
                res[i][children] = []
                f(data[i][children], res[i][children])
            }
        }
    }
    f(options.data, result)

    return result
}