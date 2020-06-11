import eleTree from './index'

if (window.layui && layui.define) {
	layui.define(function(exports) {
		exports('eleTree', eleTree)
	})
}else if (typeof window !== 'undefined') {
    window.eleTree = eleTree
}

export default eleTree