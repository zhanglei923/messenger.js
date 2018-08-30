//send
(()=>{
    var _currentTarget = window.parent;
    var _currentTargetHost = '*';
    var _waitingPromiseMap = {};
    var _currentResult;
    var generateToken = function(){
        var time = (Math.random()*1.7+'') +'-'+ 2.3 * (new Date())
        return 'messenger-'+''+time.replace(/\./ig,'');
    }
    window.messenger = {
        getTargetWindows: function(){
            var iframelist = [window.parent];
            if(window !== window.parent) iframelist.push(window);
            var iframes = document.getElementsByTagName('iframe');
            for(var i = 0; i < iframes.length; i++){
                iframelist.push(iframes[i].contentWindow)
            }
            return iframelist;
        },
        setTarget: function(target){
            _currentTarget = target;
            if(_currentTarget.contentWindow) _currentTarget = _currentTarget.contentWindow;
            return window.messenger;
        },
        request: function (){
            var me = this;
            var args = [];
            var eventName = arguments[0];
            var responseToken = generateToken();
            var iframelist = me.getTargetWindows();
            for(var i = 1; i < arguments.length; i++){
                args.push(arguments[i]);
            }
            for(var i = 0; i < iframelist.length; i++){
                var iframe = iframelist[i]
                if(iframe.postMessage){
                    console.log('req:', eventName, responseToken, iframe)
                    iframe.postMessage({
                        messengerjs:{
                            isReq: true,
                            eventName,
                            args,
                            responseToken
                        }
                    }, _currentTargetHost);
                }
            }
            var promise = new Promise(function(resolve, reject) {

            });
            _waitingPromiseMap[responseToken] = {
                promise: promise
            };
            return promise;
        }
    }
    var handleResponse = function(data){
        //console.log('on msg', window.location.href, data)
        var data = data.data;
        if(data.messengerjs && data.messengerjs.isResp && _waitingPromiseMap[data.messengerjs.responseToken]){
            process(data.messengerjs)
        }
    };
    var process = (data)=>{
        var result = data.result;
        console.log('on response', window.location.href, result)

    };
    if (window.addEventListener) {
        window.addEventListener("message", handleResponse);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleResponse);
    }
    
})();