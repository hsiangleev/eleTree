### 大数据量渲染

#### 说明

1. 数据量过大时，不要初始展开所有节点，或执行展开所有节点操作
2. 每一层的节点最好不要超过千条
3. 原理：只渲染当前展开的节点，内层节点只在展开的时候才会渲染


#### 16万条数据展示示例

::: demo
```html
<div class="eletree"></div>

<script>
/**
 * 生成数据
 * @param {*有多少个子层} maxFloor 
 * @param {*每一层有多少条数据} everyFloorMuch 
 */
var f=function(maxFloor, everyFloorMuch, d, obj) {
    d = d || []
    obj = obj || {floor: 0, index: 0}
    obj.floor++
    for(var i=0;i<everyFloorMuch;i++){
        obj.index++
        var o={
            "label": "节点"+obj.index,
            "id": obj.index,
            "children": [],
            "checked": true,
            "radioChecked": true
        }
        d[i] ? d[i].children.push(o) : d.push(o)
        if(obj.floor<maxFloor){
            f(maxFloor, everyFloorMuch, d[i].children, obj)
        }
    }
    obj.floor--
    return d
}
var el = eleTree({
    el: '.eletree',
    showCheckbox: true,
    highlightCurrent: true,
    showRadio: true,
    data: f(4, 20)
})
</script>
```
:::
