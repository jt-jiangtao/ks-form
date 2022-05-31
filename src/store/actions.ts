import { getInfo } from "@/services";
import { getCache } from "@/utils/localStorage";

export const RECEIVE_USER_INFO = 'ks-form/RECEIVE_USER_INFO'
export const SYNC_LOCALSTORAGE_DATA = 'ks-form/SYNC_LOCALSTORAGE_DATA'

function shouldFetchUserInfo(state: any, force: boolean) {
    if (force) return true
    let stateUserInfo = state.userInfo.user
    if (!!stateUserInfo) return false
    return true
}

export default function receiveUserInfo(res: any) {
    return {
        type: RECEIVE_USER_INFO,
        data: res
    }
}

function fetchUserInfo() {
    return (dispatch: any) => {
        return getInfo()
            .then(res => {
                if (res.stat === 'ok') dispatch(receiveUserInfo(res.data))
            })
    }
}

export function refreshUserInfo(force: boolean = false): any {
    return (dispatch: any, getState: any) => {
        if (shouldFetchUserInfo(getState(), force)) {
            return dispatch(fetchUserInfo())
        }
    }
}

export function syncLocalData(key: string) {
    return {
        type: SYNC_LOCALSTORAGE_DATA,
        data: {
            [key]: getCache(key)
        }
    }
}
