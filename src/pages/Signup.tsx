import SignLayout from "@/layout/SignLayout";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { IRegisterReq } from "../types/service/request"
import message from "@/components/Message";
import '@/styles/signup.scss'
import * as Loginup from "@/services/index"

export default function Signup() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState<IRegisterReq>({
        account: "",
        pwd: "",
        confirmPwd: ""
    })
    const account = useRef<HTMLInputElement>(null)
    const pwd = useRef<HTMLInputElement>(null)
    const confirmPwd = useRef<HTMLInputElement>(null)
    const account__error = useRef<HTMLParagraphElement>(null)
    const pwd__error = useRef<HTMLParagraphElement>(null)
    const confirmPwd__error = useRef<HTMLParagraphElement>(null)

    const pwdStrength = useRef<HTMLDivElement>(null)
    const pwd__weak = useRef<HTMLSpanElement>(null)
    const pwd__middle = useRef<HTMLSpanElement>(null)
    const pwd__strong = useRef<HTMLSpanElement>(null)
    const Strength = useRef<HTMLParagraphElement>(null)

    let reg1 = /^(\d+|[a-z]+|[A-Z]+|[^a-zA-Z0-9]+)$/;
    let reg2 = /^(\w+|([0-9]+[^a-zA-Z0-9]+)|([a-z]+[^a-zA-Z0-9]+)|([A-Z]+[^a-zA-Z0-9]+)|[^a-zA-Z0-9]+[0-9]+|[^a-zA-Z0-9]+[a-z]+|[^a-zA-Z0-9]+[A-Z]+)$/;
    let reg3 = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/;

    function Test() {
        if (pwd.current?.value.length as number < 8 ||
            pwd.current?.value.length as number > 16) {
            pwd__error.current?.replaceChildren("密码位数不正确")
            pwdStrength.current?.classList.remove("show")
        }
        else if (reg1.test(pwd.current?.value as string)) {
            console.log("弱")
            if (pwd__weak.current?.classList.contains("pwd__strong")) {
                pwd__weak.current.classList.remove("pwd__strong")
                pwd__weak.current.classList.remove("pwd__middle")
                pwd__strong.current?.classList.remove("pwd__strong")
            }
            if (pwd__weak.current?.classList.contains("pwd__middle")) {
                pwd__weak.current.classList.remove("pwd__middle")
                pwd__middle.current?.classList.remove("pwd__middle")
                Strength.current?.classList.replace("__middle", "__week")
            }
            pwdStrength.current?.classList.add("show")
            pwd__weak.current?.classList.add("pwd__week")
            Strength.current?.replaceChildren("强度弱")
            Strength.current?.classList.add("__week")
        }
        else if (reg2.test(pwd.current?.value as string)) {
            console.log("中")
            if (pwd__middle.current?.classList.contains("pwd__strong")) {
                pwd__middle.current.classList.remove("pwd__strong")
                pwd__strong.current?.classList.remove("pwd__strong")
                pwd__weak.current?.classList.replace("pwd__strong", "pwd__middle")
                Strength.current?.classList.replace("__strong", "__middle")
            }
            pwdStrength.current?.classList.add("show")
            pwd__weak.current?.classList.add("pwd__middle")
            pwd__weak.current?.classList.replace("pwd__week", "pwd__middle")
            pwd__middle.current?.classList.add("pwd__middle")
            Strength.current?.replaceChildren("强度中")
            Strength.current?.classList.add( "__middle")
            Strength.current?.classList.replace("__week", "__middle")
        }
        else if (reg3.test(pwd.current?.value as string)) {
            console.log("强")
            pwdStrength.current?.classList.add("show")
            pwd__weak.current?.classList.replace("pwd__middle", "pwd__strong")
            pwd__weak.current?.classList.add("pwd__strong")
            pwd__middle.current?.classList.replace("pwd__middle", "pwd__strong")
            pwd__strong.current?.classList.add("pwd__strong")
            pwd__middle.current?.classList.add("pwd__strong")
            Strength.current?.classList.add( "__strong")
            Strength.current?.replaceChildren("强度强")
            Strength.current?.classList.replace("__middle", "__strong")
        }
    }

    function register() {
        if (
            account.current === null ||
            userInfo.account.trim() === "") {
            account__error.current?.replaceChildren("请输入用户名")
        }
        if (
            pwd.current === null ||
            userInfo.pwd.trim() === "") {
            pwd__error.current?.replaceChildren("请输入密码")
        }
        if (
            confirmPwd.current === null ||
            userInfo.confirmPwd.trim() === "") {
            confirmPwd__error.current?.replaceChildren("请输入密码")
        }
        if (
            pwd.current?.value !==
            confirmPwd.current?.value) {
            confirmPwd__error.current?.replaceChildren("两次输入的密码不一致")
        }
        else if (
            account.current !== null &&
            pwd.current !== null &&
            confirmPwd.current !== null &&
            userInfo.account.trim() !== "" &&
            userInfo.pwd.trim() !== "" &&
            userInfo.confirmPwd.trim() !== ""
        ) {
            Loginup.register({
                account: account.current.value,
                pwd: pwd.current.value,
                confirmPwd: confirmPwd.current.value
            })
                .then(
                    (res) => {
                        console.log(res)
                        if(res.stat === "ok"){
                            message.success("注册成功",1000)
                            navigate("/signin")
                        }
                    })
            console.log(123)
        }
    }

    return (
        <SignLayout>
            <div style={{
                minHeight: 270
            }}
                className="todo"
            >
                <form className="signup-form">
                    <div className="signup-header">
                        <div
                            className="signup-back"
                            onClick={() => {
                                navigate("/signin")
                            }}
                        >{"<"}</div>
                        <span className="signup-title">账号注册</span>
                    </div>
                    <div className='signup-user'>
                        <input
                            type='text'
                            className='signup-input'
                            placeholder='用户名'
                            ref={account}
                            onChange={(event) => {
                                account__error.current?.replaceChildren("")
                                userInfo.account = event.target.value
                                setUserInfo(userInfo)
                            }}
                        >
                        </input>
                        <p className="account__error" ref={account__error}></p>
                    </div>
                    <div className='signup-pwd'>
                        <input
                            type='password'
                            className='signup-input'
                            placeholder='密码'
                            ref={pwd}
                            onChange={(event) => {
                                pwd__error.current?.replaceChildren("")
                                Test()
                                userInfo.pwd = event.target.value
                                setUserInfo(userInfo)
                            }}
                        >
                        </input>
                        <p className="pwd__error" ref={pwd__error}></p>
                        <div ref={pwdStrength} className="pwdStrength">
                            <span ref={pwd__weak} ></span>
                            <span ref={pwd__middle} ></span>
                            <span ref={pwd__strong} ></span>
                            <p ref={Strength}>强</p>
                        </div>
                    </div>
                    <div className='signup-pwd'>
                        <input
                            type='password'
                            className='signup-input'
                            placeholder='确认密码'
                            ref={confirmPwd}
                            onChange={(event) => {
                                confirmPwd__error.current?.replaceChildren("")
                                userInfo.confirmPwd = event.target.value
                                setUserInfo(userInfo)
                            }}
                        >
                        </input>
                        <p className="confirmPwd__error" ref={confirmPwd__error}></p>
                    </div>
                    <div className="signup-tip">密码为8-16位大小写字母、数字或符号的组合</div>
                    <div
                        className='signup-login'
                    >
                        <button className="signup-btn"
                            type='button'
                            onClick={register}
                        >
                            注册
                        </button>
                    </div>
                </form>
            </div>
        </SignLayout>
    )
}
