import eleTree from '~/entry'
import '~/public/css/icon.css'
import ajax from '~/opera/ajax'

let btn = document.querySelector('button')
let search = document.querySelector('.search')
let ele = eleTree({
    el: '.eletree',
    // data: [],
    method: 'post',
    url: '/api/tree',
    where: {
        a: 'aaa'
    },
    showCheckbox: true,
    // showLine: true,
    highlightCurrent: true,
    highlightNode: "001002001",
    isDefaultChangePstatus: true,
    // defaultExpandAll: true,
    // expandOnClickNode: false,
    // checkOnClickNode: true,
    // radioOnClickNode: true,
    // defaultExpandedKeys: ['001','001002001'],
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
        radioCheck: "radioCheck.png",
        radioCheckNone: "radioCheckNone.png",
    },
    // iconItem: function(data) {
    //     let s = `${data.label}`
    //     if(data.id.toString().indexOf("2")!==-1) {
    //         return {
    //             checkFull: ".eletree_icon-check_full",
    //             checkHalf: ".eletree_icon-check_half",
    //             checkNone: ".eletree_icon-check_none",
    //         }
    //     }
    // },
    // lazy: true,
    rightMenuList: ["copy", "paste", "paste_before", "paste_after", "cut_paste", "edit", "remove", "add_child", "add_before", "add_after", {name: '选中', value: 'checked'}],
    // rightMenuList: function(data) {
    //     let s = `${data.label}`
    //     if(data.id.toString().indexOf("2")!==-1) return ["copy", "paste"]
    //     return ["add_child", "add_before", "add_after"]
    // },
    // showRadio: true,
    // isOnlyShowLeafRadio: true,
    // radioType: "level", // all
    // defaultRadioCheckedKeys: ['002', '001002002002'],
    draggable: true,
    customText: function(data) {
        let s = `${data.label}`
        if(data.id.toString().indexOf("2")!==-1){
            s+=`<i class="eletree_icon-add addchild_test"></i>
            <i class="eletree_icon-edit edit_test"></i>
            <i class="eletree_icon-delete delete_test"></i>`
        }
        return s
    },
    // sort: true,
    // initSort: {
    //     // id: null,
    //     field: "sort_",
    //     type: "desc",
    //     // depth: null,
    // }
})
let index = 1
btn.onclick = function() {
    // getChecked
    {
        // console.group('getChecked: ')
        // let res = ele.getChecked()
        // console.log(res)
        // console.groupEnd()
    }
    // setChecked
    {
        // console.group('setChecked: ')
        // let res = ele.setChecked(['001002002002'], false)
        // console.log(res)
        // console.groupEnd()
    }
    // append
    {
        // console.group('append: ')
        // let res = ele.append('001002002002',[
        //     {
        //         label: `添加子节点${index++}`,
        //         id: `append${index}`,
        //         // checked: true,
        //         children: [
        //             {
        //                 label: `子节点${index++}`,
        //                 id: `append2${index}`,
        //                 checked: true,
        //             }
        //         ]
        //     }
        // ])
        // let res = ele.append([
        //     {label: `添加子节1`, id: `a`, pid: "001002002002"},
        //     {label: `添加子节点2`, id: `b`, pid: "001002002003"},
        //     {label: `添加子节点3`, id: `ab`, pid: "a"},
        //     {label: `添加子节点4`, id: `ac`, pid: "a", checked: true},
        // ])
        // console.log(res)
        // console.groupEnd()
    }
    // updateKeySelf
    {
        // console.group('updateKeySelf: ')
        // let res = ele.updateKeySelf('001002002002',{
        //     label: `修改节点${index++}`,
        //     // id: `addChild${index}`,
        //     // disabled: true,
        //     checked: true
        // })
        // let res = ele.updateKeySelf([
        //     {label: `桃源路11`, id: `001002002002`, pid: "001002001"},
        //     {label: `湖东路11`, id: `001002002003`, pid: "001002001"},
        // ])
        // console.log(res)
        // console.groupEnd()
    }
    // unChecked
    {
        // console.group('unChecked: ')
        // let res = ele.unChecked('001002002002')
        // console.log(res)
        // console.groupEnd()
    }
    // expandAll
    {
        // console.group('expandAll: ')
        // let res = ele.expandAll()
        // console.log(res)
        // console.groupEnd()
    }
    // unExpandAll
    {
        // console.group('unExpandAll: ')
        // let res = ele.unExpandAll()
        // console.log(res)
        // console.groupEnd()
    }
    // remove
    {
        // console.group('remove: ')
        // let res = ele.remove(['001002002001','001002002002','003'])
        // console.log(res)
        // console.groupEnd()
    }
    // insert
    {
        // console.group('insert: ')
        // let res = ele.insert('001002002002', [
        //     {
        //         label: `插入节点${index++}`,
        //         id: `insert${index}`,
        //         checked: true
        //     }
        // ], 'before')
        // console.log(res)
        // console.groupEnd()
    }
    // reload
    {
        // console.group('reload: ')
        // let res = ele.reload({
        //     url: '/api/maxdata'
        // })
        // console.log(res)
        // console.groupEnd()
    }
    // search
    {
        // console.group('search: ')
        // let res = ele.search(search.value, function(value, data) {
        //     // data为每个节点数据，函数返回true则显示该节点
        //     if (!value) return true;
        //     return data.label.indexOf(value) !== -1;
        // })
        // console.log(res)
        // console.groupEnd()
    }
    // getRadioChecked
    {
        // console.group('getRadioChecked: ')
        // let res = ele.getRadioChecked()
        // console.log(res)
        // console.groupEnd()
    }
    // setRadioChecked
    {
        // console.group('setRadioChecked: ')
        // let res = ele.setRadioChecked(['001002002003','003'])
        // console.log(res)
        // console.groupEnd()
    }
    // unRadioChecked
    {
        // console.group('unRadioChecked: ')
        // let res = ele.unRadioChecked(['001002002001'])
        // console.log(res)
        // console.groupEnd()
    }
    // getAllNodeData
    // {
    //     console.group('getAllNodeData: ')
    //     let res = ele.getAllNodeData()
    //     console.log(res)
    //     console.groupEnd()
    // }
    // copy
    // {
    //     console.group('copy: ')
    //     let res = ele.copy('001002002001')
    //     console.log(res)
    //     console.groupEnd()
    // }
    // cutPaste
    // {
        // console.group('cutPaste: ')
        // let res = ele.cutPaste('001002002001')
        // console.log(res)
        // console.groupEnd()
    // }
    // paste
    // {
        // console.group('paste: ')
        // let res = ele.paste('001002002003', 'after')
        // console.log(res)
        // console.groupEnd()
    // }
    // getClipboardData
    // {
        // console.group('getClipboardData: ')
        // let res = ele.getClipboardData()
        // console.log(res)
        // console.groupEnd()
    // }
    // setAllChecked
    {
        // console.group('setAllChecked: ')
        // let res = ele.setAllChecked()
        // console.log(res)
        // console.groupEnd()
    }
    // reverseChecked
    {
        // console.group('reverseChecked: ')
        // let res = ele.reverseChecked()
        // console.log(res)
        // console.groupEnd()
    }
    // edit
    {
        // console.group('edit: ')
        // let res = ele.edit("001002002001")
        // console.log(res)
        // console.groupEnd()
    }
    // sort
    {
        console.group('sort: ')
        let res = ele.sort({
            // id: "001002",
            field: "sort_", 
            type: "desc", 
            // depth: 2
        })
        console.log(res)
        console.groupEnd()
    }
}

ele.on('lazyload', function(d) {
    var {data, load} = d
    if(data.id === "001002002003"){
        ajax({
            method: 'post',
            url: '/api/lazyData',
            data: {id: data.id}
        }).then(d=>{
            load(d)
            // ele.sort({
            //     id: d.id,
            //     field: "id",
            //     type: "desc",
            // })
        })
    }else{
        load([])
    }
    
})

ele.on('checkbox', function(data) {
    // console.log(this)
    // console.log(data)
})
ele.on('click', function(data) {
    if(this.target.classList.contains('addchild_test')){
        ele.append(data.data.id, {
            label: 'aaa',
            id: ++index
        })
        ele.edit(index, 'add_child')
    }else if(this.target.classList.contains('edit_test')){
        ele.edit(data.data.id)
    }else if(this.target.classList.contains('delete_test')){
        ele.remove(data.data.id)
    }
    // console.log(data)
})
ele.on('drag', function(data) {
    console.log(this)
    console.log(data)
    setTimeout(() => {
        data.load()
        // data.stop()
    }, 500);
})
ele.on('edit', function(data) {
    console.log(this)
    console.log(data)
    setTimeout(() => {
        data.load()
        // data.stop()
    }, 500);
})
ele.on('add_child', function(data) {
    // console.log(this)
    console.log(data)
    setTimeout(() => {
        data.load({
            id: '999',
            checked: true
        })
        // data.stop()
    }, 500);
})
ele.on('custom_checked', function(data) {
    // console.log(this)
    console.log(data)
    setTimeout(() => {
        ele.setChecked([data.data.id], false)
        data.load()
        // data.stop()
    }, 500);
})


// let ele2 = eleTree({
//     el: '.eletree2',
//     method: 'post',
//     url: '/api/tree',
//     where: {
//         a: 'aaa'
//     },
//     showCheckbox: true,
//     highlightCurrent: true,
//     rightMenuList: ["copy", 'paste']
// })