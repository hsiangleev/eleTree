import eleTree from '../src/index'

let div = document.createElement('div')
div.classList.add('eletree')
document.body.appendChild(div)
eleTree.render({
    el: '.eletree',
    data: [
        {
            title: '安徽省',
            id: '001',
            isOpen: true,
            children: [
                {
                    title: '淮北市',
                    id: '001001',
                },
                {
                    title: '合肥市',
                    id: '001003',
                },
                {
                    title: '马鞍山市',
                    id: '001002',
                    isOpen: true,
                    children: [
                        {
                            title: '花山区',
                            id: '001002001',
                            isOpen: true,
                            checked: true,
                            children: [
                                {
                                    title: 'aaa',
                                    id: '001002002001',
                                },
                                {
                                    title: 'bbb',
                                    id: '001002002002',
                                    checked: true,
                                },
                                {
                                    title: 'ccc',
                                    id: '001002002003',
                                    checked: true,
                                },
                            ]
                        },
                        {
                            title: '雨山区',
                            id: '001002002',
                        },
                        {
                            title: '和县',
                            id: '001002003',
                        },
                    ]
                },
            ]
        },
        {
            title: '河南省',
            id: '002'
        },
        {
            title: '江苏省',
            id: '003',
            isOpen: true,
            children: [
                {
                    title: '苏州市',
                    id: '003001'
                },
                {
                    title: '南京市',
                    id: '003002',
                    checked: true,
                },
            ]
        },
    ],
    checkbox: true
})