const path = require('path')
module.exports = {
    title: 'eleTree',  // 设置网站标题
    dest: './docs',    // 设置输出目录
    // base: '/mt-blog/', // 设置站点根路径
    repo: 'https://github.com/hsiangleev/eleTree/', // 添加 github 链接,
    port: 3001,
    themeConfig: {
        // 添加导航栏
        nav: [
            { text: 'eleTree', link: '/eleTree/installation' },
            { text: 'github', link: 'https://github.com/hsiangleev/eleTree' }
        ],
        // 为以下路由添加侧边栏
        sidebar: [
            {
                title: '开发指南',
                collapsable: false,
                children: [
                    "/eleTree/installation",
                    "/eleTree/quickstart"
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
                    "/eleTree/demo-icon",
                ]
            },
        ],
        lastUpdated: 'Last Updated'
    },
    plugins: [
        require('./demo/index.js')
    ],
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
        ['link', { rel: 'stylesheet', href: '/eleTree/css/icon.css' }],
        ['script', { src: '//eletreejs.surge.sh/eleTree.js' }]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                "~": path.join(__dirname, '../../src/')
            }
        }
    }
}