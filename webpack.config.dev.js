let webpack = require('webpack')
let _ = require('lodash')
let pathutil = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development', //production
    devtool: 'eval-source-map',
    target: "web", // enum
    module: {
        // loaders: [
        // ]
    },
    entry: {
        'bundle': ['./src2/main.js'],
    },
    output: {
        path: pathutil.resolve(__dirname, "./dist/"),
        filename: '[name].js'
    },
    plugins: [
        new UglifyJsPlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000 // Minimum number of characters
          })
    ]
}