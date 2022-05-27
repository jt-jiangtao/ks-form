import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SideBar from "@/pages/NewFormResult/SideBar";

export default function Write(){
    let location = useLocation();
    let sidebarHash = ['mycreate', 'share']
    const parseSideBar = ()=>{
        if (location.hash.slice(1).length === 0)return 'mycreate'
        else if(sidebarHash.indexOf(location.hash.slice(1)) !== -1) return location.hash.slice(1)
        return  'mycreate'
    }
    let [sidebar] = useState(parseSideBar)
    const navigate = useNavigate()
    return (
        <section>
            <HeaderLayout className="form-list__header">
            <div className="return" onClick={()=> navigate("/new-form-list")}>
            〈
          </div>
                <div className="logo-title">
                    <div className="logo">
                        <img src={logo}/>
                        <h1 className="title">这里是上个页面传进来的表的名字</h1>
                    </div>
                    
                </div>
            </HeaderLayout>
            <main className="m">
                <div className="sideBar">
                    <SideBar active={sidebar} />
                </div>
                <div className="result">
                    Result
                </div>
            </main>
            
        </section>
    )
}


