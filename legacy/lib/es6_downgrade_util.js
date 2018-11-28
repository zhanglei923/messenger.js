var fs = require('fs');
var pathutil = require('path');
var babel = require("babel-core");
var _ = require('lodash')
// npm install babel-preset-env --save-dev
module.exports = {
    update: function (script, filepath){
        var jsContent = script;
        try{
          var result = babel.transform(script, {
                sourceMap: true,
                presets: ["env"],
                //presets: ['./node_modules/babel-preset-es2015'],
                //plugins: ["transform-runtime", ],
                code:true
          })
          jsContent = `${result.code}`;
        }catch(e){
          console.log('Error File:', filepath)
          console.log('  Warn: failed at transform es6:', e)
        }
        return jsContent;
    }
}