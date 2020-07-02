
import { h, init } from 'snabbdom'
var patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);
export function showLoding() {
    let options = this.config
    let node = null
    if(!options.icon.loading){
        node = h('span.eleTree-loading.eleTree-animate-rotate.eleTree-loading-code')
    }else if(/\.(jpg|png|gif)$/.test(options.icon.loading)){
        node = h(`span.eleTree-loading.eleTree-animate-rotate`, {style: {'background-image': `url("${options.imgUrl + options.icon.loading}")`, 'background-size': 'contain'}})
    }else if(/^(\.)/.test(options.icon.loading)){
        node = h(`span.eleTree-loading${options.icon.loading}`)
    }

    let el = document.createElement('div')
    document.querySelector(options.el).appendChild(el)
    patch(el, h('div.eleTree-loading-content', [node]))
}
export function removeLoding() {
    let options = this.config
    let loadingEl = document.querySelector(options.el + ">.eleTree-loading-content")
    loadingEl && loadingEl.parentNode.removeChild(loadingEl)
}