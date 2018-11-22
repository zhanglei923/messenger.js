var webpack = require('webpack');
var pathutil = require('path');
var _ = require('lodash');

var masterConfig = {
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
    ]
}

var config1 = _.cloneDeep(masterConfig);

module.exports = [config1];