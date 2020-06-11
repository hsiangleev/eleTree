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
            { text: 'eleTree', link: '/eleTree/' },
            { text: 'github', link: 'https://github.com/hsiangleev/eleTree' }
        ],
        // 为以下路由添加侧边栏
        sidebar: {
            '/eleTree/': [
                "",
                "installation"
            ]
        },
        lastUpdated: 'Last Updated'
    },
    plugins: [
        require('./demo/index.js')
    ],
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                "~": path.join(__dirname, '../../src/')
            }
        }
    }
}