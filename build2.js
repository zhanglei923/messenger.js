let webpack = require('webpack')
let _ = require('lodash')
let pathutil = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = require('./webpack.config.dev')
let compiler = webpack(config);
compiler.run((err, stats) => {
    console.log('err', err)
});

config = require('./webpack.config.product')
let compiler_p = webpack(config)
compiler_p.run((err, stats) => {
    console.log('err_p', err)
});