let messenger = {};
let getEncrypedResponseToken = (responseToken)=>{
    var seed = md5_util(responseToken);
    seed = seed.substring(2, 10);
    return md5_util(seed);
}
new Promise((resolve, reject)=>{});