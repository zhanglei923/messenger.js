//listener
(()=>{
    var _listeningEvents = {}
    var handleRequest = function (data) {
        //console.log('on msg', window.location.href, data)
        var data = data.data;
        if(data.messengerjs && data.messengerjs.isReq){
            process(data.messengerjs)
        }
    }
    var process = function(data){
        //invoke
        var args = data.args;
        var eventName = data.eventName;
        var responseToken = data.responseToken;
        
        var fn = _listeningEvents[eventName]
        if(fn){
            var result = fn.apply(window, args)
            console.log('received:', eventName, args, responseToken, result)
            window.setTimeout(()=>{
                var windows = window.messenger.getTargetWindows();
                console.log(windows.length)
                for(var i = 0; i < windows.length; i++){
                    var iframe = windows[i]
                    if(iframe.win.postMessage){
                        console.log('send response:', eventName, responseToken, iframe)
                        iframe.win.postMessage({
                            messengerjs:{
                                isResp: true,                                
                                responseToken,
                                result,
                                is: iframe.is
                            }
                        }, '*');
                    }
                }
            }, 2000)
            
        }
    }
    window.messenger.listen = function(eventName, callback){
        _listeningEvents[eventName] = callback;
    };
    if (window.addEventListener) {
        window.addEventListener("message", handleRequest);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleRequest);
    }
    console.log('listening...')
})();