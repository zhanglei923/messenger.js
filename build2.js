let webpack = require('webpack')
let _ = require('lodash')
let pathutil = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = {
    mode: 'development', //production
    devtool: 'eval-source-map',
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
        new UglifyJsPlugin()
    ],
    optimization: {
        minimizer: []
    }
}
let compiler = webpack(config);
compiler.run((err, stats) => {
    console.log('err', err)
});

let config_p = {
    mode: 'production',
    output:{
        filename: '[name].min.js'
    }
};
config_p = _.extend(config, config_p)
let compiler_p = webpack(config_p)
compiler_p.run((err, stats) => {
    console.log('err_p', err)
});