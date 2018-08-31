//send
(()=>{
    var generateToken = function(){
        var time = (Math.random()*1.7+'') +'-'+ 2.3 * (new Date())
        return time.replace(/\./ig,'');
    }
    var _currentTarget = window.parent;
    var _currentTargetHost = '*';
    var _waitingPromiseMap = {};
    var thisPageId = 'page-'+generateToken();
    window.messenger = {
        thisPageId,
        getTargetWindows: function(){
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
        },
        setTarget: function(target){
            _currentTarget = target;
            if(_currentTarget.contentWindow) _currentTarget = _currentTarget.contentWindow;
            return window.messenger;
        },
        request: function (){
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
                    console.log('req:', eventName, responseToken, iframe)
                    iframe.win.postMessage({
                        messengerjs:{
                            isReq: true,//表明是request
                            eventName,//请求的名字
                            args,//本次请求的参数
                            responseToken,//本次请求的token，一次性
                            thisPageId, //发起请求的页面id
                            from: iframe.from
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