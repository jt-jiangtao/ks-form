import React, {useState} from 'react'
import style from "@/styles/Account/account.module.scss"
import Modal from "../../components/Modal/Modal"
import Button from "../../components/Button/Button"
import {IUser} from "@/types/service/model";
import {LoadingOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {Upload, UploadProps} from "antd";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import message from "@/components/Message";
import {UploadFile} from "antd/es/upload/interface";
import {setInfo} from "@/services";
import {refreshUserInfo} from "@/store/actions";
import {useDispatch, useSelector} from "react-redux";

interface AccountInfoProps {
    userInfo: IUser
}

export default function AccountInfo(props: AccountInfoProps) {
    const {nickname, avatar} = props.userInfo
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(avatar);
    const dispatch = useDispatch()
    const getUsedDay = (ctime: number) => {
        return Math.floor((new Date().getTime() - ctime) / (24 * 3600 * 1000))
    }
    const usedDay = getUsedDay(props.userInfo.ctime)
    const [visible, setVisible] = useState(false);
    const closeModel = () => {
        if (avatar === imageUrl){
            message.info("请上传新头像")
            return
        }
        setInfo({
            nickname: nickname,
            avatar: imageUrl
        }).then(res=>{
            message.success("头像修改成功",1000)
            dispatch(refreshUserInfo(true))
            setVisible(false)
        })
    }

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('上传图片只能为jpeg和png格式');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('上传图片必须小于5MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            let response = info.file.response
            if (response.status === '200'){
                setImageUrl(response.url)
            }else{
                message.error("上传失败")
            }
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传头像</div>
        </div>
    );

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
                        onClose={()=> setVisible(false)}
                        footer={[
                            <Button key="cancel" type='default' onClick={()=> setVisible(false)}>取消</Button>,
                            <Button key="ok" type='primary' onClick={() => {
                                //上传头像
                                closeModel()
                            }}>确定</Button>
                        ]}>
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://upload.jiangtao.website/upload/image"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
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
