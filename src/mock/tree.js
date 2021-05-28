/**
 * 生成数据
 * @param {*有多少个子层} maxFloor 
 * @param {*每一层有多少条数据} everyFloorMuch 
 */
var f=function(maxFloor, everyFloorMuch, d, obj) {
    d = d || []
    obj = obj || {floor: 0, index: 0}
    obj.floor++
    for(var i=0;i<everyFloorMuch;i++){
        obj.index++
        var o={
            "label": "节点"+obj.index,
            "id": obj.index,
            "children": [],
            "checked": true,
            "radioChecked": true
        }
        d[i] ? d[i].children.push(o) : d.push(o)
        if(obj.floor<maxFloor){
            f(maxFloor, everyFloorMuch, d[i].children, obj)
        }
    }
    obj.floor--
    return d
}
const tree = {
    "code": 0,
    "msg": "",
    "data": [
        {
            "label": "安徽省",
            "id": "001",
            "isOpen": true,
            "children": [
                {
                    "label": "淮北市",
                    "id": "001001"
                },
                {
                    "label": "马鞍山市",
                    "id": "001002",
                    // "disabled": true,
                    "isOpen": true,
                    "checked": true,
                    "children": [
                        {
                            "label": "花山区",
                            "id": "001002001",
                            // "disabled": true,
                            // "checked": true,
                            // "isOpen": true,
                            "checked": true,
                            "children": [
                                {
                                    "label": "霍里街道",
                                    "disabled": true,
                                    "checked": true,
                                    "id": "001002002001",
                                    // "radioChecked": true
                                },
                                {
                                    "label": "桃源路",
                                    "id": "001002002002",
                                    "radioDisabled": true,
                                    "checked": true,
                                    // "radioChecked": true
                                },
                                {
                                    "label": "湖东路",
                                    // "checked": true,
                                    "id": "001002002003",
                                    // "radioChecked": true
                                }
                            ]
                        },
                        {
                            "label": "雨山区",
                            "id": "001002002",
                            // "radioChecked": true
                        },
                        {
                            "label": "和县",
                            // "checked": true,
                            "id": "001002003",
                            // "radioChecked": true
                        }
                    ]
                },
                {
                    "label": "合肥市",
                    "id": "001003"
                },
            ]
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
                },
                {
                    "label": "无锡市",
                    "id": "003003"
                },
                {
                    "label": "徐州市",
                    "id": "003004",
                }
            ],
            // "checked": true
        },
        {
            "label": "河南省",
            "id": "002",
            "children": [
                {
                    "label": "郑州市",
                    "id": "002001"
                },
                {
                    "label": "开封市",
                    "id": "002002"
                }
            ],
        },
    ]
}
const manyData = {
    "code": 0,
    "msg": "",
    "data": f(4, 20)
}
const pidData = {
    "code": 0,
    "msg": "",
    "data": [
        {"label": "安徽省", "id": "001", "isOpen": true, "pid": ""},
        {"label": "淮北市", "id": "001001", "pid": "001"},
        {"label": "马鞍山市", "id": "001002", "isOpen": true, "pid": "001"},
        {"label": "花山区", "id": "001002001", "isOpen": true, "pid": "001002"},
        {"label": "霍里街道", "id": "001002002001", "pid": "001002001"},
        {"label": "桃源路", "id": "001002002002", "pid": "001002001", "checked": true},
        {"label": "湖东路", "id": "001002002003", "pid": "001002001"},
        {"label": "雨山区", "id": "001002002", "pid": "001002"},
        {"label": "和县", "id": "001002003", "pid": "001002"},
        {"label": "合肥市", "id": "001003", "pid": "001"},
        {"label": "河南省", "id": "002", "pid": ""},
        {"label": "郑州市", "id": "002001", "pid": "002"},
        {"label": "开封市", "id": "002002", "pid": "002"},
        {"label": "江苏省", "id": "003", "pid": ""},
        {"label": "苏州市", "id": "003001", "pid": "003"},
        {"label": "南京市", "id": "003002", "pid": "003"},
        {"label": "无锡市", "id": "003003", "pid": "003"},
        {"label": "徐州市", "id": "003004", "pid": "003"},
    ]
}

const lazy = {
    "code": 0,
    "msg": "",
    "data": [
        {
            "label": "安徽省",
            "id": "001",
            "checked": true
        },
        {
            "label": "河南省",
            "id": "002",
            "isLeaf": true
        },
        {
            "label": "江苏省",
            "id": "003",
            "isLeaf": true
        }
    ]
}
var index = 1;
module.exports = {
    'POST /api/tree': (req, res)=>{
        setTimeout(() => {
            res.json(tree)
        }, 0);
    },
    'POST /api/manyData': (req, res)=>{
        setTimeout(() => {
            res.json(manyData)
        }, 0);
    },
    'POST /api/lazy': (req, res)=>{
        setTimeout(() => {
            res.json(lazy)
        }, 0);
    },
    'POST /api/lazyData': (req, res)=>{
        const { id } = req.body;
        index++
        setTimeout(() => {
            let d=[
                {
                    "label": "懒加载节点1",
                    "id": "lazy001" + id,
                    "checked": true
                },
                {
                    "label": "懒加载节点2",
                    "id": "lazy002" + id,
                    "isLeaf": true
                },
            ]
            if(index==3 || index==4){
                d=[{
                    "label": "懒加载节点1",
                    "id": "lazy001" + id,
                    "checked": true
                },]
            }
            res.json(d)
        }, 200);
    },
}