### 自定义图标或图片

**icon默认有7个属性，即**
* dropdownOff：   下拉合并
* dropdownOn：    下拉展开
* checkFull：     全选
* checkHalf：     半选
* checkNone：     未选中
* fold：          折叠
* leaf：          叶子节点

::: tip 说明
1. 当属性值为空的时候为默认的方式，即通过dom节点生成的下拉和checkbox，且没有树形图标
2. 当属性值以(.png|.jpg|.gif)结尾，则表示为使用图片的方式，属性名为图片名
3. 属性值如果以 . 开头，则表示为字体的class，这种为字体的使用方式，属性值为字体的class，如果由多个class组合，class之间不加空格，如.fa.fa-address-book
:::


#### 默认的方式

::: demo
```html
<div class="eletree"></div>

<script>
eleTree.render({
    el: '.eletree',
    showCheckbox: true,
    highlightCurrent: true,
    data: [
        {
            "label": "安徽省",
            "id": "001",
            "isOpen": true,
            "children": [
                {
                    "label": "淮北市",
                    "id": "001001"
                },
                {
                    "label": "马鞍山市",
                    "id": "001002",
                    "isOpen": true,
                    "children": [
                        {
                            "label": "花山区",
                            "id": "001002001",
                            "disabled": true,
                            "isOpen": true,
                            "checked": true,
                            "children": [
                                {
                                    "label": "aaa",
                                    "id": "001002002001"
                                },
                                {
                                    "label": "bbb",
                                    "checked": true,
                                    "id": "001002002002",
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            "label": "河南省",
            "id": "002"
        },
        {
            "label": "江苏省",
            "id": "003",
            "children": [
                {
                    "label": "苏州市",
                    "id": "003001"
                },
                {
                    "label": "南京市",
                    "id": "003002"
                }
            ],
        }
    ],
})
</script>
```
:::

#### 使用图片的方式

::: demo
```html
<div class="eletree2"></div>

<script>
eleTree.render({
    el: '.eletree2',
    showCheckbox: true,
    highlightCurrent: true,
    icon: {
        dropdownOff: "dropdownOff.png",
        dropdownOn: "dropdownOn.png",
        checkFull: "checkFull.png",
        checkHalf: "checkHalf.png",
        checkNone: "checkNone.png",
        fold: "fold.png",
        leaf: "leaf.png",
    },
    data: [
        {
            "label": "安徽省",
            "id": "001",
            "isOpen": true,
            "children": [
                {
                    "label": "淮北市",
                    "id": "001001"
                },
                {
                    "label": "马鞍山市",
                    "id": "001002",
                    "isOpen": true,
                    "children": [
                        {
                            "label": "花山区",
                            "id": "001002001",
                            "disabled": true,
                            "isOpen": true,
                            "children": [
                                {
                                    "label": "aaa",
                                    "id": "001002002001"
                                },
                                {
                                    "label": "bbb",
                                    "checked": true,
                                    "id": "001002002002",
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            "label": "河南省",
            "id": "002"
        },
        {
            "label": "江苏省",
            "id": "003",
            "children": [
                {
                    "label": "苏州市",
                    "id": "003001"
                },
                {
                    "label": "南京市",
                    "id": "003002"
                }
            ],
        }
    ],
})
</script>
```
:::

#### 使用字体的方式

::: demo
```html
<div class="eletree3"></div>

<script>
eleTree.render({
    el: '.eletree3',
    showCheckbox: true,
    highlightCurrent: true,
    icon: {
        fold: ".eletree_icon-file_fold",
        leaf: ".eletree_icon-file_leaf",
        checkFull: ".eletree_icon-check_full",
        checkHalf: ".eletree_icon-check_half",
        checkNone: ".eletree_icon-check_none",
        dropdownOff: ".eletree_icon-dropdown_right",
        dropdownOn: ".eletree_icon-dropdown_bottom",
    },
    data: [
        {
            "label": "安徽省",
            "id": "001",
            "isOpen": true,
            "children": [
                {
                    "label": "淮北市",
                    "id": "001001"
                },
                {
                    "label": "马鞍山市",
                    "id": "001002",
                    "isOpen": true,
                    "children": [
                        {
                            "label": "花山区",
                            "id": "001002001",
                            "disabled": true,
                            "isOpen": true,
                            "children": [
                                {
                                    "label": "aaa",
                                    "id": "001002002001"
                                },
                                {
                                    "label": "bbb",
                                    "checked": true,
                                    "id": "001002002002",
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            "label": "河南省",
            "id": "002"
        },
        {
            "label": "江苏省",
            "id": "003",
            "children": [
                {
                    "label": "苏州市",
                    "id": "003001"
                },
                {
                    "label": "南京市",
                    "id": "003002"
                }
            ],
        }
    ],
})
</script>
```
:::
