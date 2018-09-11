/* 
* Messenger.js 
* v0.8.4
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
//--
/*
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
define(function (require, exports, module) {
"use strict";var messenger={},a09141600933055478=md5;function encodeStr(e){for(var n=e.length/2,t=e.substring(0,n),s=e.substring(n),r=t.split("").reverse(),i=s.split("").reverse(),o=[].concat(r).concat(i),a=(a09141600933055478(""+Math.random()+new Date)+a09141600933055478(""+Math.random()+new Date)).split(""),d=(a09141600933055478(""+Math.random()+new Date)+a09141600933055478(""+Math.random()+new Date)).split(""),g=[],f=0;f<o.length;f++)g.push(a[f]+o[f]+d[f]);return g.join("")}function decodeStr(e){for(var n=e.split("").reverse(),t=1,s="";t;)n.shift(),(t=n.shift())&&(s+=t),n.shift();var r=s.length/2,i=s.substring(0,r),o=s.substring(r),a=i.split("");return s=o.split("").join("")+a.join("")}new Promise(function(e,n){}),function(n){var a=function(){var e=1.7*Math.random()+"-"+2.3*new Date;return a09141600933055478(e.replace(/\./gi,""))},t=window.parent,d={},g=""+a();n.getPageId=function(){return g},n.getTargetWindows=function(){var e=[];e.push({is:"self",from:"self",win:window}),window!==window.parent&&e.push({is:"parent",from:"child",win:window.parent});for(var n=document.getElementsByTagName("iframe"),t=0;t<n.length;t++)e.push({is:"child",from:"parent",win:n[t].contentWindow});return e},n.setTarget=function(e){return(t=e).contentWindow&&(t=t.contentWindow),n},n.emit=function(){var e=arguments[0];e=a09141600933055478(e);for(var n=[],t=1;t<arguments.length;t++)n.push(arguments[t]);var s=""+a(),r=this.getTargetWindows();for(t=0;t<r.length;t++){var i=r[t];if(i.win.postMessage){("sent-req:",e,s,i);var o={messengerjs:{isReq:!0,eventName:e,args:n,responseToken:s,requestPageId:g,from:i.from}};o=JSON.parse(JSON.stringify(o)),i.win.postMessage(o,"*")}}return d[s]={receiveCount:0},{then:function(e){d[s].cb=e}}};var e=function(e){if((e=e.data)&&e.messengerjs){var n=decodeStr(e.messengerjs.responseToken);e.messengerjs&&e.messengerjs.isResp&&d[n]&&s(n,e.messengerjs)}},s=function(e,n){var t=n.result,s=++d[e].receiveCount;d[e].cb&&d[e].cb(t,{count:s,stopReceive:function(){delete d[e]}})};window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e)}(messenger),function(o){var g={},e=function(e){(e=e.data)&&e.messengerjs&&n(e.messengerjs)},f=function(e,n){for(var t=o.getTargetWindows(),s=0;s<t.length;s++){var r=t[s];if(r.win.postMessage){var i={messengerjs:{isResp:!0,responsePageId:o.getPageId(),responseToken:encodeStr(e),result:n,from:r.from}};i=JSON.parse(JSON.stringify(i)),r.win.postMessage(i,"*")}}},n=function(e){var n=e.args,t=e.eventName,s=e.responseToken,r=g[t];if(r&&e.isReq){var i=r.apply(window,n);i&&"function"==typeof i.then?i.then(function(e){f(s,e)}):f(s,i)}if("parent"===e.from)for(var o=document.getElementsByTagName("iframe"),a=0;a<o.length;a++){e.from="parent";var d={messengerjs:e};d=JSON.parse(JSON.stringify(d)),o[a].contentWindow.postMessage(d,"*")}if("child"===e.from&&window!==window.parent){e.from="child";d={messengerjs:e};d=JSON.parse(JSON.stringify(d)),window.parent.postMessage(d,"*")}};o.listen=function(e,n){e=a09141600933055478(e),g[e]=n},o.stopListen=function(e){e=a09141600933055478(e),delete g[e]},window.addEventListener?window.addEventListener("message",e):window.attachEvent&&window.attachEvent("onmessage",e),("listening...")}(messenger);;module.exports = messenger;
})