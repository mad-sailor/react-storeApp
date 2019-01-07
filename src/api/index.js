import axios from 'axios';
import signApi from './sign';
import proApi from './pro';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

export const signConf = {
    baseURL: 'http://127.0.0.1:9999',
    method: 'post'
}

export default {
    signApi,
    proApi
}