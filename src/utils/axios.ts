import axios from "axios";
import message from "@/components/Message";
import {clearCache} from "@/utils/localStorage";

const createAxios = (config : any) => {
    let instance = axios.create(config)
    instance.interceptors.response.use(
        (success) => success,
        (error) => {
            // 统一错误处理
            message.error(error.response.data.msg)
            // 拦截未登录
            console.log({
                pathname: window.location.pathname || '',
                hash: window.location.hash || '',
                search: window.location.search || ''
            })
            if (error.response.data.stat === 'ERR_USER_NOT_LOGIN' && window.location.pathname !== '/signin') {
                clearCache('login')
                window.location.href = `/signin?cb=${encodeURIComponent(JSON.stringify({
                    pathname: window.location.pathname || '',
                    hash: window.location.hash || '',
                    search: window.location.search || ''
                }))}`
                // window.location.href = '/signin'
            }
            return Promise.reject({
                data: error.response.data
            })
        }
    );
    return instance
}

const API = createAxios({
    timeout: 10000
})

export default API
