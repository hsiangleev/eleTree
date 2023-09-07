### 文本节点自定义

#### 使用说明

1. 初始化参数添加customText函数，返回的参数data为当前节点数据
2. 通过在回调函数中拼接节点，并返回节点
3. 添加的节点事件可以在节点的click回调事件中捕获，click事件的this代表当前点击的事件event
4. 给每个节点添加一个class，并在事件中使用`this.target.classList.contains('class')`，判断当前点击的是否为某个节点，然后可以在对应的事件中执行某些操作，如增删改查等

#### 注意
1. 拼接的节点中，文本不能被其他dom包裹，如`<span>data.label</span>`，否则点击文本无法展开合并节点

#### 示例

::: demo
```html
<div class="eletree15"></div>

<script>
var index = 0;
var el = eleTree({
    el: '.eletree15',
    url: '/eleTree/json/1.json?v=2.0.12',
    highlightCurrent: true,
    showCheckbox: true,
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
    customText: function(data) {
        var s = data.label
        if(data.id.toString().indexOf("2")!==-1){
            s+=`<i class="eletree_icon-add addchild_test"></i>
            <i class="eletree_icon-edit edit_test"></i>
            <i class="eletree_icon-delete delete_test"></i>`
        }
        return s
    }
})
el.on('click', function(data) {
    if(this.target.classList.contains('addchild_test')){
        el.append(data.data.id, {
            id: ++index,
            label: 'aaa' + index,
        })
        // 编辑完成触发add_child事件
        el.edit(index, 'add_child')
    }else if(this.target.classList.contains('edit_test')){
        // 编辑完成触发edit事件
        el.edit(data.data.id, 'edit')
    }else if(this.target.classList.contains('delete_test')){
        el.remove(data.data.id)
    }
}).on('add_child', function(data) {
    console.log(this)
    console.log(data)
    setTimeout(() => {
        data.load()
        // data.stop()
    }, 500);
}).on('edit', function(data) {
    console.log(this)
    console.log(data)
    setTimeout(() => {
        data.load()
        // data.stop()
    }, 500);
})
</script>
```
:::
