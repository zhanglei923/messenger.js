/* 
* Messenger.js 
* v0.8.9
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
import md5 from 'blueimp-md5'
"use strict";var messenger={},a06946040966442326=md5;function doPostMessage(e,n,t,s){if(e.postMessage){var r=n.messengerjs;delete r.isReq,delete r.isResp,delete r.from,r.isReq=void 0,r.isResp=void 0,r.from=void 0,r=JSON.parse(JSON.stringify(r));var o={};for(var i in r)"isReq"!==i&&"isResp"!==i&&"from"!==i&&(o[i]=r[i]);var a={messengerjs:o};e.postMessage(a,t,s)}}function encodeStr(e){for(var n=e.length/2,t=e.substring(0,n),s=e.substring(n),r=t.split("").reverse(),o=s.split("").reverse(),i=[].concat(r).concat(o),a=(a06946040966442326(""+Math.random()+new Date)+a06946040966442326(""+Math.random()+new Date)).split(""),d=(a06946040966442326(""+Math.random()+new Date)+a06946040966442326(""+Math.random()+new Date)).split(""),f=[],m=0;m<i.length;m++)f.push(a[m]+i[m]+d[m]);return f.join("")}function decodeStr(e){for(var n=e.split("").reverse(),t=1,s="";t;)n.shift(),(t=n.shift())&&(s+=t),n.shift();var r=s.length/2,o=s.substring(0,r),i=s.substring(r),a=o.split("");return s=i.split("").join("")+a.join("")}function makeRandomAlphabet(e){var n="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",s=t.toUpperCase(),r=t.toLowerCase(),o=s+r;return void 0!==e&&"upper"===e&&(o=s),void 0!==e&&"lower"===e&&(o=r),n+=o.charAt(Math.floor(Math.random()*o.length))}function makeRandomNumber(){var e="",n="0123456789";return e+=n.charAt(Math.floor(Math.random()*n.length))}function makeRespCode(){return makeRandomAlphabet()}function isRespCode(e){var n=e.substring(0,1);return/\b[a-zA-Z]\b/.test(n)}function makeReqCode(){return makeRandomNumber()}function isReqCode(e){var n=e.substring(0,1);return/\b[0-9]\b/.test(n)}function encryptFromCode(e){return"self"===e?0:"child"===e?1:"parent"===e?2:void 0}function decryptFromCode(e){var n=e.substring(1,2);return"0"===n?"self":"1"===n?"child":"2"===n?"parent":void 0}function encryptMessageData(e,n){if(n.isResp){var t=makeRespCode();e.info=""+t}if(n.isReq){var s=makeReqCode();e.info=""+s}var r=encryptFromCode(n.from);return e.info=e.info+r,e}function decryptMessageData(e){var n=isRespCode(e.info),t=isReqCode(e.info),s={};return n&&(s.isResp=!0),t&&(s.isReq=!0),s.from=decryptFromCode(e.info),s}new Promise(function(e,n){}),function(n){var a=function(){var e=1.7*Math.random()+"-"+2.3*new Date;return a06946040966442326(e.replace(/\./gi,""))},t=window.parent,d={},f=""+a();n.getPageId=function(){return f},n.getTargetWindows=function(){var e=[];e.push({is:"self",from:"self",win:window}),window!==window.parent&&e.push({is:"parent",from:"child",win:window.parent});for(var n=document.getElementsByTagName("iframe"),t=0;t<n.length;t++)e.push({is:"child",from:"parent",win:n[t].contentWindow});return e},n.setTarget=function(e){return(t=e).contentWindow&&(t=t.contentWindow),n},n.emit=function(){var e=arguments[0];e=a06946040966442326(e);for(var n=[],t=1;t<arguments.length;t++)n.push(arguments[t]);var s=""+a(),r=this.getTargetWindows();for(t=0;t<r.length;t++){var o=r[t];("sent-req:",e,s,o);var i={messengerjs:{eventName:e,args:n,responseToken:s,requestPageId:f}};i.messengerjs=encryptMessageData(i.messengerjs,{isReq:!0,from:o.from}),i=JSON.parse(JSON.stringify(i)),doPostMessage(o.win,i,"*")}return d[s]={receiveCount:0},{onResponse:function(e){d[s].cb=e}}};var e=function(e){if((e=e.data)&&e.messengerjs){var n=decodeStr(e.messengerjs.responseToken);if(e.messengerjs&&e.messengerjs.info)decryptMessageData(e.messengerjs).isResp&&d[n]&&s(n,e.messengerjs)}},s=function(e,n){var t=n.result,s=++d[e].receiveCount;d[e].cb&&d[e].cb(t,{count:s,stopReceive:function(){delete d[e]}})};window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e)}(messenger),function(i){var m={},e=function(e){(e=e.data)&&e.messengerjs&&n(e.messengerjs)},g=function(e,n){for(var t=i.getTargetWindows(),s=0;s<t.length;s++){var r=t[s],o={messengerjs:{responsePageId:i.getPageId(),responseToken:encodeStr(e),result:n}};o.messengerjs=encryptMessageData(o.messengerjs,{isResp:!0,from:r.from}),o=JSON.parse(JSON.stringify(o)),doPostMessage(r.win,o,"*")}},n=function(e){var n=e.args,t=e.eventName,s=e.responseToken,r=m[t],o=decryptMessageData(e);if(r&&e&&o.isReq){var i=r.apply(window,n);i&&"function"==typeof i.then?i.then(function(e){g(s,e)}):g(s,i)}if("parent"===o.from)for(var a=document.getElementsByTagName("iframe"),d=0;d<a.length;d++){o.from="parent";var f={messengerjs:e};f=JSON.parse(JSON.stringify(f)),doPostMessage(a[d].contentWindow,f,"*")}if("child"===o.from&&window!==window.parent){o.from="child";f={messengerjs:e};f=JSON.parse(JSON.stringify(f)),doPostMessage(window.parent,f,"*")}};i.listen=function(e,n){e=a06946040966442326(e),m[e]=n},i.stopListen=function(e){e=a06946040966442326(e),delete m[e]},window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e),("listening...")}(messenger);;
export default messenger;
