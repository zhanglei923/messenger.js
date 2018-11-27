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