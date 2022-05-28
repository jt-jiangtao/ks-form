import React, { useState } from 'react'
import {CrownOutlined} from "@ant-design/icons";
import style from "../style/Account.module.css"
import Modal from "../../../components/Modal/Modal"
import Button from "../../../components/Button/Button"
interface AccountInfoProps{
    nickname: string
    avatar: string
    usedtime: number
}

export default function AccountInfo(props: AccountInfoProps) {
  
  const {nickname,avatar,usedtime} = props
  const [visible, setVisible] = useState(false); 
  const closeModel=() =>{
    setVisible(false)
  }
  return (
    <div className={style['account-info']}>
        <div className='top-line'>
            <span>已使用WPS云服务 {usedtime}天</span>
        </div>
        <div className={style['avatar']}>
            <div className={style['avatar-icon']}>
                <div className={style['user-avatar']}>
                    <img src={avatar} alt="avatar-icon" className={style['img-circle']}/>
                </div>
                <div className={style['avatar-mask']}>
                    <span onClick={()=>{
                        setVisible(true)
                    }}>修改头像</span>
                </div>
                <Modal 
                    visible = {visible} 
                    title="上传新头像" 
                    onClose={closeModel}
                    footer={[
                        <Button key="cancel" type='default' onClick={closeModel}>取消</Button>,
                        <Button key="ok" type='primary' onClick={()=>{
                            //上传头像
                            closeModel()
                        }}>确定</Button>
                    ]}>
                        <img src={avatar} alt="avatar-icon" style={{overflow:"hidden", width:"160px"}} />
                </Modal>
            </div>
        </div>
        <div className={style['avatar-username']}>
            <p>{nickname}</p>
        </div>
        <div className={style['avatar-userid-level']}>
            <span className={style['avatar-userid']}>userid: 123</span>
            <span className={style['avatar-line']}></span>
            <span className={style['member-button']}>
                <CrownOutlined className={style[' vip-icon']}/>
                <span>普通用户</span>
            </span>
        </div>
    </div>
  )
}
