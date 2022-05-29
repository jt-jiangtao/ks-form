import React, { useState } from 'react'
import style from './style/account.module.scss'
interface  AccountBoxProps {
    title : string,
    children : React.ReactNode
}

export default function AccountBox(props: AccountBoxProps) {

  return (
    <div className={style['account-box']}>
        <div className={style['line-top']}>
            <span>{props.title}</span>
        </div>
        <div className={style["container"]}>
            {props.children}
        </div>
    </div>
  )
}
