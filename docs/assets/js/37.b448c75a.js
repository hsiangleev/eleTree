(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{536:function(e,t,a){"use strict";a.r(t);var r=a(64),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h3",{attrs:{id:"规则说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#规则说明"}},[e._v("#")]),e._v(" 规则说明")]),e._v(" "),a("h4",{attrs:{id:"checkbox-父子节点关联"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#checkbox-父子节点关联"}},[e._v("#")]),e._v(" checkbox（父子节点关联）")]),e._v(" "),a("ol",[a("li",[e._v("禁用的节点的选中不会影响父节点的选中，也不会影响子节点的选中，")]),e._v(" "),a("li",[e._v("如果二级节点被禁用且选中，则三级节点的选中不会影响二级节点，但是会影响未禁用的一级节点")]),e._v(" "),a("li",[e._v("禁用的节点不能通过setChecked方法选中，也不能通过unChecked取消选中，可以通过updateKeySelf更改节点状态（radio同理）")]),e._v(" "),a("li",[e._v("通过defaultCheckedKeys选中的数据只在第一次初始化的时候有效，之后再次reload重新传入该参数也会失效，即节点的选中状态只在初始的时候受其他因素（通过调用参数选中）影响，之后只以该节点的选中为基准（radio和isOpen同理）\n")])]),e._v(" "),a("h4",{attrs:{id:"radio"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#radio"}},[e._v("#")]),e._v(" radio")]),e._v(" "),a("ol",[a("li",[e._v("radio如果同级有多个选中项，则只选中最先出现的选中项")]),e._v(" "),a("li",[e._v("如果radioType为all，且有多个选中项，则按深度优先遍历选中最先出现的选中项")]),e._v(" "),a("li",[e._v("禁用的选中项无法直接取消，但是可以通过选中同级的其他节点取消")])])])}),[],!1,null,null,null);t.default=s.exports}}]);