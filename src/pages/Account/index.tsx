import AccountHeader from "./AcoountHeader"
import { useEffect, useState } from "react"
import { getInfo } from "@/services"
import style from  "./style/account.module.scss"
import AccountInfo from "@/pages/Account/AccountInfo";
import {IUser} from "@/types/service/model";
import AccountBox from "@/pages/Account/AccountBox";
import Button from "@/components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {refreshUserInfo} from "@/store/actions";
import Modal from "@/components/Modal/Modal";

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
    useEffect(()=>{
        dispatch(refreshUserInfo())
    }, [])
    const {user} = useSelector((state : any) => {
        return state.userInfo
    })
    const [userInfo, setUserInfo] = useState<IUser>(user || defaultUserInfo)
    useEffect(()=>{
        setUserInfo(user || defaultUserInfo)
    }, [user])

    const modifyUsername = () => {
      setNameSetting(true)
    }

    const confirmModify = () => {
      setNameSetting(false)
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
                                    <input
                                        value={userInfo.nickname}
                                        className={style["account-input"]} />
                                    : <span>{userInfo.nickname}</span>
                            }
                        </div>
                        <div className={[`${style["link"]}`,`${style["operate"]}`].join(' ')}>
                            {
                                nameSetting ?
                                    <>
                                        <Button
                                            onClick={()=> setNameSetting(false)}
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
                            onClick={()=>setModifyVisible(true)}
                            className={style["link"]}>设置</div>
                        <Modal visible={modifyVisible} title={"修改密码"} footer={
                            <>
                                <Button
                                    onClick={()=>setModifyVisible(false)}
                                    type="default">取消</Button>
                                <Button type="primary">确认</Button>
                            </>
                        } >
                            <div className={style["modify-password-title"]}>请设置登录密码</div>
                            <div className={style["password-input"]}>
                                <input className={style["account-input"]}/>
                            </div>
                            <div className={style["password-input"]}>
                                <input className={style["account-input"]}/>
                            </div>
                        </Modal>
                    </div>
                </AccountBox>
            </div>
        </div>
    );
}
