const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const apiMocker = require('mocker-api')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    entry: {
        test: './src/dev/index.js'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: '../dist',
        port: 3002,
        before (app) {
            apiMocker(app, path.resolve('./src/mock/tree.js'))
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'eleTree',
            template: 'src/dev/index.html'
        })
    ],
})