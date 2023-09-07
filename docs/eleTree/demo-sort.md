### 树节点排序

#### 页面初始排序

1. 配置项添加sort: true，则开启初始节点排序
2. 设置排序参数initSort：
    * id: 对某一个节点排序, 不传则对最外层节点
    * field: 按某个字段排序，如果是数字则按大小排序，如果是字符串，则按字母排序
    * type: 升序还是降序，asc:升序, desc:降序 
    * depth: 排序节点深度，不传则为最深层，支持数字，1/2/3
3. 对于懒加载，如果开启排序，并且不传深度，则执行排序，如果传深度，需要手动执行sort方法

#### 直接调用排序方法

```javascript
el.sort({
    id: "001002",
    field: "label", 
    type: "asc", 
    depth: 2
})
```

#### 示例

::: demo
```html
<div>
    <label for="asc">升序</label><input id="asc" type="radio" name="sort" value="asc" checked />
    <label for="desc">降序</label><input id="desc" type="radio" name="sort" value="desc" />
</div>
<div class="eletree13"></div>

<script>
var el1 = eleTree({
    el: '.eletree13',
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
        {name: "子节点升序", value: "asc"},
        {name: "子节点降序", value: "desc"},
    ],
    sort: true,
    initSort: {
        field: "label",
        type: "asc",
    }
});
[].slice.call(document.querySelectorAll("input[name='sort']")).forEach(function(item) {
    item.onclick = function() {
        el1.sort({
            field: "label", 
            type: this.value, 
        })
    }
})
el1.on("custom_asc", function(data) {
    el1.sort({
        id: data.data.id,
        field: "label", 
        type: "asc", 
        depth: 1,
    })
    data.load()
}).on("custom_desc", function(data) {
    el1.sort({
        id: data.data.id,
        field: "label", 
        type: "desc", 
        depth: 1,
    })
    data.load()
})

</script>
```
:::


#### 懒加载排序示例(传depth属性)

::: demo
```html
<div class="eletree14"></div>

<script>
var el2 = eleTree({
    el: '.eletree14',
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
    lazy: true,
    data: [
        {"label": "安徽省","id": "01",},
        {"label": "河南省","id": "02","isLeaf": true},
        {"label": "江苏省","id": "03","isLeaf": true}
    ],
    sort: true,
    initSort: {
        field: "label",
        type: "desc",
        depth: 3
    }
});
el2.on('lazyload', function(d) {
    var data = d.data;
    var load = d.load;
    var loadData = [];
    switch (data.id) {
        case "01":
            loadData = [
                {"label": "合肥市","id": "0101","isLeaf": true},
                {"label": "马鞍山市","id": "0102",},
            ]
            break;
        case "0102":
            loadData = [
                {"label": "花山区","id": "010201","isLeaf": true},
                {"label": "雨山区","id": "010202",},
            ]
            break;
        default:
            break;
    }
    setTimeout(function() {
        load(loadData)
        el2.sort({
            id: data.id,
            field: "label",
            type: "desc",
            depth: 1
        })
    }, 500)
})

</script>
```
:::
