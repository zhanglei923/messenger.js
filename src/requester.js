//request
((messenger)=>{
    var generateToken = ()=>{
        var time = (Math.random()*1.7+'') +'-'+ 2.3 * (new Date())
        return md5_util(time.replace(/\./ig,''));
    }
    var _currentTarget = window.parent;
    var _currentTargetHost = '*';
    var _waitingPromiseMap = {};
    var thisPageId = 'pg_'+generateToken();

    messenger.getPageId= ()=>{
            return thisPageId;
        }
    messenger.getTargetWindows= ()=>{
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
        messenger.post= function (){
            var me = this;
            var eventName = arguments[0];
            eventName = md5_util(eventName)
            var args = [];
            for(var i = 1; i < arguments.length; i++){
                args.push(arguments[i]);
            }
            var responseToken = 'resp_'+generateToken();
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
            _waitingPromiseMap[responseToken] = {
                receiveCount: 0
            };
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
        let stopReceive = ()=>{
            delete _waitingPromiseMap[responseToken];
        }
        let count = ++_waitingPromiseMap[responseToken].receiveCount;
        _waitingPromiseMap[responseToken].cb(result, {count: count, stopReceive: stopReceive});
    };
    if (window.addEventListener) {
        window.addEventListener("message", handleResponse);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleResponse);
    }
    
})(messenger);