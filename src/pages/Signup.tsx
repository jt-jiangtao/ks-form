import SignLayout from "@/layout/SignLayout";
import {useState, useRef} from "react";
import {useNavigate} from "react-router";
import {IRegisterReq} from "@/types/service/request"
import {LeftOutlined} from '@ant-design/icons';
import message from "@/components/Message";
import style from '@/styles/signup.module.scss'
import * as LoginUp from "@/services/index";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

export default function Signup() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState<IRegisterReq>({
        account: "",
        pwd: "",
        confirmPwd: ""
    })
    const account__error = useRef<HTMLParagraphElement>(null)
    const pwd__error = useRef<HTMLParagraphElement>(null)
    const confirmPwd__error = useRef<HTMLParagraphElement>(null)

    // 验证密码位数是否正确
    const Test = () => {
        if (userInfo.pwd?.length <= 6 || userInfo.pwd?.length as number >= 16) {
            pwd__error.current?.replaceChildren("密码位数不正确")
        }
    }
    // 注册
    const register = () => {
        LoginUp.register({
            account: userInfo.account,
            pwd: userInfo.pwd,
            confirmPwd: userInfo.confirmPwd
        }).then(
            (res) => {
                // debugger
                // console.log(res)
                if (res.stat === "ok") {
                    message.success("注册成功,请登录！", 1000)
                    navigate("/signin")
                }
            })
    }

    // 用户名输入框失去焦点的回调
    const handleIptBlurAccount = (iptValue: string) => {
        if (userInfo.account === null || userInfo.account.trim() === "") {
            console.log(account__error)
            account__error.current?.replaceChildren("请输入用户名")
        }
    }
    // 密码输入框失去焦点的回调
    const handleIptBlurPwd = (iptValue: string) => {
        if (userInfo.pwd === null || userInfo.pwd.trim() === "") {
            pwd__error.current?.replaceChildren("请输入密码")
        }
    }
    // 确认密码输入框失去焦点的回调
    const handleIptBlurConfirmPwd = (iptValue: string) => {
        if (userInfo.pwd !== userInfo.confirmPwd) {
            confirmPwd__error.current?.replaceChildren("两次输入的密码不一致")
        }
    }

    // 用户名输入框值的回调
    const handleIptChangeAccount = (e: string) => {
        account__error.current?.replaceChildren("")
        const newUserInfo = {...userInfo}
        newUserInfo.account = e
        setUserInfo(newUserInfo)
    }
    // 密码输入框的回调
    const handleIptChangePwd = (e: string) => {
        pwd__error.current?.replaceChildren("")
        Test()
        const newUserInfo = {...userInfo}
        newUserInfo.pwd = e
        setUserInfo(newUserInfo)
    }
    // 确认密码输入框的回调
    const handleIptChangeConfirmPwd = (e: string) => {
        console.log(e)
        confirmPwd__error.current?.replaceChildren("")
        const newUserInfo = {...userInfo}
        newUserInfo.confirmPwd = e
        setUserInfo(newUserInfo)
    }

    return (
        <SignLayout>
            <div className={style.signup_container}>
                <div className={style.signup_form}>
                    <div className={style.signup_header}>
                        <div
                            className={style.signup_back}
                            onClick={() => {
                                navigate("/signin")
                            }}
                        ><LeftOutlined/></div>
                        <span className={style.signup_title}>账号注册</span>
                    </div>
                    <div className={style.signup_user}>
                        <Input width="295" type='text' placeholder='用户名'
                               handleIptBlur={handleIptBlurAccount}
                               moreStyle={{marginTop: 7, marginBottom: 7}}
                               handleIptChange={handleIptChangeAccount}
                        />
                        <p className={style.account__error} ref={account__error}/>
                    </div>
                    <div className={style.signup_pwd}>
                        <Input width="295" type='password' placeholder='密码'
                               showTogglePwd={true}
                               moreStyle={{marginTop: 7, marginBottom: 7}}
                               handleIptBlur={handleIptBlurPwd}
                               handleIptChange={handleIptChangePwd}
                        />
                        <p className={style.pwd__error} ref={pwd__error}/>
                    </div>
                    <div className={style.signup_pwd}>
                        <Input width="295" type='password' placeholder='确认密码'
                               showTogglePwd={true}
                               moreStyle={{marginTop: 7}}
                               handleIptBlur={handleIptBlurConfirmPwd}
                               handleIptChange={handleIptChangeConfirmPwd}/>
                        <p className={style.confirmPwd__error} ref={confirmPwd__error}/>
                    </div>
                    <div className={style.signup_tip}>密码为8-16位大小写字母、数字或符号的组合</div>
                    <div className={style.signup_login}>
                        {
                            userInfo.account.trim() !== "" && userInfo.pwd.trim() !== "" && userInfo.confirmPwd.trim() !== ""
                            && userInfo.pwd === userInfo.confirmPwd && (userInfo.pwd?.length > 7 && userInfo.pwd?.length as number <= 16) ?
                                < Button type="primary" style={{width: 295}} onClick={register}>注册</Button>
                                :
                                < Button type="default" disabled={true} style={{width: 295}}
                                         onClick={register}>注册</Button>
                        }
                    </div>
                </div>
            </div>
        </SignLayout>
    )
}
