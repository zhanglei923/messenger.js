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
            if(iframe.win.postMessage){
                //console.log('send response:', eventName, responseToken, iframe)
                var obj = {
                    messengerjs:{
                        isResp: true,      
                        responsePageId: messenger.getPageId(),                          
                        responseToken: encodeStr(responseToken),
                        result,
                        from: iframe.from
                    }
                };
                obj.messengerjs = encryptMessageData(obj.messengerjs);
                obj = JSON.parse(JSON.stringify(obj));
                iframe.win.postMessage(obj, '*');
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
        data = decryptMessageData(data);
        if(fn && data){
            if(data.isReq){
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
        if(data.from === 'parent'){//继续向child传播
            var iframes = document.getElementsByTagName('iframe');
            for(var i = 0; i < iframes.length; i++){
                data.from = 'parent';
                //console.log('godeep', window.location.href, i, data)
                var obj = {messengerjs:data}
                obj = JSON.parse(JSON.stringify(obj));
                iframes[i].contentWindow.postMessage(obj,'*');
            }
        }
        if(data.from === 'child'){//继续向parent传播
            //console.log('from child', window.location.href)
            if(window !== window.parent){
                data.from = 'child';
                var obj = {messengerjs:data}
                obj = JSON.parse(JSON.stringify(obj));
                window.parent.postMessage(obj,'*');
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