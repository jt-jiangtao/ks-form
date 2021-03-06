import HeaderLayout from "@/layout/HeaderLayout";
import {LeftOutlined} from "@ant-design/icons";
import folder from "@/assets/icon/folder.svg";
import {useLocation, useNavigate} from "react-router";
import React, {useContext, useState} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import "@/styles/NewFormCreate/Preview/index.scss"
import pcIcon from '@/assets/icon/pc.png'
import phoneIcon from '@/assets/icon/phone.png'
import classNames from "classnames";
import Button from "@/components/Button/Button";
import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {createForm, deleteForm, startCollectForm} from "@/services";
import {parseSearch} from "@/utils/uri";
import message from "@/components/Message";
import logo from "@/assets/icon/logo.svg";
import {checkProblems} from "@/utils/validate";

export default function Preview() {
    const navigate = useNavigate()
    const location = useLocation()
    const {data} = useContext(DataInfoContext)
    let [isPC, setIsPC] = useState(true)
    let [isCreate] = useState<boolean>(location.search.slice(1).split("=").indexOf('id') === -1)

    const pcAndPhone = () => {
        return (
            <div className="window">
                <img
                    onClick={() => setIsPC(true)}
                    className={classNames({
                        "img-active": isPC
                    })}
                    src={pcIcon}/>
                <img
                    onClick={() => setIsPC(false)}
                    className={classNames({
                        "img-active": !isPC
                    })}
                    src={phoneIcon}/>
            </div>
        )
    }

    const renderPcAndPhoneContent = () => {
        return isPC ?
            <div className="pc-preview-content">
                <EditableProblemContent data={data}/>
            </div>
            :
            <div className="phone-preview-container">
                <div className="phone-preview-content">
                    <div className="content-wrapper">
                        <div className="phone-content">
                            <div className="phone-container">
                                {data && <EditableProblemContent canSubmit={false} data={data}/>}
                            </div>
                            <div className="phone-footer">
                                <div className="footer-content">
                                    <img alt="" className="phone-img" src={logo}/>
                                    ???
                                    <span className="logo-text">????????????</span>
                                    ????????????????????????
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }

    const createFormWithoutPut = async () => {
        let form = await createForm(data)
        await startCollectForm({
            id: form.data.id
        }).then(res => {
            navigate({
                pathname: "/new-form-result",
                hash: "#share",
                search: `?id=${form.data.id}`
            })
        })
    }

    const completeForm = async () => {
        if (!checkProblems(data)) return
        if (isCreate) {
            await createFormWithoutPut()
        } else {
            let res = await deleteForm({
                id: parseSearch(location.search, 'id')
            })
            if (res.stat === 'ok') {
                try {
                    await createFormWithoutPut()
                } catch (e) {
                    message.error("??????????????????")
                }
            } else {
                message.error("??????????????????")
            }
        }
    }

    return (
        <div className="preview">
            <HeaderLayout
                center={pcAndPhone()}
                className="preview-header">
                <div onClick={() => navigate(-1)} className="preview-backup">
                    <LeftOutlined className="back-icon-left"/>
                    <img className="folder-icon-left" src={folder}/>
                    <h1 className="create-title-left">{data.title || '????????????'}</h1>
                </div>
            </HeaderLayout>
            <div className="preview-container">
                {renderPcAndPhoneContent()}
                <div className="preview-tools">
                    <Button onClick={() => navigate(-1)}>????????????</Button>
                    <Button
                        onClick={completeForm}
                        type="primary">????????????</Button>
                </div>
            </div>
        </div>
    );
}
