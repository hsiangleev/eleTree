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
    // expandOnClickNode: true,
    // checkOnClickNode: false,
    defaultExpandedKeys: ['001','001002001'],
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
    // lazy: true
})

let index = 1
btn.onclick = function() {
    // getChecked
    {
        console.group('getChecked: ')
        let res = ele.getChecked()
        console.log(res)
        console.groupEnd()
    }
    // setChecked
    {
        console.group('setChecked: ')
        let res = ele.setChecked()
        console.log(res)
        console.groupEnd()
    }
    // updateKeyChildren
    {
        console.group('updateKeyChildren: ')
        let res = ele.updateKeyChildren('001',[
            {
                label: `添加子节点${index++}`,
                id: `addChild${index}`,
                disabled: true,
                checked: true
            }
        ])
        console.log(res)
        console.groupEnd()
    }
    // updateKeySelf
    {
        console.group('updateKeySelf: ')
        let res = ele.updateKeySelf('001001',{
            label: `修改节点${index++}`,
            id: `addChild${index}`,
            disabled: true,
            checked: true
        })
        console.log(res)
        console.groupEnd()
    }
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
