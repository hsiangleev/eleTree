### pid结构的数据格式

#### 说明

1. 从2.1.15版本开始支持pid格式的数据
2. 可以使用children和pid两种格式增加和修改数据
3. 获取所有的数据支持返回pid格式的数据
4. 数据源与方法的数据结构可以混用，即数据源为父子结构的数据但可以使用pid结构的数据增加和修改数据


#### 默认的方式

::: demo
```html
<select class="sel">
	<option value="" selected>请选择</option>
	<option value="append">pid格式添加子节点</option>
	<option value="updateKeySelf_1">pid格式修改节点</option>
	<option value="updateKeySelf_2">pid移动节点</option>
	<option value="updateKeySelf_3">移动到根节点</option>
	<option value="getAllNodeData_1">获取pid格式的数据</option>
	<option value="getAllNodeData_2">获取children格式的数据</option>
</select>
<div class="eletree6"></div>

<script>
var el = eleTree({
    el: '.eletree6',
    url: '/eleTree/json/pid.json?v=2.1.15',
    highlightCurrent: true,
    showCheckbox: true,
})
var methods = {
    append: function() {
        el.append([
            {label: '添加子节1', id: 'a', pid: "001002002002"},
            {label: '添加子节点2', id: 'b', pid: "001002002003"},
            {label: '添加子节点3', id: 'ab', pid: "a"},
            {label: '添加子节点4', id: 'ac', pid: "a", checked: true},
        ])
    },
    updateKeySelf_1: function() {
        el.updateKeySelf([
            {label: '桃源路11', id: '001002002002', pid: "001002001"},
            {label: '湖东路11', id: '001002002003', pid: "001002001"},
        ])
    },
    updateKeySelf_2: function() {
        el.updateKeySelf([
            {label: '桃源路11', id: '001002002002', pid: "001002003"},
            {label: '湖东路11', id: '001002002003', pid: "001002003"},
        ])
    },
    updateKeySelf_3: function() {
        el.updateKeySelf([
            {label: '桃源路11', id: '001002002002', pid: ""},
            {label: '湖东路11', id: '001002002003', pid: ""},
        ])
    },
    getAllNodeData_1: function() {
        alert(JSON.stringify(el.getAllNodeData('p')))
    },
    getAllNodeData_2: function() {
        alert(JSON.stringify(el.getAllNodeData()))
    },
}
document.querySelector(".sel").onchange = function() {
    this.value && methods[this.value] && methods[this.value]()
}
</script>
```
:::
