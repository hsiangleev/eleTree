import eleTree, { EleTree } from './eleTree'

declare let window: Window & { layui: any, eleTree: typeof eleTree }

if (window.layui && window.layui.define) {
  window.layui.define(function (exports: any) {
    exports('eleTree', eleTree)
  })
} else if (typeof window !== 'undefined') {
  window.eleTree = eleTree
}

export default eleTree
