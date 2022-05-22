import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "@/layout/App";
import { Provider } from 'react-redux';
import configureStore from "@/store";
import {getCacheObject} from "@/utils/localStorage";
const store = configureStore({
    cache: getCacheObject()
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>
);

console.log("环境:",(!process.env.REACT_APP_ENV) ? "线上测试环境" : `本地${process.env.REACT_APP_ENV}服务`)
