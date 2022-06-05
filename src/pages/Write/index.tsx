import React from "react";
import { useState, useRef, useEffect, useCallback, useReducer } from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import style from "@/styles/Write/index.module.scss"
import {getForm} from "@/services";
import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {IForm} from "@/types/service/model";
import WriteSuccess from "@/pages/Write/WriteSuccess";

export default function Write() {
    const navigate = useNavigate()
    const location = useLocation()
    let [isSuccess, setIsSuccess] = useState(location.hash === "#success")
    if (document.body.clientWidth <= 640){
        navigate({
            pathname: `/m/w/${location.pathname.split("/")[location.pathname.split("/").length - 1]}`,
            search: location.search,
            hash: location.hash
        })
    }

    let [data, setData] = useState<IForm>()
    const {id} = useParams()
    useEffect(()=>{
        setIsSuccess(location.hash === "#success")
    }, [location])
    useEffect(()=>{
        getForm({
            id: id || ''
        }).then(res=>{
            setData(res.data.item)
        })
    }, [id])

    return (
        <>
            <HeaderLayout needLog={false} className={style["write-header"]}>
                <div onClick={() => navigate("/form-list")} className={style["logo-title"]}>
                    <div className={style["logo"]}>
                        <img src={logo} />
                    </div>
                    <div className={style["title"]}>金山表单</div>
                </div>
            </HeaderLayout>
            <div className={style["write-page"]}>
                <div className={style["write-place"]}>
                    <div className={style["write-place-container"]}>
                        <div className={style["write-new-form-place"]}>
                            {
                                isSuccess ? <WriteSuccess />
                                    : data && <EditableProblemContent canSubmit={true} data={data}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
