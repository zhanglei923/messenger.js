//listener
((messenger)=>{
    var _listeningEvents = {}
    var handleRequest = function (data) {
        //console.log('on msg', window.location.href, data)
        var data = data.data;
        if(data && data.messengerjs /**&& data.messengerjs.isReq **/){
            process(data.messengerjs)
        }
    }
    var doResponse = (responseToken, result)=>{
        //console.log('i-can-process-this-request:', eventName, args, responseToken, result)
        var windows = messenger.getTargetWindows();
        for(var i = 0; i < windows.length; i++){
            var iframe = windows[i]
            //console.log('send response:', eventName, responseToken, iframe)
            var obj = {
                messengerjs:{                          
                    result
                }
            };
            obj.messengerjs = encrypt.encryptMessageData(obj.messengerjs, {
                isResp: true,
                from: iframe.from,
                responsePageId: messenger.getPageId(),
                responseToken: encrypt.encodeStr(responseToken),
            });
            obj = JSON.parse(JSON.stringify(obj));
            doPostMessage(iframe.win, obj, '*');
        }
    }
    var process = function(data){
        //invoke
        var args = data.args;
        var status = encrypt.decryptMessageData(data);   
        var eventName = status.eventName;     
        var responseToken = status.responseToken;

        //console.warn('doResponse', responseToken, responseToken.length)
        
        var fn = _listeningEvents[eventName]
        //console.log('process', !!fn, window.location.href)
        if(fn && data){
            if(status.isReq){
                var result = fn.apply(window, args)
                if(result && typeof result.then === 'function'){
                    result.then((data)=>{
                        doResponse(responseToken, data)
                    })
                }else{
                    doResponse(responseToken, result)
                }
            }            
        }
        //转发
        if(status.from === 'parent'){//继续向child传播
            var iframes = document.getElementsByTagName('iframe');
            for(var i = 0; i < iframes.length; i++){
                status.from = 'parent';
                //console.log('godeep', window.location.href, i, data)
                var obj = {messengerjs:data}
                obj = JSON.parse(JSON.stringify(obj));
                doPostMessage(iframes[i].contentWindow, obj, '*');
            }
        }
        if(status.from === 'child'){//继续向parent传播
            //console.log('from child', window.location.href)
            if(window !== window.parent){
                status.from = 'child';
                var obj = {messengerjs:data}
                obj = JSON.parse(JSON.stringify(obj));
                doPostMessage(window.parent, obj, '*');
            }
        }
    }
    messenger.listen = function(eventName, callback){
        eventName = md5_util(eventName)
        _listeningEvents[eventName] = callback;
    };    
    messenger.stopListen = function(eventName){
        eventName = md5_util(eventName)
        delete _listeningEvents[eventName];
    };
    if (window.addEventListener) {
        window.addEventListener("message", handleRequest);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleRequest);
    }
    console.log('listening...')
})(messenger);