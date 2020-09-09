### 节点拖拽

#### 说明

1. 添加属性 draggable: true 则开启拖拽功能
2. 拖拽默认放到节点的子节点，可以拖拽到最外层，即移动到根节点
3. 拖拽与复制共用剪贴板，即拖拽之后可以通过getClipboardData方法获取拖拽之前的数据
4. 如果需要异步操作，可以使用拖拽事件，事件返回值包含参数如下：
    * data: 要拖拽的节点数据
    * endData: 拖拽到某个节点的数据
    * range: 拖拽位置，outer:根节点，inner:子节点
    * type: 事件名称，drag
    * load: 执行拖拽函数
    * stop: 停止拖拽函数


#### 示例

::: demo
```html
<div class="eletree9"></div>

<script>
var el = eleTree({
    el: '.eletree9',
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
        radioCheck: "radioCheck.png",
        radioCheckNone: "radioCheckNone.png",
    },
    draggable: true,
    rightMenuList: ["copy", "paste", "paste_before", "paste_after", "cut_paste"],
})
el.on('drag', function(data) {
    console.log(data)
    setTimeout(() => {
        data.load()
        // data.stop()
    }, 100);
})
</script>
<style>
.eletree { 
    padding: 15px 0;
}
</style>
```
:::
