/* 
* Messenger.js
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
define(function (require, exports, module) {
var messenger={};
(function(d){var g=function(){return(1.7*Math.random()+"-"+2.3*new Date).replace(/\./ig,"")},e=window.parent,f={},h="page-"+g();d.getPageId=function(){return h};d.getTargetWindows=function(){var a=[];a.push({is:"self",from:"self",win:window});window!==window.parent&&a.push({is:"parent",from:"child",win:window.parent});for(var b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++)a.push({is:"child",from:"parent",win:b[c].contentWindow});return a};d.setTarget=function(a){e=a;e.contentWindow&&
(e=e.contentWindow);return d};d.request=function(){for(var a=arguments[0],b=[],c=1;c<arguments.length;c++)b.push(arguments[c]);var d="messenger-"+g(),e=this.getTargetWindows();for(c=0;c<e.length;c++){var k=e[c];k.win.postMessage&&(console.log("sent-req:",a,d,k),k.win.postMessage({messengerjs:{isReq:!0,eventName:a,args:b,responseToken:d,requestPageId:h,from:k.from}},"*"))}f[d]={};return{then:function(a){f[d].cb=a}}};var b=function(a){a=a.data;a.messengerjs&&a.messengerjs.isResp&&f[a.messengerjs.responseToken]&&
f[a.messengerjs.responseToken].cb(a.messengerjs.result)};window.addEventListener?window.addEventListener("message",b):window.attachEvent&&window.attachEvent("onmessage",b)})(messenger);
(function(d){var g={},e=function(b){b=b.data;b.messengerjs&&h(b.messengerjs)},f=function(b,a){for(var e=d.getTargetWindows(),c=0;c<e.length;c++){var f=e[c];f.win.postMessage&&f.win.postMessage({messengerjs:{isResp:!0,responsePageId:d.getPageId(),responseToken:b,result:a,from:f.from}},"*")}},h=function(b){var a=b.args,d=b.responseToken,c=g[b.eventName];c&&b.isReq&&((a=c.apply(window,a))&&"function"===typeof a.then?a.then(function(a){f(d,a)}):f(d,a));if("parent"===b.from)for(a=document.getElementsByTagName("iframe"),
c=0;c<a.length;c++)b.from="parent",a[c].contentWindow.postMessage({messengerjs:b},"*");"child"===b.from&&window!==parent&&(b.from="child",window.parent.postMessage({messengerjs:b},"*"))};d.listen=function(b,a){g[b]=a};d.stopListen=function(b){delete g[b]};window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e);console.log("listening...")})(messenger);
module.exports = messenger;
})