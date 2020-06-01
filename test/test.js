import eleTree from '../src/index'

let div = document.createElement('div')
div.classList.add('eletree')
document.body.appendChild(div)
eleTree.render({
    el: '.eletree',
    // data: data,
    method: 'get',
    url: './api/tree',
    showCheckbox: true,
    // showLine: true,
    highlightCurrent: true,
    defaultExpandAll: true,
    expandOnClickNode: true,
    checkOnClickNode: false,
    // defaultExpandedKeys: ['001','001002','001002001'],
    // checkStrictly: true,
    // defaultCheckedKeys: ['001002002002','001002002003'],
    // accordion: true,
    // indent: 26,
    // done: function(data) {
    //     console.log(data)
    // },
    request: {
        name: "label",
        key: "id",
        children: "children",
        disabled: "disabled",
        checked: "checked",
        isLeaf: "isLeaf"
    },
})