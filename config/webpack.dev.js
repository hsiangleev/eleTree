const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const apiMocker = require('mocker-api')
const path = require('path')

module.exports = merge(common, {
    entry: {
        test: './test/test.js'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: '../dist',
        port: 3000,
        before (app) {
            apiMocker(app, path.resolve('./src/mock/tree.js'))
        }
    },
})