import React from "react";
import { useState, useRef, useEffect, useCallback, useReducer } from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import "@/styles/Write/index.scss"
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
            <HeaderLayout needLog={false} className="write-header">
                <div className="logo-title">
                    <div className="logo">
                        <img src={logo} />
                    </div>
                    <div className="title">金山表单</div>
                </div>
            </HeaderLayout>
            <div className="write-page">
                <div className="write-place">
                    <div className="write-place-container">
                        <div className="write-new-form-place">
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
