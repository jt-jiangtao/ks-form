import API from "@/utils/axios";
import {ILoginReq, IRegisterReq} from "@/types/service/request";

export function register(data : IRegisterReq){
    return API.post('/api/auth/register', data)
        .then(res => res.data)
        .catch(res => res.data)
}

export function login(data : ILoginReq){
    return API.post('/api/auth/login', {...data})
        .then(res => res.data)
        .catch(res => res.data)
}

export function logout(){
    return API.post('/api/auth/logout')
        .then(res => res.data)
        .catch(res => res.data)
}
