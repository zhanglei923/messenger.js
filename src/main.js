let messenger = {};
var md5_util = md5;//window.md5=undefined;
new Promise((resolve, reject)=>{});
function doPostMessage(winObj, data, target, other){
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
};