var webpack = require('webpack');
var pathutil = require('path');
var _ = require('lodash');

var masterConfig = {
    devtool: 'eval-source-map',
    module: {
        // loaders: [
        // ]
    },
    entry: {
        'js-sdk-rk': ['./src/main.js'],
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