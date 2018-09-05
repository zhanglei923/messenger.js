
   define(function (require, exports, module) {
    /* 
    * Messenger.js
    * The MIT License (MIT)
    * Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
    * https://github.com/zhanglei923/messenger.js
    */
    var messenger={};window.messenger=messenger;
(function(){var g=function(){return(1.7*Math.random()+"-"+2.3*new Date).replace(/\./ig,"")},d=window.parent,f={},h="page-"+g();messenger.getPageId=function(){return h};messenger.getTargetWindows=function(){var a=[];a.push({is:"self",from:"self",win:window});window!==window.parent&&a.push({is:"parent",from:"child",win:window.parent});for(var b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++)a.push({is:"child",from:"parent",win:b[c].contentWindow});return a};messenger.setTarget=function(a){d=
a;d.contentWindow&&(d=d.contentWindow);return window.messenger};messenger.request=function(){for(var a=arguments[0],b=[],c=1;c<arguments.length;c++)b.push(arguments[c]);var e="messenger-"+g(),d=this.getTargetWindows();for(c=0;c<d.length;c++){var k=d[c];k.win.postMessage&&(console.log("sent-req:",a,e,k),k.win.postMessage({messengerjs:{isReq:!0,eventName:a,args:b,responseToken:e,requestPageId:h,from:k.from}},"*"))}f[e]={};return{then:function(a){f[e].cb=a}}};var b=function(a){a=a.data;a.messengerjs&&
a.messengerjs.isResp&&f[a.messengerjs.responseToken]&&f[a.messengerjs.responseToken].cb(a.messengerjs.result)};window.addEventListener?window.addEventListener("message",b):window.attachEvent&&window.attachEvent("onmessage",b)})();
(function(){var g={},d=function(b){b=b.data;b.messengerjs&&h(b.messengerjs)},f=function(b,a){for(var d=window.messenger.getTargetWindows(),c=0;c<d.length;c++){var e=d[c];e.win.postMessage&&e.win.postMessage({messengerjs:{isResp:!0,responsePageId:messenger.getPageId(),responseToken:b,result:a,from:e.from}},"*")}},h=function(b){var a=b.args,d=b.responseToken,c=g[b.eventName];c&&b.isReq&&((a=c.apply(window,a))&&"function"===typeof a.then?a.then(function(a){f(d,a)}):f(d,a));if("parent"===b.from)for(a=
document.getElementsByTagName("iframe"),c=0;c<a.length;c++)b.from="parent",a[c].contentWindow.postMessage({messengerjs:b},"*");"child"===b.from&&window!==parent&&(b.from="child",window.parent.postMessage({messengerjs:b},"*"))};window.messenger.listen=function(b,a){g[b]=a};window.messenger.stopListen=function(b){delete g[b]};window.addEventListener?window.addEventListener("message",d):window.attachEvent&&window.attachEvent("onmessage",d);console.log("listening...")})();
    module.exports = messenger;
    })