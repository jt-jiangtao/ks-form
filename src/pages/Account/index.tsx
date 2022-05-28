import AccountInfo from "./components/AccountInfo"
import AccountHeader from "./components/AcoountHeader"
import AccountBox from "./components/AccountBox"
import { useEffect, useState } from "react"
import { login } from "@/services/auth"
import { changePwd , setInfo, getInfo } from "@/services"
import style from  "./style/Account.module.css"

export default function Account() {
    const [state,setState] = useState({
        account: "",
        avatar: "",
        ctime: 0,
        id: "3a28f1bc-1318-4f8b-a664-b368481452fe",
        nickname: "123",
        pwd: "",
        status: 0,
        utime: 0,
    })

    useEffect(() => {
        login({
            account: "123",
            pwd: "123"
        })
        getInfo().then(res=>{
            const userInfo = {...res.data.user}
            setState(userInfo)
        })
    }, []);
    
    const usedtime=(utime:number,ctime:number)=> {
        var time = (utime - ctime)/1000
        var days = Math.floor(time / (24 * 3600))
        return days
    }
    return (
        // const {nickname,avatar,utime,ctime,id} = state
        <div className={style['accout-container']}>
            <AccountHeader />
            <AccountInfo
                nickname={state.nickname}
                avatar="https://img.qwps.cn/FkUflVyvDzjFtCN0IsSTYAEs1znt?imageMogr2/thumbnail/180x180!"
                usedtime ={usedtime(state.utime,state.ctime)}
            />
            <AccountBox
                title="使用真实姓名，让工作伙伴认识你"
                content={state.nickname}
                operate="修改用户名"
                inputType="text"
                avatar=""
            />
            <AccountBox
                title="修改密码"
                content={state.pwd}
                operate="设置密码"
                inputType="password"
            /> 
        </div>
    )
}
