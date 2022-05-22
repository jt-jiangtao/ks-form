import React from "react";
import '@/styles/SignLayout.scss'

type SignLayoutProps = {
    children ?: string | null | JSX.Element | React.ReactNode
}

export default function SignLayout(props : SignLayoutProps){

    return (
        <div className="sign-layout__wrapper">
            <div className="sign">
                <div className="sign__container">
                    <span className="logo"/>
                </div>
            </div>
            <div className="sign__main">
                {props.children}
            </div>
        </div>
    );
}
