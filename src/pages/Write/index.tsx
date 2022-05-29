import React from "react";
import { useState, useRef, useEffect, useCallback, useReducer } from "react";
import {useLocation, useParams} from "react-router";
import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import "@/styles/Write/index.scss"
import {getForm} from "@/services";
import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {IForm} from "@/types/service/model";

export default function Write() {
    let [data, setData] = useState<IForm>()
    const {id} = useParams()
    useEffect(()=>{
        getForm({
            id: id || ''
        }).then(res=>{
            setData(res.data.item)
        })
    }, [id])

    return (
        <React.Fragment>
            <HeaderLayout className="write-header">
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
                            {data && <EditableProblemContent data={data}/>}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
