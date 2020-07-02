### 懒加载

#### 说明

1. 添加属性lazy: true，则代表当前为懒加载
2. 只有当返回的数据明确为叶子节点，当前节点才会为叶子节点
3. 使用事件ele.on('lazyload',function(){})把数据传入
4. 事件回调函数返回的参数为type:当前事件名，data:当前节点的数据，load:为此load函数传入一个数组节点表示新获取到的数据
5. 可以更换loading的样式，支持字体与图片的方式


#### 示例

::: demo
```html
<div class="eletree"></div>

<script>
var el = eleTree({
    el: '.eletree',
    showCheckbox: true,
    highlightCurrent: true,
    lazy: true,
    icon: {
        loading: ".eleTree-animate-rotate.eletree_icon-loading1",
    },
    data: [
        {
            "label": "安徽省",
            "id": "01",
        },
        {
            "label": "河南省",
            "id": "02",
            "isLeaf": true
        },
        {
            "label": "江苏省",
            "id": "03",
            "isLeaf": true
        }
    ],
})
el.on('lazyload', function(d) {
    var data = d.data;
    var load = d.load;
    var loadData = [];
    switch (data.id) {
        case "01":
            loadData = [
                {
                    "label": "合肥市",
                    "id": "0101",
                    "isLeaf": true
                },
                {
                    "label": "马鞍山市",
                    "id": "0102",
                },
            ]
            break;
        case "0102":
            loadData = [
                {
                    "label": "花山区",
                    "id": "010201",
                    "isLeaf": true
                },
                {
                    "label": "雨山区",
                    "id": "010202",
                },
            ]
            break;

        default:
            break;
    }
    setTimeout(function() {
        load(loadData)
    }, 500)
})
</script>
```
:::
