### 属性

#### 基础属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| elem | dom选择器 | string | — | — |
| data | 静态数据 | array | — | — |
| emptText | 当数据为空时显示的内容 | string | — | 暂无数据 |
| renderAfterExpand | 是否在第一次展开某个树节点后才渲染其子节点(尚未展开的节点先不渲染dom，大数据量时大大提高渲染速度) | boolean | — | true |
| highlightCurrent | 是否高亮当前选中节点 | boolean | — | false |
| defaultExpandAll | 是否默认展开所有节点 | boolean | — | false |
| autoExpandParent | 展开子节点的时候是否自动展开父节点 | boolean | — | false |
| expandOnClickNode | 是否在点击文本的时候展开或者收缩节点，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | boolean | — | true |
| checkOnClickNode | 是否在点击文本的时候选中节点 | boolean | — | false |
| defaultExpandedKeys | 默认展开的节点的 key 的数组 | array | — | — |
| showCheckbox | 是否显示checkbox | boolean | — | false |
| checkStrictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | boolean | — | false |
| defaultCheckedKeys | 默认勾选的节点的 key 的数组 | array | — | — |
| accordion | 是否每次只打开一个同级树节点展开（手风琴效果） | boolean | — | false |
| indent | 相邻级节点间的水平缩进，单位为像素 | number | — | 16 |
| showLine | 是否显示虚线 | boolean | — | true |
| imgUrl | 图片所在的文件夹路径 | string | — | ./images/ |
| icon | 使用自定义图标或图片 | object | fold，leaf，checkFull，checkHalf，checkNone，dropdownOff，dropdownOn | 每个属性默认值均为空字符串 |
| done | 树渲染完成之后的回调，参数为data数据 | function | — | — |


#### 异步属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| url | 异步接口地址 | string | — | — |
| method | 接口http请求类型 | string | get,post | get |
| where | 接口的其它参数 | object | — | — |
| headers | 接口的请求头 | object | — | — |
| response | dom选择器 | string | — | — |
| request | dom选择器 | string | — | — |
