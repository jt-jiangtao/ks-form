import React from "react";
import { useState, useRef, useEffect, useCallback, useReducer } from "react";
import {useLocation, useParams} from "react-router";
import logo from '@/assets/icon/logo.svg'
import "@/styles/Write/index.scss"
import {getForm} from "@/services";
import EditableProblemContent from "@/pages/ProblemContent/EditableProblemContent";
import {IForm} from "@/types/service/model";

export default function PhoneWrite() {
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
            <div className="phone-container">
                {data && <EditableProblemContent canSubmit={true} data={data}/>}
            </div>
            <div className="phone-footer">
                <div className="footer-content">
                    <img src={logo}/>
                    由
                    <span className="logo-text">金山文档</span>
                    旗下表单提供服务
                </div>
            </div>
        </React.Fragment>
    )
}

