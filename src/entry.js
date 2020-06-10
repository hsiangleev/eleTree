import eleTree from './index'

if (typeof define === 'function' && define.amd) {
    define(eleTree)
} else if (typeof exports === 'object') {
    module.exports = eleTree
} else if (window.layui && layui.define) {
	layui.define(function(exports) {
		exports(eleTree, eleTree)
	})
} else {
    window.eleTree = eleTree
}

export default eleTree