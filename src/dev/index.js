import eleTree from '~/entry'

let btn = document.querySelector('button')
let ele = eleTree.render({
    el: '.eletree',
    // data: data,
    method: 'post',
    url: '/api/tree',
    where: {
        a: 'aaa'
    },
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

ele.on('checkbox', function(data) {
    // console.log(this)
    console.log(data)
})
// ele.on('click', function(data) {
//     console.log(this)
//     console.log(data)
// })


let ele2 = eleTree.render({
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
ele2.on('checkbox', function(data) {
    // console.log(this)
    console.log(data)
})