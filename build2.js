let webpack = require('webpack')
let _ = require('lodash')
let pathutil = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = {
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
let compiler = webpack(config);
compiler.run((err, stats) => {
    console.log('err', err)
});

let config_p = {
    mode: 'production',
    output:{
        filename: '[name].min.js'
    },
    optimization:{
        minimize: false,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    sourceMap: false,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: true,
                    keep_fnames: false,
                  }
            })
        ],
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
    }
};
config_p = _.extend(config, config_p)
let compiler_p = webpack(config_p)
compiler_p.run((err, stats) => {
    console.log('err_p', err)
});