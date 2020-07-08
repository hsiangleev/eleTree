### 树节点搜索

#### 说明

1. 使用搜索功能只需要调用search方法就可以直接搜索
2. search方法的第一个参数为搜索字符串，第二个参数为回调函数（可以用来自定义搜索条件），函数有两个参数，value和data，value为搜索字符串，data为每个节点的数据
3. 只有当callback函数返回的值为true时，才显示该节点

#### 示例

::: demo
```html
<input type="text" class="search">
<button class="btn">搜索</button>
<div class="eletree"></div>

<script>
var el1 = eleTree({
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
document.querySelector(".btn").onclick = function() {
    el1.search(document.querySelector(".search").value, function(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    })
}
</script>
```
:::
