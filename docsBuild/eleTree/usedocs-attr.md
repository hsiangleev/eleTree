### 属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| elem | dom选择器 | string | — | — |
| data | 静态数据 | array | — | — |
| emptText | 当数据为空时显示的内容 | string | — | 暂无数据 |
| highlightCurrent | 是否高亮当前选中节点 | boolean | — | false |
| defaultExpandAll | 是否默认展开所有节点 | boolean | — | false |
| expandOnClickNode | 是否在点击文本的时候展开或者收缩节点，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | boolean | — | true |
| checkOnClickNode | 是否在点击文本的时候选中节点 | boolean | — | false |
| defaultExpandedKeys | 默认展开的节点的 key 的数组 | array | — | — |
| showCheckbox | 是否显示checkbox | boolean | — | false |
| checkStrictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | boolean | — | false |
| defaultCheckedKeys | 默认勾选的节点的 key 的数组 | array | — | — |
| accordion | 是否每次只打开一个同级树节点展开（手风琴效果） | boolean | — | false |
| indent | 相邻级节点间的水平缩进，单位为像素 | number | — | 16 |
| showLine | 是否显示虚线 | boolean | — | true |
