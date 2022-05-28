import '@/styles/signin.scss'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router";
import SignLayout from "@/layout/SignLayout";
import { ILoginReq } from '@/types/service/request';
import { setCache } from '@/utils/localStorage';
import message from "@/components/Message";
import * as Loginin from "@/services/index"

export default function Signin() {
    const navigate = useNavigate()

    const Loginerr = useRef<HTMLParagraphElement>(null)
    const [user, setUser] = useState<ILoginReq>({
        account: "",
        pwd: ""
    })

    useEffect(() => {
        setUser(user)
    }, [user])

    function login() {
        if (user.account.trim() === "" ||
            user.pwd.trim() === "") {
            Loginerr.current?.replaceChildren("用户名或密码未输入")
        }
        else {
            Loginin.login({
                account: user.account,
                pwd: user.pwd
            })
                .then((res) => {
                    console.log(res)
                    if (res.stat === "ERR_ACCOUNT_NOT_FOUND") {
                        Loginerr.current?.replaceChildren("用户名或密码错误")
                    }
                    else if (res.stat === "ERR_PWD_NOT_CORRECT") {
                        Loginerr.current?.replaceChildren("用户名或密码错误")
                    }
                    else if (res.stat === "ok") {
                        setCache('logi', "true")
                        message.success("登陆成功", 1000)
                        navigate("/form-list")
                    }
                })
        }
    }
    return (
        <SignLayout>
            <div style={{
                minHeight: 270
            }}
                className="todo"
            >
                <form
                    className='signin-form'
                >
                    <div className='signin-title'>登录</div>
                    <div className='signin-user'>
                        <input
                            type='text'
                            className='signin-input'
                            placeholder='用户名'
                            onChange={(event) => {
                                user.account = event.target.value
                                setUser(user)
                                Loginerr.current?.replaceChildren("")
                            }}
                        >
                        </input>
                    </div>
                    <div className='signin-pwd'>
                        <input
                            type='password'
                            className='signin-input'
                            placeholder='密码'
                            onChange={(event) => {
                                user.pwd = event.target.value
                                setUser(user)
                                Loginerr.current?.replaceChildren("")
                            }}
                        >
                        </input>
                    </div>
                    <div className='signin-else'>
                        <div
                            className='signin-signup'
                            onClick={() => {
                                navigate("/signup")
                            }}>
                            尚未注册?
                        </div>
                        <p ref={Loginerr} className='signin-error'></p>
                    </div>
                    <div className='signin-login'>
                        <button className="signup-btn"
                            type='button'
                            onClick={login}
                        >
                            登录
                        </button>
                    </div>
                </form>
            </div>
        </SignLayout>
    )
}
