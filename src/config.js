export const eleTreeConfig = {
    elem: "",
    data: [],
    emptText: "暂无数据",        // 内容为空的时候展示的文本
    // renderAfterExpand: true,    // 是否在第一次展开某个树节点后才渲染其子节点
    highlightCurrent: false,    // 是否高亮当前选中节点，默认值是 false。
    defaultExpandAll: false,    // 是否默认展开所有节点
    expandOnClickNode: true,    // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    checkOnClickNode: false,    // 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。
    defaultExpandedKeys: [],    // 默认展开的节点的 key 的数组
    autoExpandParent: true,     // 展开子节点的时候是否自动展开父节点
    showCheckbox: false,        // 节点是否可被选择
    checkStrictly: false,       // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    defaultCheckedKeys: [],     // 默认勾选的节点的 key 的数组
    accordion: false,           // 是否每次只打开一个同级树节点展开（手风琴效果）
    indent: 16,                 // 相邻级节点间的水平缩进，单位为像素
    lazy: false,                // 是否懒加载子节点，需与 load 方法结合使用
    load: function() {},        // 加载子树数据的方法，仅当 lazy 属性为true 时生效
    draggable: false,           // 是否开启拖拽节点功能
    contextmenuList: [],        // 启用右键菜单，支持的操作有："copy","add","edit","remove"
    searchNodeMethod: null,     // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    showLine: true,            // 是否显示连线，默认false

    method: "get",
    url: "",
    headers: {},
    done: null,
    response: {
        statusName: "code",
        statusCode: 0,
        dataName: "data"
    },
    request: {
        name: "label",
        key: "id",
        children: "children",
        disabled: "disabled",
        checked: "checked",
        isLeaf: "isLeaf"
    },
    customKey: "id",            // 自定义key转义，即appKey=>app-id
}