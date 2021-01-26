
import { h, init } from 'snabbdom'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { ITreeData } from '../interface'
import { EleTree } from '../eleTree'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

export function showLoding<D extends ITreeData>(this: EleTree<D>) {
  let options = this.config
  let node = null
  if (!options.icon.loading) {
    node = h('span.eleTree-loading.eleTree-animate-rotate.eleTree-loading-code')
  } else if (/\.(jpg|png|gif)$/.test(options.icon.loading)) {
    node = h(`span.eleTree-loading.eleTree-animate-rotate`, { style: { 'background-image': `url("${options.imgUrl + options.icon.loading}")`, 'background-size': 'contain' } })
  } else if (/^(\.)/.test(options.icon.loading)) {
    node = h(`span.eleTree-loading${options.icon.loading}`)
  }

  let el = document.createElement('div')
  document.querySelector(options.el)!.appendChild(el)
  patch(el, h('div.eleTree-loading-content', [node]))
}
export function removeLoding<D extends ITreeData>(this: EleTree<D>) {
  let options = this.config
  let loadingEl = document.querySelector(options.el + ">.eleTree-loading-content")
  loadingEl && loadingEl.parentNode!.removeChild(loadingEl)
}
