import * as types from '../constants/ActionTypes';

const userInfo = ( state = { },action ) => {
    switch(action.type){
        case types.LOGIN:
            return {
                uid: action.uid,
                uname: action.uname,
                email: action.email
            }
        case types.LOGOUT:
            state = {}
            return state;
        default: 
            return state;
    }
}

export default userInfo;
