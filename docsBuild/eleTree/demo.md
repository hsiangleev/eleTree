### eleTree树形控件1

::: demo
```html
<template>
    <div class="eletree"></div>
</template>
<script>
import eleTree from '~/index'
export default {
    data: () => ({ message: 'Hello World' }),
    mounted() {
        eleTree.render({
            el: '.eletree',
            data: [
                {
                    "label": "安徽省",
                    "id": "001",
                    "isOpen": true,
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
            showCheckbox: true,
            highlightCurrent: true,
            expandOnClickNode: true,
            checkOnClickNode: false,
        })
    }
}
</script>
<style>
.box-vue { color: red; }
</style>
```
:::


### eleTree树形控件2

::: demo
```html
<template>
    <div class="eletree2"></div>
</template>
<script>
import eleTree from '~/index'
export default {
    data: () => ({ message: 'Hello World' }),
    mounted() {
        eleTree.render({
            el: '.eletree2',
            data: [
                {
                    "label": "安徽省",
                    "id": "001",
                    "isOpen": true,
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
            showCheckbox: true,
            highlightCurrent: true,
            expandOnClickNode: true,
            checkOnClickNode: false,
        })
    }
}
</script>
<style>
.box-vue { color: red; }
</style>
```
:::