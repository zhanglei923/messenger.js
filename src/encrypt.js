function encodeStr (str){
    let len = str.length / 2
    let str1 = str.substring(0, len)
    let str2 = str.substring(len)
    //console.log('before:', str, (str === (str1+str2)) )
    let arr1 = str1.split('').reverse();
    let arr2 = str2.split('').reverse();
    let arr = [].concat(arr1).concat(arr2)
    let impurities = (md5_util(''+Math.random()+(new Date()))+md5_util(''+Math.random()+(new Date()))).split('')
    let impurities2 = (md5_util(''+Math.random()+(new Date()))+md5_util(''+Math.random()+(new Date()))).split('')
    let newarr = []
    for(var i = 0; i< arr.length; i++){
        newarr.push(impurities[i] + arr[i] + impurities2[i]);
    }
    let newstr = newarr.join('')
    return newstr;
}
function decodeStr (encoded){
    let arr = encoded.split('').reverse();
    let char = 1;
    let str = ''
    while(char){
        //console.log(char)
        arr.shift();
        char = arr.shift();
        if(char)str += char;
        arr.shift();
    }
    let len = str.length / 2
    let str1 = str.substring(0, len)
    let str2 = str.substring(len)
    let arr1 = str1.split('');
    let arr2 = str2.split('');
    str = arr2.join('') + arr1.join('') 
    return str;
}
function makeRandomAlphabet(capitalize) {
    var text = "";
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var alphabetsUpper = alphabets.toUpperCase();
    var alphabetsLower = alphabets.toLowerCase();
    var possible = alphabetsUpper+alphabetsLower;
    if(typeof capitalize !== 'undefined' && capitalize === 'upper') possible = alphabetsUpper;
    if(typeof capitalize !== 'undefined' && capitalize === 'lower') possible = alphabetsLower;
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
function makeRandomNumber() {
    var text = "";
    var possible = "0123456789";
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
//console.warn('random-alphabet', makeRandomAlphabet(), makeRandomAlphabet('upper'), makeRandomAlphabet('lower'), makeRandomNumber());
function makeRespCode(){
    return  makeRandomAlphabet()
}
function isRespCode(info){
    var letter = info.substring(0,1)
    return  /\b[a-zA-Z]\b/.test(letter)
}
function makeReqCode(){
    return  makeRandomNumber()
}
function isReqCode(info){
    var letter = info.substring(0,1)
    return  /\b[0-9]\b/.test(letter)
}
function encryptFromCode(desc, from){
    if(from === 'self') return 0;
    if(from === 'child') return 1;
    if(from === 'parent') return 2;
}
function decryptFromCode(desc, info){
    var letter = info.substring(1,2)
    if(letter === '0') return 'self';
    if(letter === '1') return 'child';
    if(letter === '2') return 'parent';
}
function encryptMessageData(data, status){
    var isResp = status.isResp;
    var isReq = status.isReq;
    //req & resp
    if(status.isResp){
        var isResp = makeRespCode();//英文字母代表是response
        data.info = `${isResp}`;
    }
    if(status.isReq){
        var isReq = makeReqCode();//表明是request
        data.info = `${isReq}`;
    }
    //from
    var fromCode = encryptFromCode({isReq, isResp}, status.from)
    data.info += fromCode;
    //pageid
    if(isReq) data.info += status.requestPageId;
    if(isResp) data.info += status.responsePageId;
    //tokens
    let token = status.responseToken;
    let tokenLength = token.length;
    let tokenLengthMark;
    if(tokenLength === 32) tokenLengthMark = 32;
    if(tokenLength === 96) tokenLengthMark = 96;
    if(tokenLength === 32) token = token + md5_util(Math.random()) + md5_util(Math.random())//补齐到96位
    data.info += tokenLengthMark + token;
    //eventName
    var hasEventName = !!status.eventName;
    var fakeEventName = md5_util(Math.random())
    data.info += (hasEventName?'1':'0') + (hasEventName?status.eventName:fakeEventName)

    //data.responseToken = status.responseToken

    //console.warn('tokenLength', token, tokenLength)
    data.info = encryptInfo(data.info);

    return data;
}
function decryptMessageData(data){   
    data.info = decryptInfo(data.info); 
    var isResp = isRespCode(data.info);
    var isReq = isReqCode(data.info);
    var status = {}
    if(isResp){
        status.isResp = true;
    }
    if(isReq){
        status.isReq = true;
    }
    status.from = decryptFromCode({isReq, isResp}, data.info)
    // 2+32+2+96
    var currentInfoStr = data.info.substring(2)
    //pageid
    var pageid = currentInfoStr.substring(0, 32);currentInfoStr = currentInfoStr.substring(32)
    if(isReq) status.requestPageId = pageid;
    if(isResp) status.responsePageId = pageid;
    //token
    //console.warn(currentInfoStr.length)
    var tokenLengthStr = currentInfoStr.substring(0, 2);currentInfoStr = currentInfoStr.substring(2)
    var tokenLength = parseInt(tokenLengthStr)
    var token = currentInfoStr.substring(0, 96);currentInfoStr = currentInfoStr.substring(96)
    //console.warn('kk',currentInfoStr.length, tokenLength, token.length)
    if(tokenLength === 32) token = token.substring(0, tokenLength)
    status.responseToken = token;

    //eventName
    var has = currentInfoStr.substring(0, 1);currentInfoStr = currentInfoStr.substring(1)
    var hasEventName = (has === '1'?true:false);
    var eventName = currentInfoStr.substring(0, 32);currentInfoStr = currentInfoStr.substring(32)
    //console.warn(has, hasEventName, eventName.length)

    if(hasEventName){
        status.eventName = eventName;
    }
    return status;
}
var SHOULD_DECRYPT_CODE = md5_util(new Date()+'');
let encryptInfo = (info)=>{
    let arr = info.split('')
    arr = arr.reverse();
    var result = arr.join('')
    return SHOULD_DECRYPT_CODE + result;
}

let decryptInfo = (info)=>{
    if(info.indexOf(SHOULD_DECRYPT_CODE)!==0) return info;//如果只是转发就不必再次解密
    info = info.substring(SHOULD_DECRYPT_CODE.length)    
    let arr = info.split('')
    arr = arr.reverse();
    var result = arr.join('')
    return result;
}
// var userinput = md5_util('12341234123');
// //userinput = '123abc'
// var encoded = encodeStr(userinput)
// var decoded = decodeStr(encoded);
// console.log('encoded:',encoded)
// console.log('dencoded:', decoded)
// console.log('userinput==dencoded:', userinput === decoded)
