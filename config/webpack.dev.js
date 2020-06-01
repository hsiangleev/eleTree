const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    entry: {
        test: './test/test.js'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: '../dist',
        port: 3000
    },
})