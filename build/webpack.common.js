const path = require('path')

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'eleTree.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {test: /\.scss$/,use: ["style-loader", "css-loader", "sass-loader"]},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        "plugins": [
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                }
            }
        ],
    },
    resolve: {
        alias: {
            "~": path.join(__dirname, '../src/')
        }
    },
}