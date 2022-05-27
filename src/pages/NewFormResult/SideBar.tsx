import Button from "@/components/Button/Button";
import {useLocation, useNavigate} from "react-router";
import {PlusOutlined} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import '@/styles/NewFormResult/index.scss'
import classNames from "classnames";
type SideBarProps = {
    active: string
}

export default function SideBar(props: SideBarProps){
    // 根据active选择当前sidebar
    const navigate = useNavigate()
    let location = useLocation();
    const btnClass = classNames({
        'nav-item':location.pathname === '/new-form-result',
        'nav-active':  location.pathname !== '/new-form-result'
      });
      const btnClas = classNames({
        'nav-item':location.pathname === '/w/:id',
        'nav-active': location.pathname !== '/w/:id'
      });
      const btnCla = classNames({
        'nav-item':location.pathname === '/account',
        'nav-active': location.pathname !== '/account'
      });
    return (
        <>
            
        <nav className="nav">
        <div className={btnClass} onClick={()=> navigate("/new-form-result")}>数据统计</div>
        {/* <NavLink className={({ isActive }) => "nav-item" + (isActive ? " " : "-active")} to={"/w/:id"}>shuju</NavLink>
        <NavLink className={({ isActive }) => "nav-item" + (isActive ? "nav-item " : "")} to={"/account"}>fenxiang </NavLink> */}
        <div className={btnClas} onClick={()=> navigate("/w/:id")}>表单问题</div>
        <div className={btnCla} onClick={()=> navigate("/account")}>分享</div> 
        </nav>
        </>
    )
}
