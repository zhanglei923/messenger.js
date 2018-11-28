import encrypt from './encrypt';
import listener from './listener';
import requester from './requester';

let messenger = {
    doPostMessage: function(winObj, data, target, other){
        if(!winObj.postMessage){
            return;
        } 
        var messengerjs = data.messengerjs;
        delete messengerjs.isReq;
        delete messengerjs.isResp;
        delete messengerjs.from;

        messengerjs.isReq = undefined;
        messengerjs.isResp = undefined;
        messengerjs.from = undefined;

        //messengerjs.aaaaa = 1111111;
        messengerjs = JSON.parse(JSON.stringify(messengerjs))

        var messengerjs2 = {}
        for(var key in messengerjs){
            if(key !== 'isReq' && key !== 'isResp' && key !== 'from'){
                messengerjs2[key] = messengerjs[key];
            }else{
                
            }
        }
        var data2 = {
            messengerjs: messengerjs2
        }
        winObj.postMessage(data2, target, other);
    }
};
listener.init(messenger);
requester.init(messenger);
window.messenger = messenger;