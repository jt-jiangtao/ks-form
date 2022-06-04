import AccountHeader from "./AcoountHeader"
import {useEffect, useRef, useState} from "react"
import style from "./style/account.module.scss"
import AccountInfo from "@/pages/Account/AccountInfo";
import {IUser} from "@/types/service/model";
import AccountBox from "@/pages/Account/AccountBox";
import Button from "@/components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {refreshUserInfo} from "@/store/actions";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import message from "@/components/Message";
import {changePwd, setInfo} from "@/services";
import {useNavigate} from "react-router";
import {clearCache} from "@/utils/localStorage";

const defaultUserInfo = {
    account: "",
    avatar: "",
    ctime: 0,
    id: "",
    nickname: "",
    pwd: "",
    status: 0,
    utime: 0,
}

export default function Account() {
    let [nameSetting, setNameSetting] = useState<boolean>(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(refreshUserInfo())
    }, [])
    const {user} = useSelector((state: any) => {
        return state.userInfo
    })
    const navigate = useNavigate()
    const confirmPwd__error = useRef<HTMLParagraphElement>(null)
    const [newNickName,setNewNickName] = useState<string>("")
    const [newPwd, setNewPwd] = useState<string>("")
    const [confirmPwd, setConfirmPwd] = useState<string>("")
    const [userInfo, setUserInfo] = useState<IUser>(user || defaultUserInfo)
    useEffect(() => {
        setUserInfo(user || defaultUserInfo)
    }, [user])

    const modifyUsername = () => {
        setNameSetting(true)
    }

    const confirmModify = () => {
        setNameSetting(false)
        setInfo({
            nickname:newNickName,
            avatar:user.avatar
        }).then(res=>{
            console.log(res)
            message.success("昵称修改成功",1000)
            dispatch(refreshUserInfo(true))
        })
    }
    const handleIptChangeNickname=(e:string)=>{
        setNewNickName(e)
    }
    const modifyPwd = () => {
        if (newPwd !== confirmPwd) {
            confirmPwd__error.current?.replaceChildren("两次输入的密码不一致")
        } else {
            confirmPwd__error.current?.replaceChildren("")
            changePwd({
                oldPwd: userInfo.pwd,
                pwd: newPwd,
                confirmPwd: confirmPwd
            }).then(res => {
                if (res.stat === 'ok'){
                    message.success("密码修改成功,请重新登录", 1000)
                    clearCache('login')
                    navigate("/signin")
                }
            })

        }
    }

    const handleIptChangeOld = (e: string) => {
        const newUserInfo = {...userInfo}
        newUserInfo.pwd = e
        setUserInfo(newUserInfo)
    }
    const handleIptChangeNew = (e: string) => {
        setNewPwd(e)
    }
    const handleIptChangeConfirm = (e: string) => {
        setConfirmPwd(e)
    }

    let [modifyVisible, setModifyVisible] = useState(false)

    // TODO: 封装按钮
    return (
        <div className={style["account-wrapper"]}>
            <div className={style['account-container']}>
                <AccountHeader/>
                <AccountInfo userInfo={userInfo}/>
                <AccountBox title={"使用真实姓名，让工作伙伴认识你 （一周内仅可修改 2 次昵称）"}>
                    <div className={style["setting"]}>
                        <div className={style["username"]}>
                            {
                                nameSetting ?
                                    <Input width="340" moreStyle={{height: 35}} type="text"
                                           value={userInfo.nickname}
                                           handleIptChange={handleIptChangeNickname}
                                    />
                                    : <span>{userInfo.nickname}</span>
                            }
                        </div>
                        <div className={[`${style["link"]}`, `${style["operate"]}`].join(' ')}>
                            {
                                nameSetting ?
                                    <>
                                        <Button
                                            onClick={() => setNameSetting(false)}
                                            className={style["button"]} type="default">取消</Button>
                                        <Button
                                            onClick={confirmModify}
                                            className={style["button"]} type="primary">确认</Button>
                                    </>
                                    : <span
                                        onClick={modifyUsername}
                                    >修改</span>
                            }
                        </div>
                    </div>
                </AccountBox>
                <AccountBox title={"安全设置"}>
                    <div className={style["setting"]}>
                        <div className={style["title"]}>设置密码</div>
                        <div
                            onClick={() => setModifyVisible(true)}
                            className={style["link"]}>设置
                        </div>
                        <Modal visible={modifyVisible} title={"修改密码"} footer={
                            <>
                                <Button
                                    onClick={() => setModifyVisible(false)}
                                    type="default">取消</Button>
                                <Button type="primary" onClick={modifyPwd}>确认</Button>
                            </>
                        }>
                            <div className={style["password-input"]}>
                                <Input width="472" placeholder="请输入旧密码" type="password"
                                       handleIptChange={handleIptChangeOld}
                                       showTogglePwd={true}
                                />
                            </div>
                            <div className={style["password-input"]}>
                                <Input width="472" placeholder="新密码" type="password"
                                       showTogglePwd={true}
                                       handleIptChange={handleIptChangeNew}
                                />
                            </div>
                            <div className={style["password-input-confirm"]}>
                                <Input width="472" placeholder="确认新密码" type="password"
                                       showTogglePwd={true}
                                       handleIptChange={handleIptChangeConfirm}
                                />
                            </div>
                            <p className={style.confirmPwd__error} ref={confirmPwd__error}/>
                        </Modal>
                    </div>
                </AccountBox>
            </div>
        </div>
    );
}
