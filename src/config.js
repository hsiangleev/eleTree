export const eleTreeConfig = {
    elem: "",                   // 1
    data: [],                   // 1
    emptText: "暂无数据",        // 内容为空的时候展示的文本    1
    renderAfterExpand: true,    // 是否在第一次展开某个树节点后才渲染其子节点(尚未展开的节点先不渲染dom，大数据量时大大提高渲染速度)
    highlightCurrent: false,    // 是否高亮当前选中节点，默认值是 false。           1
    defaultExpandAll: false,    // 是否默认展开所有节点                             1
    expandOnClickNode: true,    // 是否在点击文本的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 1
    checkOnClickNode: false,    // 是否在点击文本的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。 1
    defaultExpandedKeys: [],    // 默认展开的节点的 key 的数组  1
    autoExpandParent: false,     // 展开子节点的时候是否自动展开父节点  1
    showCheckbox: false,        // 节点是否可被选择     1
    checkStrictly: false,       // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false   1
    defaultCheckedKeys: [],     // 默认勾选的节点的 key 的数组      1
    accordion: false,           // 是否每次只打开一个同级树节点展开（手风琴效果）   1
    indent: 16,                 // 相邻级节点间的水平缩进，单位为像素               1
    lazy: false,                // 当不是懒加载时，叶子节点由当前节点是否由子节点判断，如果为懒加载，则叶子节点由当前节点的属性isLeaf: true决定
    load: function() {},        // 加载子树数据的方法，仅当 lazy 属性为true 时生效
    draggable: false,           // 是否开启拖拽节点功能
    contextmenuList: [],        // 启用右键菜单，支持的操作有："copy","add","edit","remove"
    searchNodeMethod: null,     // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    showLine: true,             // 是否显示连线，默认true    1
    imgUrl: "./images/",        // 图片所在的文件夹路径       1
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

    method: "get",      // 1
    url: "",            // 1
    where: {},          // 1
    headers: {},        // 1
    done: null,         // 1
    response: {         // 1
        statusName: "code",
        statusCode: 0,
        dataName: "data"
    },
    request: {          // 1
        name: "label",
        key: "id",
        children: "children",
        disabled: "disabled",       // 被禁用的节点不会影响父子节点的选中状态
        checked: "checked",
        isOpen: "isOpen",
        isLeaf: "isLeaf"
    },
}

export const symbolAttr = {
    node: Symbol('node'),                       // 保存当前整个虚拟dom树（为了之后的替换）
    activeElm: Symbol('activeElm'),             // 保存上一次点击的dom节点（高亮显示）
    isRenderChild: Symbol('isRenderChild'),     // 是否已经渲染子节点
    disabledParentStatus: Symbol('disabledParentStatus'),   // 禁用的父节点状态
    isLazyNode: Symbol('isLazyNode'),           // 节点是否已经懒加载了
}