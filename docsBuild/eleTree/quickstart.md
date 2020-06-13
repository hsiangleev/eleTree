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
                                    "label": "aaa",
                                    "id": "001002002001"
                                },
                                {
                                    "label": "bbb",
                                    "checked": true,
                                    "id": "001002002002",
                                },
                                {
                                    "label": "ccc",
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
})
</script>
<style>
.eletree { 
    
}
</style>
```
:::

