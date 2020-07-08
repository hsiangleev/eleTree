### 自定义图标或图片

**icon默认有7个属性，即**
* dropdownOff：   下拉合并
* dropdownOn：    下拉展开
* checkFull：     checkbox全选
* checkHalf：     checkbox半选
* checkNone：     checkbox未选中
* fold：          折叠
* leaf：          叶子节点
* loading:        正在加载
* radioCheck：    radio选中
* radioCheckNone：radio未选中

#### 说明

1. 当属性值为空的时候为默认的方式，即通过dom节点生成的下拉和checkbox，且没有树形图标
2. 当属性值以(.png|.jpg|.gif)结尾，则表示为使用图片的方式，属性名为图片名
3. 属性值如果以 . 开头，则表示为字体的class，这种为字体的使用方式，属性值为字体的class，如果由多个class组合，class之间不加空格，如.fa.fa-address-book
4. 可以使用imgUrl参数修改图片图片默认的文件夹地址
5. 如果需要使用系统默认字体，则需要引入css文件夹下的icon.css


#### 默认的方式

::: demo
```html
<div class="eletree"></div>

<script>
eleTree({
    el: '.eletree',
    url: '/eleTree/json/1.json?v=2.0.12',
    highlightCurrent: true,
    showCheckbox: true,
    showRadio: true,
})
</script>
```
:::

#### 使用图片的方式

::: demo
```html
<div class="eletree2"></div>

<script>
eleTree({
    el: '.eletree2',
    url: '/eleTree/json/1.json?v=2.0.12',
    highlightCurrent: true,
    showCheckbox: true,
    showRadio: true,
    icon: {
        dropdownOff: "dropdownOff.png",
        dropdownOn: "dropdownOn.png",
        checkFull: "checkFull.png",
        checkHalf: "checkHalf.png",
        checkNone: "checkNone.png",
        fold: "fold.png",
        leaf: "leaf.png",
        radioCheck: "radioCheck.png",
        radioCheckNone: "radioCheckNone.png",
    },
})
</script>
```
:::

#### 使用字体的方式

::: demo
```html
<div class="eletree3"></div>

<script>
eleTree({
    el: '.eletree3',
    url: '/eleTree/json/1.json?v=2.0.12',
    highlightCurrent: true,
    showCheckbox: true,
    showRadio: true,
    icon: {
        fold: ".eletree_icon-file_fold",
        leaf: ".eletree_icon-file_leaf",
        checkFull: ".eletree_icon-check_full",
        checkHalf: ".eletree_icon-check_half",
        checkNone: ".eletree_icon-check_none",
        dropdownOff: ".eletree_icon-dropdown_right",
        dropdownOn: ".eletree_icon-dropdown_bottom",
        loading: ".eleTree-animate-rotate.eletree_icon-loading1",
        radioCheck: ".eletree_icon-radio_checked",
        radioCheckNone: ".eletree_icon-radio_checked_none",
    },
})
</script>
```
:::
