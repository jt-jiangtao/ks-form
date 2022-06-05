import React from "react";
import {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router";
import logo from '@/assets/icon/logo.svg'
import style from  "@/styles/Write/index.module.scss"
import {getForm} from "@/services";
import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {IForm} from "@/types/service/model";
import WriteSuccess from "@/pages/Write/WriteSuccess";

export default function PhoneWrite() {
    const location = useLocation()
    let [isPreview, setIsPreview] = useState(location.hash === "#preview")
    let [isSuccess, setIsSuccess] = useState(location.hash === "#success")
    useEffect(() => {
        setIsPreview(location.hash === "#preview")
        setIsSuccess(location.hash === "#success")
    }, [location])
    let [data, setData] = useState<IForm>()
    const {id} = useParams()
    useEffect(() => {
        getForm({
            id: id || ''
        }).then(res => {
            setData(res.data.item)
        })
    }, [id])

    return (
        <>
            {
                isSuccess ?
                    (
                        <>
                            <WriteSuccess/>
                        </>
                    ) : (
                        <>
                            <div className={style["phone-container"]}>
                                {data && <EditableProblemContent canSubmit={!isPreview} data={data}/>}
                            </div>
                            <div className={style["phone-footer"]}>
                                <div className={style["footer-content"]}>
                                    <img alt="" src={logo}/>
                                    由
                                    <span className={style["logo-text"]}>金山文档</span>
                                    旗下表单提供服务
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    )
}

