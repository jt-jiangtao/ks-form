import {useEffect, useState, useRef} from 'react';
import {useNavigate} from "react-router";
import SignLayout from "@/layout/SignLayout";
import {ILoginReq} from '@/types/service/request';
import {setCache} from '@/utils/localStorage';
import message from "@/components/Message";
import * as LoginIn from "@/services/index"
import style from '@/styles/signin.module.scss'
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function Signin() {
    const navigate = useNavigate()
    const LoginError = useRef<HTMLParagraphElement>(null)
    const [user, setUser] = useState<ILoginReq>({
        account: "",
        pwd: ""
    })

    useEffect(() => {
        setUser(user)
    }, [user])

    const login = () => {
        // console.log(user.account.trim() !== "" && user.pwd.trim() !== "")
        if (user.account.trim() === "" ||
            user.pwd.trim() === "") {
            LoginError.current?.replaceChildren("用户名或密码未输入")
        } else {
            LoginIn.login({
                account: user.account,
                pwd: user.pwd
            })
                .then((res) => {
                    if (res.stat === "ERR_ACCOUNT_NOT_FOUND") {
                        LoginError.current?.replaceChildren("用户名或密码错误")
                    } else if (res.stat === "ERR_PWD_NOT_CORRECT") {
                        LoginError.current?.replaceChildren("用户名或密码错误")
                    } else if (res.stat === "ok") {
                        setCache('login', "true")
                        message.success("登陆成功", 1000)
                        navigate("/form-list")
                    }
                })
        }
    }
    // 用户名输入框值的回调
    const handleIptChangeAccount = (e: string) => {
        LoginError.current?.replaceChildren("")
        const newuser = {...user}
        newuser.account = e
        setUser(newuser)
    }
    // 密码输入框的回调
    const handleIptChangePwd = (e: string) => {
        LoginError.current?.replaceChildren("")
        const newuser = {...user}
        newuser.pwd = e
        setUser(newuser)
    }
    return (
        <SignLayout>
            <div className={style.signin_container}>
                <div className={style.signin_form}>
                    <div className={style.signin_title}>登录</div>
                    <div className={style.signin_user}>
                        <Input width="300" type='text' placeholder='用户名' handleIptChange={handleIptChangeAccount}/>
                    </div>
                    <div className={style.signin_pwd}>
                        <Input width="300" type='password' showTogglePwd={true} placeholder='密码'
                               handleIptChange={handleIptChangePwd}
                        />
                    </div>
                    <div className={style.signin_else}>
                        <div className={style.signin_reg}
                             onClick={() => {
                                 navigate("/signup")
                             }}>
                            尚未注册?
                        </div>
                        <p ref={LoginError} className={style.signin_error}/>
                    </div>
                    <div className={style.signin_login}>
                        {
                            user.account.trim() !== "" && user.pwd.trim() !== "" ?
                                <Button type="primary" style={{width: 300}} onClick={login}>
                                    登录
                                </Button>
                                :
                                <Button type="default" disabled={true} style={{width: 300}} onClick={login}>
                                    登录
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </SignLayout>
    )
}
