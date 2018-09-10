let fs = require('fs');
let pathUtil = require('path');
var compressor = require('node-minify');
var md5src = fs.readFileSync(pathUtil.resolve(__dirname, './lib/md5.min.js'),'utf8');
var es6_downgrade_util = require('./lib/es6_downgrade_util')

let srcPath = pathUtil.resolve(__dirname, './src/')
let distPath = pathUtil.resolve(__dirname, './dist/')
let npmPath = pathUtil.resolve(__dirname, '../messengerjs-npm')

var clean = (content) =>{
    content = content.replace(/console\.log/g, '')
    return content;
}
let content = fs.readFileSync(pathUtil.resolve(srcPath, 'main.js'),'utf8');
let contentRequester = fs.readFileSync(pathUtil.resolve(srcPath, 'requester.js'),'utf8');
let contentListener = fs.readFileSync(pathUtil.resolve(srcPath, 'listener.js'),'utf8');
content = content+'\n'+contentRequester+'\n'+contentListener;
content = es6_downgrade_util.update(content);
fs.writeFileSync(pathUtil.resolve(distPath, 'messenger.src.js'), content); 

let thisyear = (new Date()).getFullYear();
let version = 'v0.7.4'
let license = 
`/* 
* Messenger.js 
* ${version}
* The MIT License (MIT)
* Copyright (c) 2013-${thisyear} ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/`
var promise = compressor.minify({
    compressor: 'uglifyjs',
    input: pathUtil.resolve(distPath, 'messenger.src.js'),
    output: pathUtil.resolve(distPath, 'temp_min.js'),
    callback: function(err, min) {}
});
let mincontent;
let mincontentcmd;
promise.then((min) => {
    min = min.replace(/md5\_util/g, ('a'+Math.random()).replace(/\./ig, ''))
    min = min.replace(/getEncrypedResponseToken/g, ('a'+Math.random()).replace(/\./ig, ''))
    
    min = clean(min)
    mincontent = 
`${license}
(()=>{
${md5src}
//--
${min};window.messenger=messenger;
})();`;
    mincontentcmd = 
`${license}
define(function (require, exports, module) {
${md5src}
//--
${min};module.exports = messenger;
})`;
    fs.writeFileSync(pathUtil.resolve(distPath, 'messenger.min.js'), mincontent); 
    fs.writeFileSync(pathUtil.resolve(distPath, 'messenger.cmd.js'), mincontentcmd); 
    //fs.writeFileSync(pathUtil.resolve(distPath, 'postmessage-plus.cmd.js'), clean(content_cmd)); 
    if(fs.existsSync(npmPath)){
        fs.writeFileSync(pathUtil.resolve(npmPath, 'messenger.min.js'), mincontent);
    }else{
        console.log('can not output to:', npmPath)
    }
    console.log('done.')


});