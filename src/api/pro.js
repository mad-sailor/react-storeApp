import createApi from './createApi';
import { signConf } from './index'

export default {
    getAllPro: data => createApi(signConf,{ url:'/pro/list', data }),
    getCart: data => createApi(signConf,{ url:'/cart/list', data }),
    delCart: data => createApi(signConf,{ url:'/cart/del', data }),
    changeCount: data => createApi(signConf,{ url:'/cart/count', data }),
    changeCheck: data => createApi(signConf,{ url:'/cart/check', data }),
    addPro: data => createApi(signConf,{ url:'/cart/add', data})
} 