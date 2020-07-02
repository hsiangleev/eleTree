### 属性

#### 基础属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| elem | dom选择器 | string | — | — |
| data | 静态数据 | array | — | — |
| emptText | 当数据为空时显示的内容 | string | — | 暂无数据 |
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
| icon | 使用自定义图标或图片 | object | fold，leaf，checkFull，checkHalf，checkNone，dropdownOff，dropdownOn，loading | 每个属性默认值均为空字符串 |
| done | 树渲染完成之后的回调，参数为data数据 | function | — | — |
| lazy | 开启懒加载 | boolean | — | false |
| rightMenuList | 开启右键菜单 | array | "copy", "paste", "paste_before", "paste_after", "cut_paste", "edit", "remove", "add_child", "add_before", "add_after" | [] |


#### 异步属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| url | 异步接口地址 | string | — | — |
| method | 接口http请求类型 | string | get,post | get |
| where | 接口的其它参数 | object | — | — |
| headers | 接口的请求头 | object | — | — |
| response | dom选择器 | string | — | — |
| request | dom选择器 | string | — | — |

#### 默认配置

```javascript
{
    elem: "",                   // dom选择器
    data: [],                   // 静态数据
    emptText: "暂无数据",        // 内容为空的时候展示的文本
    highlightCurrent: false,    // 是否高亮当前选中节点，默认值是 false。       
    defaultExpandAll: false,    // 是否默认展开所有节点                         
    expandOnClickNode: true,    // 是否在点击文本的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    checkOnClickNode: false,    // 是否在点击文本的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。
    defaultExpandedKeys: [],    // 默认展开的节点的 key 的数组 
    autoExpandParent: false,     // 展开子节点的时候是否自动展开父节点 
    showCheckbox: false,        // 节点是否可被选择 
    checkStrictly: false,       // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false  
    defaultCheckedKeys: [],     // 默认勾选的节点的 key 的数组  
    accordion: false,           // 是否每次只打开一个同级树节点展开（手风琴效果）  
    indent: 16,                 // 相邻级节点间的水平缩进，单位为像素           
    lazy: false,                // 当不是懒加载时，叶子节点由当前节点是否由子节点判断，如果为懒加载，则叶子节点由当前节点的属性isLeaf: true决定
    load: function() {},        // 加载子树数据的方法，仅当 lazy 属性为true 时生效
    draggable: false,           // 是否开启拖拽节点功能
    contextmenuList: [],        // 启用右键菜单，支持的操作有："copy","add","edit","remove"
    searchNodeMethod: null,     // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    showLine: true,             // 是否显示连线，默认true
    imgUrl: "./images/",        // 图片所在的文件夹路径   
    icon: {                     // 自定义图标
        fold: "",
        leaf: "",
        checkFull: "",
        checkHalf: "",
        checkNone: "",
        dropdownOff: "",
        dropdownOn: "",
        loading: "",
    },
    rightMenuList: [],          // 右键菜单("copy", "paste", "paste_before", "paste_after", "cut_paste", "edit", "remove", "add_child", "add_before", "add_after")
    done: null,         // 树渲染完成之后的回调

    method: "get",      // 接口http请求类型
    url: "",            // 异步接口地址
    where: {},          // 接口的其它参数
    headers: {},        // 接口的请求头
    response: {         // 对后台返回的数据格式重新定义
        statusName: "code",
        statusCode: 0,
        dataName: "data"
    },
    request: {          // 对于后台数据重新定义名字
        name: "label",
        key: "id",
        children: "children",
        disabled: "disabled",       // 被禁用的节点不会影响父子节点的选中状态
        checked: "checked",
        isOpen: "isOpen",
        isLeaf: "isLeaf"
    },
}
```