let webpack = require('webpack')
let pathutil = require('path')
//console.log(webpack)

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
        filename: '[name]2.js'
    },
    plugins: [
    ]
}
let compiler = webpack(config);
compiler.run((err, stats) => {
    console.log('err', err)
});

let config_p = config;
config_p.mode = 'production'
config_p.output.filename = '[name].min.js'
let compiler_p = webpack(config_p)
compiler_p.run((err, stats) => {
    console.log('err_p', err)
});