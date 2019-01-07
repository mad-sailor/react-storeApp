import axios from 'axios';

var qs = require('qs');

export default function createApi(){
    return new Promise((resolve,reject)=>{
        var arr = Array.prototype.slice.call(arguments);
        var opt = Object.assign.apply({},arr);
        callback(opt,resolve,reject);
    })
}

function callback(opt,resolve,reject){
    opt.data = qs.stringify(opt.data);
    axios(opt).then(res=>{
        let code = res.data.code;
        let data = res.data.data;
        code === 0 ? resolve(data) : reject(res.data.msg)
    })
    .catch(err=>{
        alert(err)
    })
}