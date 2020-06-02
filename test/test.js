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
        isOpen: "isOpen",
        isLeaf: "isLeaf"
    },
    // checkStrictlyStatus: 2,

    addEventListener: {
        click(data) {
            // console.log(data)
        },
        checkbox(data) {
            // console.log(data)
        }
    }
})

btn.onclick = function() {
    console.time()
    ele.getChecked().then(arr=>{
        console.log(arr)
    })
    console.timeEnd()
}