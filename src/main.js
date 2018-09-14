let messenger = {};
var md5_util = md5;//window.md5=undefined;
new Promise((resolve, reject)=>{});
function doPostMessage(winObj, data, target, other){
    if(!winObj.postMessage){
        return;
    } 
    delete data.messengerjs.isReq;
    delete data.messengerjs.isResp;
    delete data.messengerjs.from;
    winObj.postMessage(data, target, other);
};