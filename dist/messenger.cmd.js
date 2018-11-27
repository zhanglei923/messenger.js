/* 
* Messenger.js 
* v0.8.12
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
//--
;/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
;define(function (require, exports, module) {
"use strict";var a0771856944962908=md5,messenger={doPostMessage:function(e,n,s,t){if(e.postMessage){var r=n.messengerjs;delete r.isReq,delete r.isResp,delete r.from,r.isReq=void 0,r.isResp=void 0,r.from=void 0,r=JSON.parse(JSON.stringify(r));var i={};for(var o in r)"isReq"!==o&&"isResp"!==o&&"from"!==o&&(i[o]=r[o]);var a={messengerjs:i};e.postMessage(a,s,t)}}},encrypt={};!function(){function p(e){for(var n=e.length/2,s=e.substring(0,n),t=e.substring(n),r=s.split("").reverse(),i=t.split("").reverse(),o=[].concat(r).concat(i),a=((a0771856944962908(""+Math.random()+new Date)+a0771856944962908(""+Math.random()+new Date)).split(""),(a0771856944962908(""+Math.random()+new Date)+a0771856944962908(""+Math.random()+new Date)).split(""),[]),g=0;g<o.length;g++)a.push(v()+o[g]+v());return a.join("")}function w(e){for(var n=e.split("").reverse(),s=1,t="";s;)n.shift(),(s=n.shift())&&(t+=s),n.shift();var r=t.length/2,i=t.substring(0,r),o=t.substring(r),a=i.split("");return t=o.split("").join("")+a.join("")}function v(e){var n="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZ",t=s.toUpperCase(),r=s.toLowerCase(),i=t+r;return void 0!==e&&"upper"===e&&(i=t),void 0!==e&&"lower"===e&&(i=r),n+=i.charAt(Math.floor(Math.random()*i.length))}function l(){return e="",e+=(n="0123456789").charAt(Math.floor(Math.random()*n.length));var e,n}var h=a0771856944962908(new Date+"");encrypt.encodeStr=p,encrypt.decodeStr=w,encrypt.encryptMessageData=function(e,n){var s=n.isResp,t=n.isReq;n.isResp&&(s=v(),e.info=""+s);n.isReq&&(t=l(),e.info=""+t);var r,i="self"===(r=n.from)?0:"child"===r?1:"parent"===r?2:void 0;e.info+=i,t&&(e.info+=n.requestPageId),s&&(e.info+=n.responsePageId);var o=n.responseToken,a=o.length,g=void 0;32===a&&(g=32),96===a&&(g=96),32===a&&(o=o+a0771856944962908(Math.random())+a0771856944962908(Math.random())),e.info+=g+o;var d,f,u,c=!!n.eventName,m=a0771856944962908(Math.random());return e.info+=(c?"1":"0")+(c?n.eventName:m),e.info=(d=e.info,f=d.split(""),u=(f=f.reverse()).join(""),u=p(u+="z"),u=h+u),e},encrypt.decryptMessageData=function(e){e.info=function(e){if(0!==e.indexOf(h))return e;var n=(e=(e=w(e=e.substring(h.length))).substring(0,e.length-1)).split("");return(n=n.reverse()).join("")}(e.info);var n,s,t,r,i,o,a=(n=e.info,s=n.substring(0,1),/\b[a-zA-Z]\b/.test(s)),g=(t=e.info,r=t.substring(0,1),/\b[0-9]\b/.test(r)),d={};a&&(d.isResp=!0),g&&(d.isReq=!0),d.from=(i=e.info,"0"===(o=i.substring(1,2))?"self":"1"===o?"child":"2"===o?"parent":void 0);var f=e.info.substring(2),u=f.substring(0,32);f=f.substring(32),g&&(d.requestPageId=u),a&&(d.responsePageId=u);var c=f.substring(0,2);f=f.substring(2);var m=parseInt(c),p=f.substring(0,96);f=f.substring(96),32===m&&(p=p.substring(0,m)),d.responseToken=p;var v="1"===f.substring(0,1),l=(f=f.substring(1)).substring(0,32);return f=f.substring(32),v&&(d.eventName=l),d}}(),function(a){var g=function(){var e=1.7*Math.random()+"-"+2.3*new Date;return a0771856944962908(e.replace(/\./gi,""))},n=window.parent,d={},f=""+g();a.getPageId=function(){return f},a.getTargetWindows=function(){var e=[];e.push({is:"self",from:"self",win:window}),window!==window.parent&&e.push({is:"parent",from:"child",win:window.parent});for(var n=document.getElementsByTagName("iframe"),s=0;s<n.length;s++)e.push({is:"child",from:"parent",win:n[s].contentWindow});return e},a.setTarget=function(e){return(n=e).contentWindow&&(n=n.contentWindow),a},a.emit=function(){var e=arguments[0];e=a0771856944962908(e);for(var n=[],s=1;s<arguments.length;s++)n.push(arguments[s]);var t=""+g(),r=this.getTargetWindows();for(s=0;s<r.length;s++){var i=r[s];("sent-req:",e,t,i);var o={messengerjs:{args:n}};o.messengerjs=encrypt.encryptMessageData(o.messengerjs,{eventName:e,isReq:!0,from:i.from,requestPageId:f,responseToken:t}),o=JSON.parse(JSON.stringify(o)),a.doPostMessage(i.win,o,"*")}return d[t]={receiveCount:0},{onResponse:function(e){d[t].cb=e}}};var e=function(e){if((e=e.data)&&e.messengerjs){var n=encrypt.decryptMessageData(e.messengerjs),s=encrypt.decodeStr(n.responseToken);e.messengerjs&&e.messengerjs.info&&n.isResp&&d[s]&&t(s,e.messengerjs)}},t=function(e,n){var s=n.result,t=++d[e].receiveCount;d[e].cb&&d[e].cb(s,{count:t,stopReceive:function(){delete d[e]}})};window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e)}(messenger),function(f){var u={},e=function(e){(e=e.data)&&e.messengerjs&&n(e.messengerjs)},c=function(e,n){for(var s=f.getTargetWindows(),t=0;t<s.length;t++){var r=s[t],i={messengerjs:{result:n}};i.messengerjs=encrypt.encryptMessageData(i.messengerjs,{isResp:!0,from:r.from,responsePageId:f.getPageId(),responseToken:encrypt.encodeStr(e)}),i=JSON.parse(JSON.stringify(i)),f.doPostMessage(r.win,i,"*")}},n=function(e){var n=e.args,s=encrypt.decryptMessageData(e),t=s.eventName,r=s.responseToken,i=u[t];if(i&&e&&s.isReq){var o=i.apply(window,n);o&&"function"==typeof o.then?o.then(function(e){c(r,e)}):c(r,o)}if("parent"===s.from)for(var a=document.getElementsByTagName("iframe"),g=0;g<a.length;g++){s.from="parent";var d={messengerjs:e};d=JSON.parse(JSON.stringify(d)),f.doPostMessage(a[g].contentWindow,d,"*")}if("child"===s.from&&window!==window.parent){s.from="child";d={messengerjs:e};d=JSON.parse(JSON.stringify(d)),f.doPostMessage(window.parent,d,"*")}};f.listen=function(e,n){e=a0771856944962908(e),u[e]=n},f.stopListen=function(e){e=a0771856944962908(e),delete u[e]},window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e),("listening...")}(messenger);;module.exports = messenger;
})