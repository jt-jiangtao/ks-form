import HeaderLayout from "@/layout/HeaderLayout";
import {LeftOutlined} from "@ant-design/icons";
import folder from "@/assets/icon/folder.svg";
import {useNavigate} from "react-router";
import {useContext, useState} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import "@/styles/NewFormCreate/Preview/index.scss"
import pcIcon from '@/assets/icon/pc.png'
import phoneIcon from '@/assets/icon/phone.png'
import classNames from "classnames";
import Button from "@/components/Button/Button";
import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";

export default function Preview(){
    const navigate = useNavigate()
    const {data} = useContext(DataInfoContext)
    let [isPC, setIsPC] = useState(true)

    const pcAndPhone = () => {
        return (
            <div className="window">
                <img
                    onClick={()=> setIsPC(true)}
                    className={classNames({
                        "img-active": isPC
                    })}
                    src={pcIcon} />
                <img
                    onClick={()=> setIsPC(false)}
                    className={classNames({
                        "img-active": !isPC
                    })}
                    src={phoneIcon} />
            </div>
        )
    }

    const renderPcAndPhoneContent = () => {
        return isPC ?
            <div className="pc-preview-content">
                <EditableProblemContent data={data} />
            </div>
            :
            <div className="phone-preview-container">
                <div className="phone-preview-content">

                </div>
            </div>
    }

    return (
        <div className="preview">
            <HeaderLayout
                center={pcAndPhone()}
                className="preview-header">
                <div className="preview-back">
                    <LeftOutlined onClick={() => navigate(-1)} className="back-icon"/>
                    <img className="folder-icon" src={folder}/>
                    <h1 className="create-title">{data.title || '新建表单'}</h1>
                </div>
            </HeaderLayout>
            <div className="preview-container">
                {renderPcAndPhoneContent()}
                <div className="preview-tools">
                    <Button onClick={() => navigate(-1)}>继续编辑</Button>
                    <Button type="primary">完成创建</Button>
                </div>
            </div>
        </div>
    );
}
