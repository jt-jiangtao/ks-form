import API from "@/utils/axios";
import {IChangePwdReq, ISetUserInfoReq} from "@/types/service/request";

export function getInfo(){
    return API.get('/api/user/getInfo')
        .then(res => res.data)
        .catch(res => res.data)
}

export function setInfo(data : ISetUserInfoReq){
    return API.post('/api/user/setInfo',data)
        .then(res => res.data)
        .catch(res => res.data)
}

export function changePwd(data : IChangePwdReq){
    return API.post('/api/user/changePwd',data)
        .then(res => res.data)
        .catch(res => res.data)
}



