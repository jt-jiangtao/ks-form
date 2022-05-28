import API from "@/utils/axios";
import {ICreateFormReq, IIdReq, IInputReq, IListReq} from "@/types/service/request";

export function getFormList(data : IListReq){
    return API.post('/api/form/list',data)
        .then(res => res.data)
        .catch(res => res.data)
}

export function createForm(data : ICreateFormReq){
    return API.post('/api/form/create',data)
        .then(res => res.data)
        .catch(res => res.data)
}

export function getForm(data : IListReq){
    return API.post('/api/form/get',data)
        .then(res => res.data)
        .catch(res => res.data)
}

export function deleteForm(data : IIdReq){
    return API.post('/api/form/delete')
        .then(res => res.data)
        .catch(res => res.data)
}

export function cancelStarForm(data : IIdReq){
    return API.post('/api/form/cancelStar')
        .then(res => res.data)
        .catch(res => res.data)
}

export function inputForm(data : IInputReq){
    return API.post('/api/form/input')
        .then(res => res.data)
        .catch(res => res.data)
}

export function formResult(data : IIdReq){
    return API.post(`/api/form/formResult/${data.id}`)
        .then(res => res.data)
        .catch(res => res.data)
}

export function formDetail(data : IIdReq){
    return API.post(`/api/form/detail/${data.id}`)
        .then(res => res.data)
        .catch(res => res.data)
}

export function startCollectForm(data : IIdReq){
    return API.post(`/api/form/start`)
        .then(res => res.data)
        .catch(res => res.data)
}

export function endCollectForm(data : IIdReq){
    return API.post(`/api/form/end`)
        .then(res => res.data)
        .catch(res => res.data)
}
