import React from "react";
import '@/styles/HeaderLayout.scss'
import {useDispatch, useSelector} from "react-redux";
import {refreshUserInfo} from "@/store/actions";
import classNames from "classnames";
import {useNavigate} from "react-router";

type HeaderLayoutProps = {
    children?: string | null | JSX.Element | React.ReactNode
    center?: string | null | JSX.Element | React.ReactNode
    className ?: string
}

export default function HeaderLayout(props: HeaderLayoutProps) {
    const dispatch = useDispatch()
    dispatch(refreshUserInfo())
    const {user} = useSelector((state: any) => {
        return state.userInfo
    })
    let navigate = useNavigate()
    return (
        <div className={"header-layout__wrapper " + props.className}>
            <div className="left-wrapper">
                {
                    props.children
                }
            </div>
            <div className="center-wrapper">
                {
                    props.center
                }
            </div>
            <div className="right-wrapper" onClick={()=> navigate("/account")}>
                <a href="#">
                    <img className="user-avatar"
                         src={user?.avatar || 'https://img.qwps.cn/620142388_aeaf477d9e15422f926a7f268f03adfe?imageMogr2/thumbnail/180x180!'}/>
                </a>
                <div className="username">
                    {user?.nickname || 'username'}
                </div>
            </div>
        </div>
    );
}
