import React from "react";
import { useState, useRef, useEffect, useCallback, useReducer } from "react";
import {useLocation, useParams} from "react-router";
import HeaderLayout from "@/layout/HeaderLayout";
import logo from '@/assets/icon/logo.svg'
import "@/styles/Write/index.scss"

export default function Write() {
    const location = useLocation()
    const params = useParams()
    const { id } = params

    const [height, setHeight] = useState()
    const [visible, setVisible] = useState(true)

    const countWrap = useRef<HTMLDivElement>(null)

    function countProgress(total: number, finished: number): string {
        let percentage: number = (finished / total) * 100
        let result = Number(percentage).toFixed(2)
        result += "%"
        return result
    }
    console.log(countProgress(4, 1))
    // function ProgressClick() {
    //     setVisible(false)
    //     countWrap.current?.classList.add("menu-wrap-show")
    // }
    // function MenuClick() {
    //     setVisible(true)
    //     countWrap.current?.classList.remove("menu-wrap-show")
    // }
    let finished = 2  //填写完成的
    let total = 3     //所有的
    return (
        <React.Fragment>
            <HeaderLayout>
                <div className="logo-title">
                    <div className="logo">
                        <img src={logo} />
                    </div>
                    <div className="title">金山表单</div>
                </div>
            </HeaderLayout>
            <div className="write-page">
                <div ref={countWrap} className="index__count-wrap">
                    <div className="index__menus">
                        <div
                            className="progress-wrap"
                            style={{
                                display: visible ? "flex" : "none"
                            }}>
                            <div
                            // onClick={ProgressClick}
                            >
                                <div className="count-content">
                                    已填
                                    {finished}/{total}
                                </div>
                                <div className="count-progress">
                                    <span className="progress"
                                        style={{ height: countProgress(total, finished) }}
                                    >
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="menu-wrap"
                            style={{
                                display: visible ? "none" : "block"
                            }}
                        // onClick={MenuClick}
                        >
                            <div className="menu-wrap-container">
                                count2

                            </div>
                        </div>
                    </div>
                </div>
                <div className="write-place">
                    <div className="write-place-container">
                        <div className="write-new-form-place">
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
