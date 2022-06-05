import React from "react";
import '@/styles/layout/HeaderLayout.scss'
import {useDispatch, useSelector} from "react-redux";
import {refreshUserInfo} from "@/store/actions";

type HeaderLayoutProps = {
    children?: string | null | JSX.Element | React.ReactNode
    center?: string | null | JSX.Element | React.ReactNode
    className ?: string,
    needLog ?: boolean
}

export default function HeaderLayout(props: HeaderLayoutProps) {
    const {needLog = true} = props
    const dispatch = useDispatch()
    if (needLog){
        dispatch(refreshUserInfo())
    }
    const {user} = useSelector((state: any) => {
        return state.userInfo
    })
    const newPage = (url : string) => {
        const w : any = window.open('_black')
        w.location.href = url
    }
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
            {
                !needLog ? <div className="right-wrapper" />
                    : <div className="right-wrapper" onClick={()=> newPage("/account")}>
                        <a href="#">
                            <img className="user-avatar"
                                 src={user?.avatar || 'https://img.qwps.cn/620142388_aeaf477d9e15422f926a7f268f03adfe?imageMogr2/thumbnail/180x180!'}/>
                        </a>
                        <div className="username">
                            {user?.nickname || '未登录'}
                        </div>
                    </div>
            }
        </div>
    );
}
