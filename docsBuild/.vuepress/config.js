const path = require('path')
module.exports = {
    title: 'eleTree',  // 设置网站标题
    dest: './docs',    // 设置输出目录
    // base: '/mt-blog/', // 设置站点根路径
    // repo: 'https://github.com/txs1992/mt-blog', // 添加 github 链接,
    port: 3001,
    themeConfig: {
        // 添加导航栏
        nav: [
            { text: 'eleTree', link: '/eleTree/' },
            {
                text: 'github',
                // 这里是下拉列表展现形式。
                items: [
                    { text: 'focus-outside', link: 'https://github.com/txs1992/focus-outside' },
                    { text: 'stylus-converter', link: 'https://github.com/txs1992/stylus-converter' }
                ]
            }
        ],
        // 为以下路由添加侧边栏
        sidebar: {
            '/eleTree/': [
                "",
                "1"
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
    configureWebpack: {
        resolve: {
            alias: {
                "~": path.join(__dirname, '../../src/')
            }
        }
    }
}