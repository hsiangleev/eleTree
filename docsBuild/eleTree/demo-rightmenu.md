### 右键菜单

**右键菜单rightMenuList默认有10个可选项，即**
* copy：            复制节点
* paste：           粘贴到子节点
* paste_before：    粘贴到节点之前
* paste_after：     粘贴到节点之后
* cut_paste：       剪贴节点
* edit：            编辑节点
* remove：          删除节点
* add_child：       添加子节点
* add_before：      添加到节点前
* add_after：       添加到节点后

#### 说明

1. 右键菜单默认不开启，即空数组
2. 支持菜单自定义
3. 每一项可以传入字符串或对象，对象的属性name为右键时显示的信息，value为事件名，如果传入字符串则name和value都为该字符串
4. 默认的可选项对应的事件名为该字符串，自定义的项事件名为“custom_”加上“value值”，例如“custom_test”
5. 事件的回调函数返回值包括data：当前节点数据，type：当前触发事件的事件名，load：执行此项操作，stop：取消此项操作
6. 如果不写事件回调，则默认自动执行此操作，否则需要在事件回调手动调用load函数才会执行此项操作
7. edit/add_child/add_before/add_after的load函数可以传入节点的属性来自定义修改节点，如checked/disabled等

#### 默认可选项示例

::: demo
```html
<div class="eletree"></div>

<script>
var el1 = eleTree({
    el: '.eletree',
    url: '/eleTree/json/1.json',
    highlightCurrent: true,
    showCheckbox: true,
    expandOnClickNode: true,
    checkOnClickNode: false,
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
    rightMenuList: ["copy", "paste", "paste_before", "paste_after", "cut_paste", "edit", "remove", "add_child", "add_before", "add_after"],
})
// 如果不写下面的事件，则默认自动执行此操作
el1.on("copy", function(data) {
    setTimeout(data.load, 100)
}).on("paste", function(data) {
    setTimeout(data.load, 100)
}).on("paste_before", function(data) {
    setTimeout(data.load, 100)
}).on("paste_after", function(data) {
    setTimeout(data.load, 100)
}).on("cut_paste", function(data) {
    setTimeout(data.load, 100)
}).on("edit", function(data) {
    setTimeout(function() {
        data.load({
            checked: true
        })
    }, 100)
}).on("remove", function(data) {
    setTimeout(data.load, 100)
}).on("add_child", function(data) {
    setTimeout(data.load, 100)
}).on("add_before", function(data) {
    setTimeout(data.load, 100)
}).on("add_after", function(data) {
    setTimeout(data.load, 100)
})
</script>
```
:::

#### 自定义菜单示例

::: demo
```html
<div class="eletree2"></div>

<script>
var el2 = eleTree({
    el: '.eletree2',
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
    rightMenuList: [
        {name: "选中此项", value: "checked"},
        {name: "取消此项选中", value: "unchecked"},
        {name: "重载树", value: "reload"},
    ],
})
// 如果不写下面的事件，则默认自动执行此操作
el2.on("custom_checked", function(data) {
    setTimeout(()=>{
        el2.setChecked([data.data.id], false)
        data.load()
    }, 100)
}).on("custom_unchecked", function(data) {
    setTimeout(()=>{
        el2.unChecked([data.data.id])
        data.load()
    }, 100)
}).on("custom_reload", function(data) {
    setTimeout(()=>{
        el2.reload({
            defaultExpandAll: true,
            defaultCheckedKeys: ['003001']
        })
        data.load()
    }, 100)
})
</script>
```
:::
