
import { h } from 'snabbdom'
export default function(options) {
    let node = null

    if(!options.icon.loading){
        node = h('span.eleTree-loading.eleTree-animate-rotate.eleTree-loading-code')
    }else if(/\.(jpg|png|gif)$/.test(options.icon.loading)){
        node = h(`span.eleTree-loading.eleTree-animate-rotate`, {style: {'background-image': `url("${options.imgUrl + options.icon.loading}")`, 'background-size': 'contain'}})
    }else if(/^(\.)/.test(options.icon.loading)){
        node = h(`span.eleTree-loading${options.icon.loading}`)
    }

    return node
}