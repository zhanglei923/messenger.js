/* 
* Messenger.js
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/(()=>{var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,f){a!=Array.prototype&&a!=Object.prototype&&(a[c]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.arrayIterator=function(a){var c=0;return $jscomp.iteratorPrototype(function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var c=a[Symbol.iterator];return c?c.call(a):$jscomp.arrayIterator(a)};
$jscomp.polyfill=function(a,c,f,h){if(c){f=$jscomp.global;a=a.split(".");for(h=0;h<a.length-1;h++){var d=a[h];d in f||(f[d]={});f=f[d]}a=a[a.length-1];h=f[a];c=c(h);c!=h&&null!=c&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:c})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function c(){this.batch_=null}function f(b){return b instanceof d?b:new d(function(e,a){e(b)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;c.prototype.asyncExecute=function(b){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(b);return this};c.prototype.asyncExecuteBatch_=function(){var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})};var h=$jscomp.global.setTimeout;c.prototype.asyncExecuteFunction=function(b){h(b,
0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var b=this.batch_;this.batch_=[];for(var e=0;e<b.length;++e){var a=b[e];b[e]=null;try{a()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};c.prototype.asyncThrow_=function(b){this.asyncExecuteFunction(function(){throw b;})};var d=function(b){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var e=this.createResolveAndReject_();try{b(e.resolve,e.reject)}catch(l){e.reject(l)}};d.prototype.createResolveAndReject_=
function(){function b(b){return function(l){a||(a=!0,b.call(e,l))}}var e=this,a=!1;return{resolve:b(this.resolveTo_),reject:b(this.reject_)}};d.prototype.resolveTo_=function(b){if(b===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(b instanceof d)this.settleSameAsPromise_(b);else{a:switch(typeof b){case "object":var e=null!=b;break a;case "function":e=!0;break a;default:e=!1}e?this.resolveToNonPromiseObj_(b):this.fulfill_(b)}};d.prototype.resolveToNonPromiseObj_=function(b){var e=
void 0;try{e=b.then}catch(l){this.reject_(l);return}"function"==typeof e?this.settleSameAsThenable_(e,b):this.fulfill_(b)};d.prototype.reject_=function(b){this.settle_(2,b)};d.prototype.fulfill_=function(b){this.settle_(1,b)};d.prototype.settle_=function(b,e){if(0!=this.state_)throw Error("Cannot settle("+b+", "+e+"): Promise already settled in state"+this.state_);this.state_=b;this.result_=e;this.executeOnSettledCallbacks_()};d.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var b=
0;b<this.onSettledCallbacks_.length;++b)g.asyncExecute(this.onSettledCallbacks_[b]);this.onSettledCallbacks_=null}};var g=new c;d.prototype.settleSameAsPromise_=function(b){var e=this.createResolveAndReject_();b.callWhenSettled_(e.resolve,e.reject)};d.prototype.settleSameAsThenable_=function(b,e){var a=this.createResolveAndReject_();try{b.call(e,a.resolve,a.reject)}catch(k){a.reject(k)}};d.prototype.then=function(b,e){function a(b,a){return"function"==typeof b?function(a){try{k(b(a))}catch(p){c(p)}}:
a}var k,c,g=new d(function(b,a){k=b;c=a});this.callWhenSettled_(a(b,k),a(e,c));return g};d.prototype.catch=function(b){return this.then(void 0,b)};d.prototype.callWhenSettled_=function(b,a){function e(){switch(k.state_){case 1:b(k.result_);break;case 2:a(k.result_);break;default:throw Error("Unexpected state: "+k.state_);}}var k=this;null==this.onSettledCallbacks_?g.asyncExecute(e):this.onSettledCallbacks_.push(e)};d.resolve=f;d.reject=function(b){return new d(function(a,c){c(b)})};d.race=function(b){return new d(function(a,
c){for(var e=$jscomp.makeIterator(b),d=e.next();!d.done;d=e.next())f(d.value).callWhenSettled_(a,c)})};d.all=function(b){var a=$jscomp.makeIterator(b),c=a.next();return c.done?f([]):new d(function(b,e){function d(a){return function(e){k[a]=e;g--;0==g&&b(k)}}var k=[],g=0;do k.push(void 0),g++,f(c.value).callWhenSettled_(d(k.length-1),e),c=a.next();while(!c.done)})};return d},"es6","es3");var messenger={};new Promise(function(a,c){});
(function(a){var c=function(){return(1.7*Math.random()+"-"+2.3*new Date).replace(/\./ig,"")},f=window.parent,h={},d="page-"+c();a.getPageId=function(){return d};a.getTargetWindows=function(){var a=[];a.push({is:"self",from:"self",win:window});window!==window.parent&&a.push({is:"parent",from:"child",win:window.parent});for(var b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++)a.push({is:"child",from:"parent",win:b[c].contentWindow});return a};a.setTarget=function(b){f=b;f.contentWindow&&
(f=f.contentWindow);return a};a.post=function(){for(var a=arguments[0],b=[],g=1;g<arguments.length;g++)b.push(arguments[g]);var f="messenger-"+c(),n=this.getTargetWindows();for(g=0;g<n.length;g++){var m=n[g];m.win.postMessage&&(("sent-req:",a,f,m),m.win.postMessage({messengerjs:{isReq:!0,eventName:a,args:b,responseToken:f,requestPageId:d,from:m.from}},"*"))}h[f]={receiveCount:0};return{then:function(a){h[f].cb=a}}};var g=function(a){a=a.data;a.messengerjs&&a.messengerjs.isResp&&h[a.messengerjs.responseToken]&&
b(a.messengerjs.responseToken,a.messengerjs)},b=function(a,b){b=b.result;var c=++h[a].receiveCount;h[a].cb(b,{count:c,stopReceive:function(){delete h[a]}})};window.addEventListener?window.addEventListener("message",g):window.attachEvent&&window.attachEvent("onmessage",g)})(messenger);
(function(a){var c={},f=function(a){a=a.data;a.messengerjs&&d(a.messengerjs)},h=function(c,b){for(var e=a.getTargetWindows(),d=0;d<e.length;d++){var g=e[d];g.win.postMessage&&g.win.postMessage({messengerjs:{isResp:!0,responsePageId:a.getPageId(),responseToken:c,result:b,from:g.from}},"*")}},d=function(a){var b=a.args,e=a.responseToken,d=c[a.eventName];d&&a.isReq&&((b=d.apply(window,b))&&"function"===typeof b.then?b.then(function(a){h(e,a)}):h(e,b));if("parent"===a.from)for(b=document.getElementsByTagName("iframe"),
d=0;d<b.length;d++)a.from="parent",b[d].contentWindow.postMessage({messengerjs:a},"*");"child"===a.from&&window!==parent&&(a.from="child",window.parent.postMessage({messengerjs:a},"*"))};a.subscribe=function(a,b){c[a]=b};a.stopSubscribe=function(a){delete c[a]};window.addEventListener?window.addEventListener("message",f):window.attachEvent&&window.attachEvent("onmessage",f);("listening...")})(messenger);;window.messenger=messenger;})();