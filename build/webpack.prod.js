const webpack = require('webpack')
const package = require('../package.json');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const banner = `
@name: ${package.name}
@version: ${package.version}
@description: ${package.description}
@author: ${package.author}
@license: ${package.license}
@repository: ${package.repository}
`

module.exports = merge(common, {
    entry: {
        main: './src/entry.ts'
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin(banner)
    ],
    // optimization: {
    //     // 分割代码块
    //     splitChunks: {
    //         // 缓存分组
    //         cacheGroups: {
    //             // 第三方模块
    //             vendor: {
    //                 priority: 1, // 权限更高，优先抽离，重要！！！
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 minSize: 0,  // 大小限制
    //                 minChunks: 1  // 最少复用过几次
    //             }
    //         }
    //     }
    // }
})
