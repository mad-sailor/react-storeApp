import createApi from './createApi';
import { signConf } from './index'

export default {
    login: data => createApi(signConf, { url:'/sign/login', data }),
    regis: data => createApi(signConf, { url:'/sign/regis', data })
}