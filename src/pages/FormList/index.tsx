import {useLocation} from "react-router";
import React, {useState} from "react";
import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import '@/styles/FormList/index.scss'
import SideBar from "@/pages/FormList/SideBar";
import Content from "@/pages/FormList/Content";

export default function FormList(){
    let sidebarHash = ['mycreate', 'share']
    let location = useLocation()
    const parseSideBar = ()=>{
        if (location.hash.slice(1).length === 0)return 'mycreate'
        else if(sidebarHash.indexOf(location.hash.slice(1)) !== -1) return location.hash.slice(1)
        return  'mycreate'
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
                    <SideBar active={sidebar} />
                </div>
                <div className="content">
                    <Content sidebar={sidebar} />
                </div>
            </div>
        </section>
    );
}
