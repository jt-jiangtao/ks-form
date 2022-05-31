import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "@/layout/App";
import {Provider} from 'react-redux';
import configureStore from "@/store";
import {getCacheObject} from "@/utils/localStorage";
import {ConfigProvider} from "antd";
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn'
import moment from "moment";

moment.locale("zh-cn")

const store = configureStore({
    cache: getCacheObject()
})
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // <React.StrictMode>
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ConfigProvider>
    // </React.StrictMode>
);

console.log("环境:", (!process.env.REACT_APP_ENV) ? "线上测试环境" : `本地${process.env.REACT_APP_ENV}服务`)
