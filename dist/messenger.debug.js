/* 
* Messenger.js
* The MIT License (MIT)
* Copyright (c) 2013-2018 ZhangLei (zhanglei923@gmail.com)
* https://github.com/zhanglei923/messenger.js
*/
let messenger = {};
//request
((messenger)=>{
    var generateToken = function(){
        var time = (Math.random()*1.7+'') +'-'+ 2.3 * (new Date())
        return time.replace(/\./ig,'');
    }
    var _currentTarget = window.parent;
    var _currentTargetHost = '*';
    var _waitingPromiseMap = {};
    var thisPageId = 'page-'+generateToken();

    messenger.getPageId= function(){
            return thisPageId;
        }
    messenger.getTargetWindows= function(){
            var iframelist = [];//[window.parent];
            iframelist.push({
                                is: 'self',
                                from: 'self',//在对方看来，是self，parent，还是child
                                win:window
                            });
            if(window !== window.parent) {
                iframelist.push({
                                    is: 'parent',
                                    from: 'child',
                                    win: window.parent
                                });

            }
            var iframes = document.getElementsByTagName('iframe');
            for(var i = 0; i < iframes.length; i++){
                iframelist.push({
                    is: 'child',
                    from:'parent',
                    win: iframes[i].contentWindow
                })
            }
            return iframelist;
        }
        messenger.setTarget= function(target){
            _currentTarget = target;
            if(_currentTarget.contentWindow) _currentTarget = _currentTarget.contentWindow;
            return messenger;
        }
        messenger.request= function (){
            var me = this;
            var eventName = arguments[0];
            var args = [];
            for(var i = 1; i < arguments.length; i++){
                args.push(arguments[i]);
            }
            var responseToken = 'messenger-'+generateToken();
            var windows = me.getTargetWindows();
            for(var i = 0; i < windows.length; i++){
                var iframe = windows[i];
                if(iframe.win.postMessage){
                    console.log('sent-req:', eventName, responseToken, iframe)
                    iframe.win.postMessage({
                        messengerjs:{
                            isReq: true,//表明是request
                            eventName,//请求的名字
                            args,//本次请求的参数
                            responseToken,//本次请求的token，一次性
                            requestPageId: thisPageId, //发起请求的页面id
                            from: iframe.from
                        }
                    }, _currentTargetHost);
                }
            }
            _waitingPromiseMap[responseToken] = {};
            return {
                then: (cb)=>{
                    _waitingPromiseMap[responseToken].cb = cb;
                }
            };
        }
    
    var handleResponse = function(data){
        //console.log('on msg', window.location.href, data)
        var data = data.data;
        if(data.messengerjs && data.messengerjs.isResp && _waitingPromiseMap[data.messengerjs.responseToken]){
            process(data.messengerjs.responseToken, data.messengerjs)
        }
    };
    var process = (responseToken, data)=>{
        var result = data.result;
        //console.warn('got response', window.location.href, result)
        _waitingPromiseMap[responseToken].cb(result)
    };
    if (window.addEventListener) {
        window.addEventListener("message", handleResponse);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleResponse);
    }
    
})(messenger);
//listener
((messenger)=>{
    var _listeningEvents = {}
    var handleRequest = function (data) {
        //console.log('on msg', window.location.href, data)
        var data = data.data;
        if(data.messengerjs /**&& data.messengerjs.isReq **/){
            process(data.messengerjs)
        }
    }
    var doResponse = (responseToken, result)=>{
        //console.log('i-can-process-this-request:', eventName, args, responseToken, result)
        var windows = messenger.getTargetWindows();
        for(var i = 0; i < windows.length; i++){
            var iframe = windows[i]
            if(iframe.win.postMessage){
                //console.log('send response:', eventName, responseToken, iframe)
                iframe.win.postMessage({
                    messengerjs:{
                        isResp: true,      
                        responsePageId: messenger.getPageId(),                          
                        responseToken,
                        result,
                        from: iframe.from
                    }
                }, '*');
            }
        }
    }
    var process = function(data){
        //invoke
        var args = data.args;
        var eventName = data.eventName;
        var responseToken = data.responseToken;
        
        var fn = _listeningEvents[eventName]
        //console.log('process', !!fn, window.location.href)
        if(fn && data.isReq){
            var result = fn.apply(window, args)
            if(result && typeof result.then === 'function'){
                result.then((data)=>{
                    doResponse(responseToken, data)
                })
            }else{
                doResponse(responseToken, result)
            }
            
        }
        //转发
        if(data.from === 'parent'){//继续向child传播
            var iframes = document.getElementsByTagName('iframe');
            for(var i = 0; i < iframes.length; i++){
                data.from = 'parent';
                //console.log('godeep', window.location.href, i, data)
                iframes[i].contentWindow.postMessage({messengerjs:data},'*');
            }
        }
        if(data.from === 'child'){//继续向parent传播
            //console.log('from child', window.location.href)
            if(window !== parent){
                data.from = 'child';
                window.parent.postMessage({messengerjs:data},'*');
            }
        }
    }
    messenger.listen = function(eventName, callback){
        _listeningEvents[eventName] = callback;
    };    
    messenger.stopListen = function(eventName){
        delete _listeningEvents[eventName];
    };
    if (window.addEventListener) {
        window.addEventListener("message", handleRequest);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleRequest);
    }
    console.log('listening...')
})(messenger);