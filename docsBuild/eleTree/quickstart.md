### 快速开始

::: demo
```html
<div class="eletree"></div>

<script>
eleTree.render({
    el: '.eletree',
    data: [
        {
            "label": "安徽省",
            "id": "001",
            "isOpen": true,
            // "checked": true,
            "children": [
                {
                    "label": "淮北市",
                    "id": "001001"
                },
                {
                    "label": "合肥市",
                    "id": "001003"
                },
                {
                    "label": "马鞍山市",
                    "id": "001002",
                    // "disabled": true,
                    "isOpen": true,
                    // "checked": true,
                    "children": [
                        {
                            "label": "花山区",
                            "id": "001002001",
                            "disabled": true,
                            "isOpen": true,
                            // "checked": true,
                            "children": [
                                {
                                    "label": "霍里街道",
                                    "id": "001002002001"
                                },
                                {
                                    "label": "桃源路",
                                    "checked": true,
                                    "id": "001002002002",
                                },
                                {
                                    "label": "湖东路",
                                    "id": "001002002003",
                                }
                            ]
                        },
                        {
                            "label": "雨山区",
                            "id": "001002002"
                        },
                        {
                            "label": "和县",
                            "id": "001002003"
                        }
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
            // "checked": true
        }
    ],
    showCheckbox: true,
    highlightCurrent: true,
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
    rightMenuList: ["copy", "paste", "paste_before", "paste_after", "cut_paste", "edit", "remove", "add_child", "add_before", "add_after"]
})
</script>
<style>
.eletree { 
    
}
</style>
```
:::