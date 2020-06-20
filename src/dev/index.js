import eleTree from '~/entry'
import '~/public/css/icon.css'
import ajax from '~/opera/ajax'

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
    defaultExpandedKeys: ['001','001002001'],
    // accordion: true,
    // autoExpandParent: true,
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
    // icon: {
    //     fold: ".eletree_icon-file_fold",
    //     leaf: ".eletree_icon-file_leaf",
    //     checkFull: ".eletree_icon-check_full",
    //     checkHalf: ".eletree_icon-check_half",
    //     checkNone: ".eletree_icon-check_none",
    //     dropdownOff: ".eletree_icon-dropdown_right",
    //     dropdownOn: ".eletree_icon-dropdown_bottom",
    //     loading: ".eleTree-animate-rotate.eletree_icon-loading1",
    // },
    icon: {
        fold: "fold.png",
        leaf: "leaf.png",
        checkFull: ".eletree_icon-check_full",
        checkHalf: ".eletree_icon-check_half",
        checkNone: ".eletree_icon-check_none",
        dropdownOff: "dropdownOff.png",
        dropdownOn: "dropdownOn.png",
        loading: "",
    },
    lazy: true
})

btn.onclick = function() {
    console.time()
    let res = ele.updateKeyChildren('001', [
        {
            "label": "添加子节点",
            "id": "001002002003001",
            "checked": true
        }
    ])
    console.log(res)
    console.timeEnd()
}

ele.on('lazyload', function(d) {
    var {data, load} = d
    console.log(d)
    ajax({
        method: 'post',
        url: '/api/lazyData',
        data: {id: data.id}
    }).then(d=>{
        load(d)
    })
})

ele.on('checkbox', function(data) {
    // console.log(this)
    // console.log(data)
})
// ele.on('click', function(data) {
//     console.log(this)
//     console.log(data)
// })


// let ele2 = eleTree.render({
//     el: '.eletree2',
//     data: [],
//     showCheckbox: true,
//     highlightCurrent: true,
//     expandOnClickNode: true,
//     checkOnClickNode: false,
// })
// ele2.on('checkbox', function(data) {
//     // console.log(this)
//     console.log(data)
// })