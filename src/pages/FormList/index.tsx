import {useLocation} from "react-router";
import React, {useState} from "react";
import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import '@/styles/FormList/index.scss'
import SideBar from "@/pages/FormList/SideBar";
import Content from "@/pages/FormList/Content";
import Myedit from "@/pages/FormList/Myedit";
import Myshare from "@/pages/FormList/Myshare";
import Mycollect from "@/pages/FormList/Mycollect";
import Recycle from "@/pages/FormList/Recycle";

export default function FormList() {
    let hash = useLocation().hash.slice(1)

    let sidebarHash = ['mycreate', 'share']
    let location = useLocation()
    const parseSideBar = () => {
        if (location.hash.slice(1).length === 0) return 'mycreate'
        else if (sidebarHash.indexOf(location.hash.slice(1)) !== -1) return location.hash.slice(1)
        return 'mycreate'
    }
    let [sidebar] = useState(parseSideBar)

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
                <div className="content">{hash === "content" && <Content/>}</div>
                <div>{hash === "myedit" && <Myedit/>}</div>
                <div>{hash === "share" && <Myshare/>}</div>
                <div>{hash === "collect" && <Mycollect/>}</div>
                <div>{hash === "recycle" && <Recycle/>}</div>
            </div>
        </section>
    );
}
