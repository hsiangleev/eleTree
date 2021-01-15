const path = require('path')
module.exports = {
    title: 'eleTree2.0',  // 设置网站标题
    dest: './docs',    // 设置输出目录
    repo: 'https://github.com/hsiangleev/eleTree/', // 添加 github 链接,
    port: 3001,
    themeConfig: {
        // 添加导航栏
        nav: [
            { text: 'eleTree2.0', link: '/eleTree/installation' },
            { text: '1.0版本', link: 'https://layuiextend.hsianglee.cn/eleTree/' },
            { text: 'github', link: 'https://github.com/hsiangleev/eleTree' },
            { text: '个人博客', link: 'https://hsianglee.cn' },
        ],
        // 为以下路由添加侧边栏
        sidebar: [
            {
                title: '开发指南',
                collapsable: false,
                children: [
                    "/eleTree/installation",
                    "/eleTree/quickstart",
                    "/eleTree/update-log"
                ]
            },
            {
                title: '使用文档',
                collapsable: false,
                children: [
                    "/eleTree/usedocs-attr",
                    "/eleTree/usedocs-methods",
                    "/eleTree/usedocs-event",
                ]
            },
            {
                title: '示例',
                collapsable: false,
                children: [
                    "/eleTree/demo-methods",
                    "/eleTree/demo-icon",
                    "/eleTree/demo-customText",
                    "/eleTree/demo-datatype",
                    "/eleTree/demo-rightmenu",
                    "/eleTree/demo-drag",
                    "/eleTree/demo-lazyload",
                    "/eleTree/demo-search",
                    "/eleTree/demo-manydata",
                    "/eleTree/explain"
                ]
            },
        ],
        lastUpdated: 'Last Updated',
        algolia: {
            apiKey: '57dc14ca434885af02f22dad11e30550',
            indexName: 'hsiangleev_eletree'
        }
    },
    plugins: [
        require('./demo/index.js')
    ],
    markdown: {
        lineNumbers: true
    },
    head: [
        ['meta', { name: 'baidu-site-verification', content: 'IvAUSITvsn' }],
        ['meta', { name: 'description', content: 'eleTree2.0在线文档' }],
        ['meta', { name: 'keywords', content: 'eleTree2.0在线文档' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
        ['link', { rel: 'stylesheet', href: '/eleTree/css/icon.css?v=2.2.12.1' }],
        ['script', { src: '/eleTree/eleTree.js?v=2.2.13.1' }],
        ['script', { }, 'var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?7fcfe1e92263ed7399914905523c0c95";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();']
    ],
    configureWebpack: {
        resolve: {
            alias: {
                "~": path.join(__dirname, '../../src/')
            }
        }
    }
}