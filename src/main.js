let messenger = {};
var md5_util = window.md5;window.md5=undefined;
let getEncrypedResponseToken = (responseToken)=>{
    var seed = md5_util(responseToken);
    seed = seed.substring(2, 10);
    return md5_util(seed);
};
new Promise((resolve, reject)=>{});