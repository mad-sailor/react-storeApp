import { combineReducers } from 'redux';
import userInfo from './sign';
import pros from './pro';
import { cart } from './pro';

const hwApp = combineReducers({
    userInfo,
    pros,
    cart
});

export default hwApp;