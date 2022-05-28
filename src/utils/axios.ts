import axios from "axios";
import qs from 'qs'
import message from "@/components/Message";

const createAxios = (config : any) => {
    let instance = axios.create(config)
    instance.interceptors.request.use(async config => {
        // if (config.method === 'post') {
        //     config.data = qs.stringify(config.data)
        // }
        return config
    })
    instance.interceptors.response.use(
        (success) => success,
        (error) => {
            // 统一错误处理
            message.error(error.response.data.msg)
            // 拦截未登录
            // if (error.response.Create.stat === 'ERR_USER_NOT_LOGIN' && window.location.pathname !== '/signin') {
            //     window.location.href = `/signin?cb=${window.location.pathname}`
            // }
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
