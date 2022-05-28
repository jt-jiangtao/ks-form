import HeaderLayout from "@/layout/HeaderLayout";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavigateBar from "@/pages/NewFormResult/NavigateBar";
import "@/styles/NewFormResult/index.scss";
import {LeftOutlined} from "@ant-design/icons";
import folder from "@/assets/icon/folder.svg";
import {useLocation} from "react-router";
import Content from "@/pages/NewFormResult/Content";
import {IForm} from "@/types/service/model";
import {getForm} from "@/services";
import {parseSearch} from "@/utils/uri";

export default function NewFormResult() {
    const navigate = useNavigate();
    const location = useLocation()
    const getHash = () => {
        if (!location.hash) {
            navigate({
                hash: "#share"
            })
        }
        let hash = location.hash.slice(1)
        if (["share", "data", "problem"].indexOf(hash) === -1) {
            navigate({
                hash: "#share",
            })
        }
        return hash
    }
    let [hash, setHash] = useState(getHash)
    let [form, setForm] = useState<IForm>()
    useEffect(() => {
        setHash(getHash)
    }, [location.hash])
    useEffect(()=>{
        getForm({
            id: parseSearch(location.search, 'id')
        }).then(res => {
            setForm(res.data.item)
        })
    }, [location.search])

    return (
        <div className="result-container">
            <HeaderLayout className="result-header">
                <div className="preview-back">
                    <LeftOutlined onClick={() => navigate("/form-list")} className="back-icon"/>
                    <img className="folder-icon" src={folder}/>
                    <h1 className="create-title">{form?.title || '新建表单'}</h1>
                </div>
            </HeaderLayout>
            <main>
                <div className="sideBar">
                    <NavigateBar active={hash}/>
                </div>
                <div className="result-content-scroll">
                    <div className="result-content">
                        <Content active={hash} data={form} />
                    </div>
                </div>
            </main>
        </div>
    );
}
