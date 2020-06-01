const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
    entry: {
        main: './src/index.js',
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        // new UglifyJSPlugin()
    ]
})