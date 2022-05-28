import React, { useState } from 'react'
import style from '../style/Account.module.css'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import {Message}  from '@/components/Message/message'
import { changePwd , setInfo} from "@/services"

type operateType  = '修改用户名'  | '设置密码' | '查看' | '删除'
type inputType = 'text' | 'password' | 'file' |'image' | 'submit'
interface  AccountBoxProps {
    title : string,
    content: string,
    operate: operateType,
    inputType: inputType,
    avatar?: string
}

export default function AccountBox(props: AccountBoxProps) {

    const [state,setState] =useState({
        onClicked:false,
        visible:false
    })
    const [text,setText]= useState("")
    const [pwd,setPwd]= useState("")
    const [confirmPwd,setconfirmPwd]= useState("")
    const inputChange =(e:any)=>{
        var NewText = e.target.value
        return NewText
    }
    
    const onClicked= ()=>{
        setState({
            onClicked:true,
            visible:true
        })
    }
    const close =()=>{
        setState({
            onClicked:false,
            visible:false
        })
    }
    const checkPwd=(pwd:string,confirmPwd:string)=>{
        if(pwd===confirmPwd && pwd !==""){
            return <Message key="success" text='密码一致' type="success"/>
        }else{
            return <Message key="error" text='输入密码不一致' type="error"/>
        }
    }
    function siwtchDiv(operate:operateType) {
        switch (operate) {
        case "修改用户名":
            return (
                <>
                <Button key="cancel" type='default' onClick={close}>取消</Button>
                <Button key="ok" type='primary' onClick={()=>{
                    // 获取输入框内容发送修改请求
                    const SetUserInfoReq = {
                        nickname:text,
                        avatar:""
                    }
                    setInfo(SetUserInfoReq).then(res=>{
                        console.log(res.data)
                    })
                    const NewText = text
                    console.log("输入框的内容"+NewText)
                    close()
                }}>确定</Button>
                </>
            )
        case '设置密码':
            return(
                <>
                <Modal
                    key="changePwd"
                    visible={state.visible}
                    title="设置密码"
                    onClose={close} 
                    footer={[
                        <Button key="cancel" type='default' onClick={close}>取消</Button>,
                        <Button key="ok" type='primary' onClick={()=>{
                            const data = {
                                pwd: pwd,
                                oldPwd: props.content,
                                confirmPwd: confirmPwd
                            }
                            // 密码确认 
                            if (pwd === confirmPwd){
                                changePwd(data).then(res=>{
                                    console.log(res.data.stat)
                                })
                            }

                            close()
                        }}>确定</Button>,
                        pwd!=="" && confirmPwd!==""?<div>{checkPwd(pwd,confirmPwd)}</div> : null
                        
                    ]}>
                    <input key="newPwd" className={style['AccountInput']} type="password" placeholder="请出入新密码" onChange={(e) =>{
                        const NewInput = inputChange(e)
                        setPwd(NewInput)
                    }}/>
                    <br />
                    <input key="confirmPwd" className={style['AccountInput']} type="password" placeholder="请确认密码" onChange={(e) =>{
                        const NewInput = inputChange(e)
                        setconfirmPwd(NewInput)
                    }}/>
                </Modal>
                </>
            )
        default:
            return(
                <a onClick={()=>onClicked}>{props.operate}</a>
            )
    }
    }
  return (
    <div className={style['account-box']}>
        <div className={style['line-top']}>
            <span>{props.title}</span>
        </div>
        <div className={style["container"]}>
            <div className={style['el-row']}>
                <div className={style['left-el']}>
                    {/* {props.content} */}
                    <input key="input" className={style['AccountInput']} type={props.inputType} placeholder="请出入" defaultValue={props.content} onChange={(e) =>{
                        const NewInput = inputChange(e)
                        setText(NewInput)
                    }}
                    />
                </div>
                <div className={style['right-el']}>
                    { 
                        state.onClicked ? siwtchDiv(props.operate) : <a onClick={()=>onClicked()}>{props.operate}</a>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
