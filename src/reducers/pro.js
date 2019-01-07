import * as types from '../constants/ActionTypes';

const pros = (state = [],action) => {
    switch(action.type){
        case types.RECIVE_PRO_LIST:
            return [
                ...state,
                ...action.proList
            ]
        default:
            return state
    }
}

export const cart = (state = [],action) => {
    switch(action.type){
        case types.CART_LIST:
            return [
                ...state,
                ...action.cart
            ]
        case types.DEL_PRODUCT:
            let arr = state;
            let i = action.index;
            arr.splice(i,1);
            return [
                ...arr
            ]
        case types.CHANGE_COUNT:
            let arr1 = state;
            let coun = action.coun;
            let cid = action.cid;
            arr1.map((item)=>{
                if( item.cid === cid )
                    item.coun = coun;
                return item
            })
            return [
                ...arr1
            ]
        case types.CHECK_ROW:
            let arr2 = state;
            let selection = action.selection;
            let c_cid = action.cid;
            arr2.map((item)=>{
                if( item.cid === c_cid )
                    item.selection = selection;
                return item
            })
            return [
                ...arr2
            ]
        default: 
            return state
    }
}

export default pros;