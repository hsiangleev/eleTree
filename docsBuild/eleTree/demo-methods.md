### 方法示例

#### 说明

1. 使用初始化之后的返回值来调用方法，即`var el=eleTree({...});el.getChecked(...);`
2. 除了以get开头的方法，如getChecked/getRadioChecked/getAllNodeData/getClipboardData，其它所有方法均可链式调用，即el.on(...).setChecked(...).setRadioChecked(...)等

#### 示例

::: demo
```html
<select class="sel">
	<option value="" selected>请选择</option>
	<option value="getChecked">checkbox获取所有选中项</option>
	<option value="setChecked">checkbox选中桃源路</option>
	<option value="setChecked_2">checkbox先清空其他选中项，再选中桃源路</option>
	<option value="unChecked">checkbox只取消湖东路的选中</option>
	<option value="unChecked_2">checkbox取消所有节点选中</option>
	<option value="setAllChecked">checkbox选中所有节点</option>
	<option value="reverseChecked">checkbox反选所有节点</option>
	<option value="getRadioChecked">radio获取所有选中项</option>
	<option value="setRadioChecked">radio选中桃源路</option>
	<option value="setRadioChecked_2">radio先清空其他选中项，再选中桃源路</option>
	<option value="unRadioChecked">radio只取消湖东路的选中</option>
	<option value="unRadioChecked_2">radio取消所有节点选中</option>
	<option value="expandAll">展开所有项</option>
	<option value="unExpandAll">合并所有项</option>
	<option value="append">安徽省添加子节点</option>
	<option value="append_2">最外层添加节点</option>
	<option value="updateKeySelf">更新淮北市节点</option>
	<option value="remove">删除湖东路</option>
	<option value="insert">在合肥市前面添加节点</option>
	<option value="insert_2">在合肥市后面添加节点</option>
	<option value="reload">重新渲染树节点</option>
	<option value="search">搜索带有“路”字的节点</option>
	<option value="getAllNodeData">获取所有节点数据</option>
	<option value="copy">复制和县，并粘贴到江苏省</option>
	<option value="cutPaste">剪贴和县，并粘贴到江苏省</option>
	<option value="getClipboardData">获取剪贴板数据</option>
</select>
<div class="eletree"></div>

<script>
var index = 0;
var el = eleTree({
    el: '.eletree',
    url: '/eleTree/json/1.json?v=2.0.12',
    highlightCurrent: true,
    showCheckbox: true,
    showRadio: true,
    imgUrl: "/eleTree/images/",
    icon: {
        fold: "fold.png",
        leaf: "leaf.png",
        checkFull: ".eletree_icon-check_full",
        checkHalf: ".eletree_icon-check_half",
        checkNone: ".eletree_icon-check_none",
        dropdownOff: ".eletree_icon-dropdown_right",
        dropdownOn: ".eletree_icon-dropdown_bottom",
        loading: ".eleTree-animate-rotate.eletree_icon-loading1",
    },
})
var methods = {
    getChecked: function() {
        alert(JSON.stringify(el.getChecked()))
    },
    setChecked: function() {
        el.setChecked(["001002002002"], false)
    },
    setChecked_2: function() {
        el.setChecked(["001002002002"])
    },
    unChecked: function() {
        el.unChecked(["001002002003"])
    },
    unChecked_2: function() {
        el.unChecked()
    },
    setAllChecked: function() {
        el.setAllChecked()
    },
    reverseChecked: function() {
        el.reverseChecked()
    },
    getRadioChecked: function() {
        alert(JSON.stringify(el.getRadioChecked()))
    },
    setRadioChecked: function() {
        el.setRadioChecked(["001002002002"], false)
    },
    setRadioChecked_2: function() {
        el.setRadioChecked(["001002002002"])
    },
    unRadioChecked: function() {
        el.unRadioChecked(["001002002003"])
    },
    unRadioChecked_2: function() {
        el.unRadioChecked()
    },
    expandAll: function() {
        el.expandAll()
    },
    unExpandAll: function() {
        el.unExpandAll()
    },
    append: function() {
        el.append("001",[
            {
                label: "池州市" + index++,
                id: "池州市",
                isOpen: true,
                children: [
                    {
                        label: "贵池区" + index++,
                        id: "贵池区",
                    }
                ]
            }
        ])
    },
    append_2: function() {
        el.append("", [
            {
                label: "浙江省" + index++,
                id: "浙江省",
                isOpen: true,
                children: [
                    {
                        label: "杭州市" + index++,
                        id: "杭州市",
                    }
                ]
            }
        ])
    },
    updateKeySelf: function() {
        el.updateKeySelf("001001",{
            label: "淮北市111",
            disabled: true,
            checked: true
        })
    },
    remove: function() {
        el.remove(["001002002003"])
    },
    insert: function() {
        el.insert("001003", [
            {label: "蚌埠市" + index++, id: "蚌埠市"}
        ])
    },
    insert_2: function() {
        el.insert("001003", [
            {label: "阜阳市" + index++, id: "阜阳市"}
        ], "after")
    },
    reload: function() {
        el.reload()
    },
    search: function() {
        el.search("路", function(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        })
    },
    getAllNodeData: function() {
        alert(JSON.stringify(el.getAllNodeData()))
    },
    copy: function() {
        el.copy("001002003").paste("003")
    },
    cutPaste: function() {
        el.cutPaste("001002003").paste("003")
    },
    getClipboardData: function() {
        alert(JSON.stringify(el.getClipboardData()))
    },
}
document.querySelector(".sel").onchange = function() {
    this.value && methods[this.value] && methods[this.value]()
}
</script>
```
:::
