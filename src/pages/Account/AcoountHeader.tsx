import { logout } from '@/services'
import { useNavigate } from "react-router";
import React, { useState } from 'react'
import style from "@/styles/Account/account.module.scss"
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

export default function AccountHeader() {
    const navigate = useNavigate()
    const [visible,setVisible] = useState(false)
    const close =()=>{
        setVisible(false)
    }

    const signOut=()=>{
        setVisible(true)
    }

    return (
        <div className={style["account-header"]}>
            <div className={style["header-title"]}>
                <span className={style["header-word-wps"]}>WPS</span>
                <span className={style["header-word-center"]}>个人中心</span>
            </div>
            <div className={style["logout-wrapper"]}>
                <div className={style["logout"]} onClick={signOut}>退出账号</div>
            </div>
            <Modal
                visible={visible}
                title="退出登录"
                onClose={close}
                footer={[
                    <Button key="cancel" type='default' onClick={close}>取消</Button>,
                    <Button key="ok" type='primary' onClick={()=>{
                        logout().then(res=>{
                        })
                        navigate('/signin')
                        close()
                    }}>确定</Button>
                ]}>
                <p>下次使用本帐号访问，可以继续访问你的个人数据</p>
            </Modal>
        </div>

    )
}
