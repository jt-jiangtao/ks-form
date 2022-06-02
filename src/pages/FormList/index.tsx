import {useLocation, useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import '@/styles/FormList/index.scss'
import SideBar from "@/pages/FormList/SideBar";
import Content from "@/pages/FormList/Content";

export default function FormList() {
    let hash = useLocation().hash.slice(1)
    let navigate = useNavigate()
    let sidebarHash = ['mycreate', 'myedit', 'share', 'collect', 'recycle']
    let location = useLocation()
    const parseSideBar = () => {
        if (location.hash.slice(1).length === 0) navigate({
            hash: "#mycreate"
        })
        else if (sidebarHash.indexOf(location.hash.slice(1)) !== -1) return location.hash.slice(1)
        navigate({
            hash: "#mycreate"
        })
        return "mycreate"
    }
    let [sidebar, setSidebar] = useState(parseSideBar)

    useEffect(()=>{
        setSidebar(parseSideBar)
    }, [location])

    return (
        <section>
            <HeaderLayout className="form-list__header">
                <div className="logo-title">
                    <div className="logo">
                        <img src={logo}/>
                    </div>
                    <div className="title">金山表单</div>
                </div>
            </HeaderLayout>
            <div className="main">
                <div className="left-sideBar">
                    <SideBar active={sidebar}/>
                </div>
                <div className="content">
                    <div>{hash === "mycreate" && <Content/>}</div>
                </div>
            </div>
        </section>
    );
}
