import {applyMiddleware, createStore} from "redux";
import rootReducer from "@/store/reducers";
import thunkMiddleware from 'redux-thunk'

export default function configureStore(preloadedState : any = {}) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
}
