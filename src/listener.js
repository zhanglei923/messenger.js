//listener
(()=>{
    var handleMessage = function (data) {
        console.log('got msg', window.location.href, data)
        var data = data.data;
        if(data.messengerjs){
            handleRequest(data.messengerjs)
        }
    }
    var handleRequest = function(data){
        //invoke
        var args = data.args;
        var responseToken = data.responseToken;

        console.log('result', args, responseToken)
    }
    window.messenger.listen = function(){

    };
    if (window.addEventListener) {
        window.addEventListener("message", handleMessage);
    } else if (window.attachEvent) {
        window.attachEvent("onmessage", handleMessage);
    }
    console.log('listening...')
})();