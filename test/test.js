import eleTree from '../src/index'

let div = document.createElement('div')
div.classList.add('eletree')
let btn = document.createElement('button')
btn.innerHTML = '获取选中项'
document.body.appendChild(btn)
document.body.appendChild(div)
let ele = eleTree.render({
    el: '.eletree',
    // data: data,
    method: 'post',
    url: './api/tree',
    showCheckbox: true,
    // showLine: true,
    highlightCurrent: true,
    // defaultExpandAll: true,
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
        isOpen: "isOpen",
        isLeaf: "isLeaf"
    },
    // checkStrictlyStatus: 2,
})

btn.onclick = function() {
    console.time()
    let res = ele.updateKeySelf('001', {
        "label": "添加子节点",
        "id": "001002002003001",
        "checked": true
    })
    console.log(res)
    console.timeEnd()
}

// ele.on('checkbox', function(data) {
//     console.log(this)
// })
// ele.on('click', function(data) {
//     console.log(this)
//     console.log(data)
// })