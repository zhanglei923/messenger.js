/* 
* Messenger.js 
* v0.8.4
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
import md5 from 'blueimp-md5'
window.md5=md5;
"use strict";var messenger={},md5_util=window.md5;function encodeStr(e){for(var n=e.length/2,t=e.substring(0,n),s=e.substring(n),r=t.split("").reverse(),i=s.split("").reverse(),o=[].concat(r).concat(i),a=(md5_util(""+Math.random()+new Date)+md5_util(""+Math.random()+new Date)).split(""),d=(md5_util(""+Math.random()+new Date)+md5_util(""+Math.random()+new Date)).split(""),g=[],f=0;f<o.length;f++)g.push(a[f]+o[f]+d[f]);return g.join("")}function decodeStr(e){for(var n=e.split("").reverse(),t=1,s="";t;)n.shift(),(t=n.shift())&&(s+=t),n.shift();var r=s.length/2,i=s.substring(0,r),o=s.substring(r),a=i.split("");return s=o.split("").join("")+a.join("")}new Promise(function(e,n){}),function(n){var a=function(){var e=1.7*Math.random()+"-"+2.3*new Date;return md5_util(e.replace(/\./gi,""))},t=window.parent,d={},g=""+a();n.getPageId=function(){return g},n.getTargetWindows=function(){var e=[];e.push({is:"self",from:"self",win:window}),window!==window.parent&&e.push({is:"parent",from:"child",win:window.parent});for(var n=document.getElementsByTagName("iframe"),t=0;t<n.length;t++)e.push({is:"child",from:"parent",win:n[t].contentWindow});return e},n.setTarget=function(e){return(t=e).contentWindow&&(t=t.contentWindow),n},n.emit=function(){var e=arguments[0];e=md5_util(e);for(var n=[],t=1;t<arguments.length;t++)n.push(arguments[t]);var s=""+a(),r=this.getTargetWindows();for(t=0;t<r.length;t++){var i=r[t];if(i.win.postMessage){("sent-req:",e,s,i);var o={messengerjs:{isReq:!0,eventName:e,args:n,responseToken:s,requestPageId:g,from:i.from}};o=JSON.parse(JSON.stringify(o)),i.win.postMessage(o,"*")}}return d[s]={receiveCount:0},{then:function(e){d[s].cb=e}}};var e=function(e){if((e=e.data)&&e.messengerjs){var n=decodeStr(e.messengerjs.responseToken);e.messengerjs&&e.messengerjs.isResp&&d[n]&&s(n,e.messengerjs)}},s=function(e,n){var t=n.result,s=++d[e].receiveCount;d[e].cb&&d[e].cb(t,{count:s,stopReceive:function(){delete d[e]}})};window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e)}(messenger),function(o){var g={},e=function(e){(e=e.data)&&e.messengerjs&&n(e.messengerjs)},f=function(e,n){for(var t=o.getTargetWindows(),s=0;s<t.length;s++){var r=t[s];if(r.win.postMessage){var i={messengerjs:{isResp:!0,responsePageId:o.getPageId(),responseToken:encodeStr(e),result:n,from:r.from}};i=JSON.parse(JSON.stringify(i)),r.win.postMessage(i,"*")}}},n=function(e){var n=e.args,t=e.eventName,s=e.responseToken,r=g[t];if(r&&e.isReq){var i=r.apply(window,n);i&&"function"==typeof i.then?i.then(function(e){f(s,e)}):f(s,i)}if("parent"===e.from)for(var o=document.getElementsByTagName("iframe"),a=0;a<o.length;a++){e.from="parent";var d={messengerjs:e};d=JSON.parse(JSON.stringify(d)),o[a].contentWindow.postMessage(d,"*")}if("child"===e.from&&window!==window.parent){e.from="child";d={messengerjs:e};d=JSON.parse(JSON.stringify(d)),window.parent.postMessage(d,"*")}};o.listen=function(e,n){e=md5_util(e),g[e]=n},o.stopListen=function(e){e=md5_util(e),delete g[e]},window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e),("listening...")}(messenger);;
export default messenger;
