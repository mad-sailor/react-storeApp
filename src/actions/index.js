import * as types from '../constants/ActionTypes';
import signApi from '../api/sign';
import proApi from '../api/pro';

const logInfo = (params) => ({
    type: types.LOGIN,
    uid: params.uid,
    uname: params.uname,
    email: params.email
})

export const login = (params,dispatch) => {
    return new Promise((resolve,reject)=>{
        signApi.login({...params}).then(res=>{
            dispatch(logInfo(res));            
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}

export const regis = (params) => {
    return new Promise((resolve,reject)=>{
        signApi.regis({...params}).then(res=>{
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}

const proInfo = (params) => ({
    type: types.RECIVE_PRO_LIST,
    proList: params
})

export const getAllPro = (dispatch) => {
    return new Promise((resolve,reject)=>{
        proApi.getAllPro({}).then(res=>{
            dispatch(proInfo(res));
            resolve(res)
        })
        .catch(err=>reject(err))
    })
}

const cartInfo = (params) => ({
    type: types.CART_LIST,
    cart: params
})

export const getCart = (params,dispatch) => {
    return new Promise((resolve,reject)=>{
        proApi.getCart({...params}).then(res=>{
            dispatch(cartInfo(res));
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}

const delInfo = (params) => ({
    type: types.DEL_PRODUCT,
    index: params.index
})

export const delPro = (params,dispatch) => {
    return new Promise((resolve,reject)=>{
        proApi.delCart({...params}).then(res=>{
            dispatch(delInfo(params));
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}

const countInfo = (params) => ({
    type: types.CHANGE_COUNT,
    coun: params.coun,
    cid: params.cid
})

export const changeCount = (params,dispatch) => {
    return new Promise((resolve,reject)=>{
        proApi.changeCount({...params}).then(res=>{
            dispatch(countInfo(params));
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}

const checkInfo = (params) => ({
    type: types.CHECK_ROW,
    selection: params.selection,
    cid: params.cid
})

export const changeCheck = (params,dispatch) => {
    return new Promise((resolve,reject)=>{
        proApi.changeCheck({...params}).then(res=>{
            dispatch(checkInfo(params));
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}

export const addPro = (params) => {
    return new Promise((resolve,reject)=>{
        proApi.addPro({...params}).then(res=>{
            resolve(res);
        })
        .catch(err=>reject(err))
    })
}