
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
                    // "checked": true,
                    "children": [
                        {
                            "label": "花山区",
                            "id": "001002001",
                            // "disabled": true,
                            // "checked": true,
                            // "isOpen": true,
                            // "checked": true,
                            "children": [
                                {
                                    "label": "霍里街道",
                                    "disabled": true,
                                    "checked": true,
                                    "id": "001002002001"
                                },
                                {
                                    "label": "桃源路",
                                    "id": "001002002002",
                                },
                                {
                                    "label": "湖东路",
                                    "checked": true,
                                    "id": "001002002003",
                                }
                            ]
                        },
                        {
                            "label": "雨山区",
                            "id": "001002002"
                        },
                        {
                            "label": "和县",
                            // "checked": true,
                            "id": "001002003"
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
                    "id": "003004"
                }
            ],
            // "checked": true
        }
    ]
}
const tree2 = {
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
                    // "checked": true,
                    "children": [
                        {
                            "label": "花山区",
                            "id": "001002001",
                            // "disabled": true,
                            // "checked": true,
                            // "isOpen": true,
                            // "checked": true,
                            "children": [
                                {
                                    "label": "霍里街道222",
                                    "disabled": true,
                                    "checked": true,
                                    "id": "001002002001"
                                },
                                {
                                    "label": "桃源路",
                                    "disabled": true,
                                    "checked": true,
                                    "id": "001002002002",
                                },
                                {
                                    "label": "湖东路",
                                    "disabled": true,
                                    "checked": true,
                                    "id": "001002002003",
                                }
                            ]
                        },
                        {
                            "label": "雨山区",
                            "id": "001002002"
                        },
                        {
                            "label": "和县",
                            // "checked": true,
                            "id": "001002003"
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
                    "id": "003004"
                }
            ],
            // "checked": true
        }
    ]
}
const data = {
    "code": 0,
    "msg": "",
    "data": []
}
let index = 0
for(let i=0;i<20;i++){
    index++
    data.data.push({
        "label": "aa"+i,
        "id": index,
        "children": [],
        "checked": true
    })
}
data.data.forEach((v)=>{
    for(let i=0;i<100;i++){
        index++
        v.children.push({
            "label": "bb"+i,
            "id": index,
            "children": [],
            "checked": true
        })
        for(let j=0;j<100;j++){
            index++
            v.children[i].children.push({
                "label": "cc"+j,
                "id": index,
                "children": [],
                "checked": true
            })
        }
    }
})


module.exports = {
    'POST /api/tree': (req, res)=>{
        setTimeout(() => {
            res.json(tree)
        }, 200);
    },
    'POST /api/maxdata': (req, res)=>{
        setTimeout(() => {
            res.json(tree2)
        }, 200);
    },
    'POST /api/lazyData': (req, res)=>{
        const { id } = req.body;
        setTimeout(() => {
            res.json([
                {
                    "label": "懒加载节点1",
                    "id": "lazy001" + id,
                },
                {
                    "label": "懒加载节点2",
                    "id": "lazy002" + id,
                    "isLeaf": true
                },
            ])
        }, 200);
    },
}