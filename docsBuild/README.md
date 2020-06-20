---
home: true
meta:
  - name: title
    content: eleTree2.0
actionText: 起步 →
description: 基于虚拟dom编写的树组件
actionLink: /eleTree/installation
footer: MIT Licensed | Copyright © 2020-present hsianglee
---

<div class="features">
  <div class="feature">
    <h2>版本重构</h2>
    <p>相较于1.0版本，移除了jquery和layui的依赖，采用snabbdom插件</p>
  </div>
  <div class="feature">
    <h2>代码分离</h2>
    <p>采用webpack的方式，代码结构分离更清晰，并支持直接引入，layui模块引入，和npm的方式引入</p>
  </div>
  <div class="feature">
    <h2>性能优化</h2>
    <p>采用后渲染的方式，即初始渲染时，只渲染展开的树节点，上万条数据无压力渲染</p>
  </div>
</div>

### 小示例

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
})
</script>
<style>
.eletree { 
    
}
</style>
```
:::

::: warning 兼容性
eleTree2.0版本要求浏览器至少为IE10+
:::

