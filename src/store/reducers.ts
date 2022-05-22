import {RECEIVE_USER_INFO, SYNC_LOCALSTORAGE_DATA} from "@/store/actions";
import {combineReducers} from "redux";

function cache(state = {}, action : any){
    switch (action.type){
        case SYNC_LOCALSTORAGE_DATA:
            return action.data;
        default:
            return state
    }
}

function userInfo(state = {}, action : any){
    switch (action.type){
        case RECEIVE_USER_INFO:
            return action.data;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    userInfo,
    cache
})

export default rootReducer
