/* 
* Messenger.js 
* v0.7.0
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
define(function (require, exports, module) {
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
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);var md5_util = md5;delete window.md5;
//--
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,f){a!=Array.prototype&&a!=Object.prototype&&(a[c]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.arrayIterator=function(a){var c=0;return $jscomp.iteratorPrototype(function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var c=a[Symbol.iterator];return c?c.call(a):$jscomp.arrayIterator(a)};
$jscomp.polyfill=function(a,c,f,h){if(c){f=$jscomp.global;a=a.split(".");for(h=0;h<a.length-1;h++){var d=a[h];d in f||(f[d]={});f=f[d]}a=a[a.length-1];h=f[a];c=c(h);c!=h&&null!=c&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:c})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function c(){this.batch_=null}function f(b){return b instanceof d?b:new d(function(e,a){e(b)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;c.prototype.asyncExecute=function(b){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(b);return this};c.prototype.asyncExecuteBatch_=function(){var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})};var h=$jscomp.global.setTimeout;c.prototype.asyncExecuteFunction=function(b){h(b,
0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var b=this.batch_;this.batch_=[];for(var e=0;e<b.length;++e){var a=b[e];b[e]=null;try{a()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};c.prototype.asyncThrow_=function(b){this.asyncExecuteFunction(function(){throw b;})};var d=function(b){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var e=this.createResolveAndReject_();try{b(e.resolve,e.reject)}catch(l){e.reject(l)}};d.prototype.createResolveAndReject_=
function(){function b(b){return function(l){a||(a=!0,b.call(e,l))}}var e=this,a=!1;return{resolve:b(this.resolveTo_),reject:b(this.reject_)}};d.prototype.resolveTo_=function(b){if(b===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(b instanceof d)this.settleSameAsPromise_(b);else{a:switch(typeof b){case "object":var e=null!=b;break a;case "function":e=!0;break a;default:e=!1}e?this.resolveToNonPromiseObj_(b):this.fulfill_(b)}};d.prototype.resolveToNonPromiseObj_=function(b){var e=
void 0;try{e=b.then}catch(l){this.reject_(l);return}"function"==typeof e?this.settleSameAsThenable_(e,b):this.fulfill_(b)};d.prototype.reject_=function(b){this.settle_(2,b)};d.prototype.fulfill_=function(b){this.settle_(1,b)};d.prototype.settle_=function(b,e){if(0!=this.state_)throw Error("Cannot settle("+b+", "+e+"): Promise already settled in state"+this.state_);this.state_=b;this.result_=e;this.executeOnSettledCallbacks_()};d.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var b=
0;b<this.onSettledCallbacks_.length;++b)g.asyncExecute(this.onSettledCallbacks_[b]);this.onSettledCallbacks_=null}};var g=new c;d.prototype.settleSameAsPromise_=function(b){var e=this.createResolveAndReject_();b.callWhenSettled_(e.resolve,e.reject)};d.prototype.settleSameAsThenable_=function(b,e){var a=this.createResolveAndReject_();try{b.call(e,a.resolve,a.reject)}catch(k){a.reject(k)}};d.prototype.then=function(b,a){function e(b,a){return"function"==typeof b?function(a){try{k(b(a))}catch(q){c(q)}}:
a}var k,c,g=new d(function(b,a){k=b;c=a});this.callWhenSettled_(e(b,k),e(a,c));return g};d.prototype.catch=function(b){return this.then(void 0,b)};d.prototype.callWhenSettled_=function(b,a){function e(){switch(k.state_){case 1:b(k.result_);break;case 2:a(k.result_);break;default:throw Error("Unexpected state: "+k.state_);}}var k=this;null==this.onSettledCallbacks_?g.asyncExecute(e):this.onSettledCallbacks_.push(e)};d.resolve=f;d.reject=function(b){return new d(function(a,c){c(b)})};d.race=function(a){return new d(function(b,
c){for(var e=$jscomp.makeIterator(a),d=e.next();!d.done;d=e.next())f(d.value).callWhenSettled_(b,c)})};d.all=function(a){var b=$jscomp.makeIterator(a),c=b.next();return c.done?f([]):new d(function(a,e){function d(b){return function(e){g[b]=e;k--;0==k&&a(g)}}var g=[],k=0;do g.push(void 0),k++,f(c.value).callWhenSettled_(d(g.length-1),e),c=b.next();while(!c.done)})};return d},"es6","es3");var messenger={},getEncrypedResponseToken=function(a){a=md5_util(a);a=a.substring(2,10);return md5_util(a)};
new Promise(function(a,c){});
(function(a){var c=function(){return md5_util((1.7*Math.random()+"-"+2.3*new Date).replace(/\./ig,""))},f=window.parent,h={},d="pg_"+c();a.getPageId=function(){return d};a.getTargetWindows=function(){var a=[];a.push({is:"self",from:"self",win:window});window!==window.parent&&a.push({is:"parent",from:"child",win:window.parent});for(var b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++)a.push({is:"child",from:"parent",win:b[c].contentWindow});return a};a.setTarget=function(b){f=b;f.contentWindow&&
(f=f.contentWindow);return a};a.post=function(){var a=arguments[0];a=md5_util(a);for(var b=[],g=1;g<arguments.length;g++)b.push(arguments[g]);var f="resp_"+c(),p=this.getTargetWindows();for(g=0;g<p.length;g++){var m=p[g];m.win.postMessage&&(("sent-req:",a,f,m),m.win.postMessage({messengerjs:{isReq:!0,eventName:a,args:b,responseToken:f,requestPageId:d,from:m.from}},"*"))}var n=getEncrypedResponseToken(f);h[n]={receiveCount:0};return{then:function(a){h[n].cb=a}}};var g=function(a){a=a.data;
a.messengerjs&&a.messengerjs.isResp&&h[a.messengerjs.responseToken]&&b(a.messengerjs.responseToken,a.messengerjs)},b=function(a,b){b=b.result;var c=++h[a].receiveCount;h[a].cb(b,{count:c,stopReceive:function(){delete h[a]}})};window.addEventListener?window.addEventListener("message",g):window.attachEvent&&window.attachEvent("onmessage",g)})(messenger);
(function(a){var c={},f=function(a){a=a.data;a.messengerjs&&d(a.messengerjs)},h=function(c,b){for(var e=a.getTargetWindows(),d=0;d<e.length;d++){var g=e[d];g.win.postMessage&&g.win.postMessage({messengerjs:{isResp:!0,responsePageId:a.getPageId(),responseToken:getEncrypedResponseToken(c),result:b,from:g.from}},"*")}},d=function(a){var b=a.args,e=a.responseToken,d=c[a.eventName];d&&a.isReq&&((b=d.apply(window,b))&&"function"===typeof b.then?b.then(function(a){h(e,a)}):h(e,b));if("parent"===a.from)for(b=
document.getElementsByTagName("iframe"),d=0;d<b.length;d++)a.from="parent",b[d].contentWindow.postMessage({messengerjs:a},"*");"child"===a.from&&window!==parent&&(a.from="child",window.parent.postMessage({messengerjs:a},"*"))};a.subscribe=function(a,b){a=md5_util(a);c[a]=b};a.stopSubscribe=function(a){a=md5_util(a);delete c[a]};window.addEventListener?window.addEventListener("message",f):window.attachEvent&&window.attachEvent("onmessage",f);("listening...")})(messenger);;module.exports = messenger;
})