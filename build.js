let fs = require('fs');
let pathUtil = require('path');

let libPath = pathUtil.resolve(__dirname, './lib')
let srcPath = pathUtil.resolve(__dirname, './src/')
let distPath = pathUtil.resolve(__dirname, './dist/')
let npmPath = pathUtil.resolve(__dirname, '../messenger-npm')

let bluebird = fs.readFileSync(pathUtil.resolve(libPath, 'bluebird.min.js'),'utf8');
let content = fs.readFileSync(pathUtil.resolve(srcPath, 'main.js'),'utf8');
let content1 = fs.readFileSync(pathUtil.resolve(srcPath, 'requester.js'),'utf8');
let content2 = fs.readFileSync(pathUtil.resolve(srcPath, 'listener.js'),'utf8');
content = content+'\n'+content1+'\n'+content2;
var clean = (content) =>{
    content = content.replace(/console\.log/g, '//')
    return content;
}
let thisyear = (new Date()).getFullYear();
let finalcontent = `
/* 
* Messenger.js
* The MIT License (MIT)
* Copyright (c) 2013-${thisyear} ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/(()=>{
${content};
window.messenger=messenger;
})();
`;
let finalcontentcmd = `
define(function (require, exports, module) {
    ${content}
    module.exports = messenger;
})
`;
fs.writeFileSync(pathUtil.resolve(distPath, 'messenger.dist.js'), finalcontent); 
fs.writeFileSync(pathUtil.resolve(distPath, 'messenger.cmd.js'), finalcontentcmd); 
//fs.writeFileSync(pathUtil.resolve(distPath, 'postmessage-plus.cmd.js'), clean(content_cmd)); 
if(fs.existsSync(npmPath)){
	fs.writeFileSync(pathUtil.resolve(npmPath, 'postmessage-plus.module.js'), clean(content_module));
}else{
	console.log('can not output to:', npmPath)
}
console.log('done.')