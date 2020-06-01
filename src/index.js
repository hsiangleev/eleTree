import vnode from './vnode'
import renderData from './opera/renderData'
import './index.scss'
import { init, h } from 'snabbdom'
var patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/eventlisteners').default,
]);

const eleTree = {
    render(opt) {
        opt.vnodeData = []
        renderData(opt)
        let el = document.createElement('div')
        document.querySelector(opt.el).appendChild(el)
        patch(el, vnode(opt));
    }
}

export default eleTree