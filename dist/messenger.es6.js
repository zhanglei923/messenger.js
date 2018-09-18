/* 
* Messenger.js 
* v0.8.9
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
import md5 from 'blueimp-md5'
"use strict";var messenger={},a049282353026491443=md5;function doPostMessage(e,n,s,t){if(e.postMessage){var r=n.messengerjs;delete r.isReq,delete r.isResp,delete r.from,r.isReq=void 0,r.isResp=void 0,r.from=void 0,r=JSON.parse(JSON.stringify(r));var o={};for(var i in r)"isReq"!==i&&"isResp"!==i&&"from"!==i&&(o[i]=r[i]);var a={messengerjs:o};e.postMessage(a,s,t)}}function encodeStr(e){for(var n=e.length/2,s=e.substring(0,n),t=e.substring(n),r=s.split("").reverse(),o=t.split("").reverse(),i=[].concat(r).concat(o),a=(a049282353026491443(""+Math.random()+new Date)+a049282353026491443(""+Math.random()+new Date)).split(""),d=(a049282353026491443(""+Math.random()+new Date)+a049282353026491443(""+Math.random()+new Date)).split(""),f=[],g=0;g<i.length;g++)f.push(a[g]+i[g]+d[g]);return f.join("")}function decodeStr(e){for(var n=e.split("").reverse(),s=1,t="";s;)n.shift(),(s=n.shift())&&(t+=s),n.shift();var r=t.length/2,o=t.substring(0,r),i=t.substring(r),a=o.split("");return t=i.split("").join("")+a.join("")}function makeRandomAlphabet(e){var n="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZ",t=s.toUpperCase(),r=s.toLowerCase(),o=t+r;return void 0!==e&&"upper"===e&&(o=t),void 0!==e&&"lower"===e&&(o=r),n+=o.charAt(Math.floor(Math.random()*o.length))}function makeRandomNumber(){var e="",n="0123456789";return e+=n.charAt(Math.floor(Math.random()*n.length))}function makeRespCode(){return makeRandomAlphabet()}function isRespCode(e){var n=e.substring(0,1);return/\b[a-zA-Z]\b/.test(n)}function makeReqCode(){return makeRandomNumber()}function isReqCode(e){var n=e.substring(0,1);return/\b[0-9]\b/.test(n)}function encryptFromCode(e,n){return"self"===n?0:"child"===n?1:"parent"===n?2:void 0}function decryptFromCode(e,n){var s=n.substring(1,2);return"0"===s?"self":"1"===s?"child":"2"===s?"parent":void 0}function encryptMessageData(e,n){var s=n.isResp,t=n.isReq;if(n.isResp){s=makeRespCode();e.info=""+s}if(n.isReq){t=makeReqCode();e.info=""+t}var r=encryptFromCode({isReq:t,isResp:s},n.from);return e.info=e.info+r,t&&(e.info=e.info+e.requestPageId),s&&(e.info=e.info+e.responsePageId),e}function decryptMessageData(e){var n=isRespCode(e.info),s=isReqCode(e.info),t={};n&&(t.isResp=!0),s&&(t.isReq=!0),t.from=decryptFromCode({isReq:s,isResp:n},e.info);var r=e.info.substring(2,34);return s&&(t.requestPageId=r),n&&(t.responsePageId=r),t}new Promise(function(e,n){}),function(n){var a=function(){var e=1.7*Math.random()+"-"+2.3*new Date;return a049282353026491443(e.replace(/\./gi,""))},s=window.parent,d={},f=""+a();n.getPageId=function(){return f},n.getTargetWindows=function(){var e=[];e.push({is:"self",from:"self",win:window}),window!==window.parent&&e.push({is:"parent",from:"child",win:window.parent});for(var n=document.getElementsByTagName("iframe"),s=0;s<n.length;s++)e.push({is:"child",from:"parent",win:n[s].contentWindow});return e},n.setTarget=function(e){return(s=e).contentWindow&&(s=s.contentWindow),n},n.emit=function(){var e=arguments[0];e=a049282353026491443(e);for(var n=[],s=1;s<arguments.length;s++)n.push(arguments[s]);var t=""+a(),r=this.getTargetWindows();for(s=0;s<r.length;s++){var o=r[s];("sent-req:",e,t,o);var i={messengerjs:{eventName:e,args:n,responseToken:t,requestPageId:f}};i.messengerjs=encryptMessageData(i.messengerjs,{isReq:!0,from:o.from}),i=JSON.parse(JSON.stringify(i)),doPostMessage(o.win,i,"*")}return d[t]={receiveCount:0},{onResponse:function(e){d[t].cb=e}}};var e=function(e){if((e=e.data)&&e.messengerjs){var n=decodeStr(e.messengerjs.responseToken);if(e.messengerjs&&e.messengerjs.info)decryptMessageData(e.messengerjs).isResp&&d[n]&&t(n,e.messengerjs)}},t=function(e,n){var s=n.result,t=++d[e].receiveCount;d[e].cb&&d[e].cb(s,{count:t,stopReceive:function(){delete d[e]}})};window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e)}(messenger),function(i){var g={},e=function(e){(e=e.data)&&e.messengerjs&&n(e.messengerjs)},m=function(e,n){for(var s=i.getTargetWindows(),t=0;t<s.length;t++){var r=s[t],o={messengerjs:{responsePageId:i.getPageId(),responseToken:encodeStr(e),result:n}};o.messengerjs=encryptMessageData(o.messengerjs,{isResp:!0,from:r.from}),o=JSON.parse(JSON.stringify(o)),doPostMessage(r.win,o,"*")}},n=function(e){var n=e.args,s=e.eventName,t=e.responseToken,r=g[s],o=decryptMessageData(e);if(r&&e&&o.isReq){var i=r.apply(window,n);i&&"function"==typeof i.then?i.then(function(e){m(t,e)}):m(t,i)}if("parent"===o.from)for(var a=document.getElementsByTagName("iframe"),d=0;d<a.length;d++){o.from="parent";var f={messengerjs:e};f=JSON.parse(JSON.stringify(f)),doPostMessage(a[d].contentWindow,f,"*")}if("child"===o.from&&window!==window.parent){o.from="child";f={messengerjs:e};f=JSON.parse(JSON.stringify(f)),doPostMessage(window.parent,f,"*")}};i.listen=function(e,n){e=a049282353026491443(e),g[e]=n},i.stopListen=function(e){e=a049282353026491443(e),delete g[e]},window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e),("listening...")}(messenger);;
export default messenger;
