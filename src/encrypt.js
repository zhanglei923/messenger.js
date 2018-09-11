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
    return newarr.join('');
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

// var userinput = md5_util('12341234123');
// //userinput = '123abc'
// var encoded = encodeStr(userinput)
// var decoded = decodeStr(encoded);
// console.log('encoded:',encoded)
// console.log('dencoded:', decoded)
// console.log('userinput==dencoded:', userinput === decoded)
