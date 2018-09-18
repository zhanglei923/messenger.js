//request
((messenger)=>{
    var generateToken = ()=>{
        var time = (Math.random()*1.7+'') +'-'+ 2.3 * (new Date())
        return md5_util(time.replace(/\./ig,''));
    }
    var _currentTarget = window.parent;
    var _currentTargetHost = '*';
    var _waitingPromiseMap = {};
    var thisPageId = ''+generateToken();

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
        messenger.emit= function (){
            var me = this;
            var eventName = arguments[0];
            eventName = md5_util(eventName)
            var args = [];
            for(var i = 1; i < arguments.length; i++){
                args.push(arguments[i]);
            }
            var responseToken = ''+generateToken();
            //console.warn('generateToken',responseToken.length)
            var windows = me.getTargetWindows();
            for(var i = 0; i < windows.length; i++){
                var iframe = windows[i];
                console.log('sent-req:', eventName, responseToken, iframe)
                var obj = {
                    messengerjs:{
                        args,//本次请求的参数
                    }
                };
                obj.messengerjs = encryptMessageData(obj.messengerjs, {
                    eventName,//请求的名字
                    isReq: true,//表明是request
                    from: iframe.from,                    
                    requestPageId: thisPageId, //发起请求的页面id
                    responseToken,//本次请求的token，一次性
                });
                obj = JSON.parse(JSON.stringify(obj));
                doPostMessage(iframe.win, obj, _currentTargetHost);
            }
            _waitingPromiseMap[responseToken] = {
                receiveCount: 0
            };
            return {
                onResponse: (cb)=>{
                    _waitingPromiseMap[responseToken].cb = cb;
                }
            };
        }
    
    var handleResponse = (data)=>{
        //console.log('on msg', window.location.href, data)
        var data = data.data;
        if(!data || !data.messengerjs)return;
        var status = decryptMessageData(data.messengerjs)
        var responseToken = decodeStr(status.responseToken)
        //if(data.messengerjs && data.messengerjs.isResp && _waitingPromiseMap[responseToken]){
        if(data.messengerjs && data.messengerjs.info){
            if(status.isResp && _waitingPromiseMap[responseToken]){
                process(responseToken, data.messengerjs)
            }
        }
    };
    var process = (responseToken, data)=>{
        var result = data.result;
        //console.warn('got response', window.location.href, result)
        let stopReceive = ()=>{
            delete _waitingPromiseMap[responseToken];
        }
        let count = ++_waitingPromiseMap[responseToken].receiveCount;
        if(_waitingPromiseMap[responseToken].cb){
            _waitingPromiseMap[responseToken].cb(result, {count: count, stopReceive: stopReceive});
        }
    };
    if (window.addEventListener) {
        window.addEventListener("message", handleResponse);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleResponse);
    }
    
})(messenger);