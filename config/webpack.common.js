const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {test: /\.scss$/,use: ["style-loader", "css-loader", "sass-loader"]}
        ],
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'eleTree'
        })
    ]
}