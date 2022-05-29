import React, {useState} from 'react'
import style from "./style/account.module.scss"
import Modal from "../../components/Modal/Modal"
import Button from "../../components/Button/Button"
import {IUser} from "@/types/service/model";
import {UploadOutlined} from "@ant-design/icons";

interface AccountInfoProps {
    userInfo: IUser
}

export default function AccountInfo(props: AccountInfoProps) {
    const {nickname, avatar} = props.userInfo
    const getUsedDay = (ctime: number) => {
        return Math.floor((new Date().getTime() - ctime) / (24 * 3600 * 1000))
    }
    const usedDay = getUsedDay(props.userInfo.ctime)
    const [visible, setVisible] = useState(false);
    const closeModel = () => {
        setVisible(false)
    }

    return (
        <div className={style['account-info']}>
            <div className={style['top-line']}>
                <span>{`已使用WPS云服务 ${usedDay}天`}</span>
            </div>
            <div className={style['avatar']}>
                <div className={style['avatar-icon']}>
                    <div className={style['user-avatar']}>
                        <img src={avatar || 'https://img.qwps.cn/620142388_aeaf477d9e15422f926a7f268f03adfe?imageMogr2/thumbnail/180x180!'} alt="avatar-icon" className={style['img-circle']}/>
                    </div>
                    <div className={style['avatar-mask']}>
                    <span onClick={() => {
                        setVisible(true)
                    }}>修改头像</span>
                    </div>
                    <Modal
                        visible={visible}
                        title="上传新头像"
                        onClose={closeModel}
                        footer={[
                            <Button key="cancel" type='default' onClick={closeModel}>取消</Button>,
                            <Button key="ok" type='primary' onClick={() => {
                                //上传头像
                                closeModel()
                            }}>确定</Button>
                        ]}>
                        <Button
                            icon={<UploadOutlined style={{color: '#82a5fe'}} />}
                            type="default">请选择要上传的图片</Button>
                    </Modal>
                </div>
                <div className={style['avatar-username']}>
                    <p>{nickname}</p>
                </div>
                <div className={style['avatar-userid-level']}>
                    <span className={style['avatar-userid']}>{`ID: ${props.userInfo.account}`}</span>
                </div>
            </div>
        </div>
    )
}
