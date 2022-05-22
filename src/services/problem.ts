import API from "@/utils/axios";
import {IIdReq, IStarProblemReq} from "@/types/service/request";

export function listType(){
    return API.get(`/api/problem/listType`)
        .then(res => res.data)
        .catch(res => res.data)
}

export function listBasic(){
    return API.get(`/api/problem/listBasic`)
        .then(res => res.data)
        .catch(res => res.data)
}

export function listStar(){
    return API.get(`/api/problem/listStar`)
        .then(res => res.data)
        .catch(res => res.data)
}

export function star(data : IStarProblemReq){
    return API.post(`/api/problem/star`, data)
        .then(res => res.data)
        .catch(res => res.data)
}

export function cancelStarProblem(data : IIdReq){
    return API.post(`/api/problem/cancelStar`, data)
        .then(res => res.data)
        .catch(res => res.data)
}
