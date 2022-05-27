import HeaderLayout from "@/layout/HeaderLayout";
import logo from "@/assets/icon/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SideBar from "@/pages/NewFormResult/SideBar";
import Code from "./components/Code";
import '@/styles/NewFormResult/index.scss'

// const QRCode = require('qrcode.react');
export default function Account(this: any) {
  let location = useLocation();
  let sidebarHash = ["mycreate", "share"];
  const parseSideBar = () => {
    if (location.hash.slice(1).length === 0) return "mycreate";
    else if (sidebarHash.indexOf(location.hash.slice(1)) !== -1)
      return location.hash.slice(1);
    return "mycreate";
  };
  let [sidebar] = useState(parseSideBar);
  const navigate = useNavigate();

  return (
    <section>
      <HeaderLayout className="form-list__header">
        <div className="return" onClick={() => navigate("/new-form-list")}>
          〈
        </div>
        <div className="logo-title">
          <div className="logo">
            <img src={logo} />
            <h1 className="title">这里是上个页面传进来的表的名字</h1>
          </div>
        </div>
      </HeaderLayout>
      <main className="middle">
        <div className="sideBar">
          <SideBar active={sidebar} />
        </div>
        <div className="result">
          <div className="box">
            
            <h3>分享邀请他人填写</h3>
            <div className="box_item">
            <div className="box_bor">
            <p>传进来的表的名字</p>
              <Code />
              </div>
              
            </div>
            
          </div>
        </div>
      </main>
    </section>
  );
}
