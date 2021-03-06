import React, {useEffect, useState} from 'react';
import "./table.scss";
import {cancelStarForm, formResult, starForm} from "@/services";
import message from "@/components/Message";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import {useNavigate} from "react-router";

interface ITable {
    // 传入的id
    id: string,
    // 表格每一项的index
    index:number,
    title: string,
    // 创建时间
    ctime: number,
    // 是否标星
    isStar: boolean,
    // 当前状态
    status: number,
    // 删除表单
    deleteFormItem: (id: string, event : any) => void
    // 发布表单
    releaseFormItem: (id: string,index:number, event : any) => void
    // 停止收集表单
    stopCollectForm: (id: string,index:number, event : any) => void
}

export default function Table(Props: ITable) {
    const navigate = useNavigate()
    // 解构赋值
    const {index,title, ctime, isStar, status, id, deleteFormItem, releaseFormItem, stopCollectForm} = Props
    // 是否标星的状态
    const [star, setStar] = useState<boolean>(isStar)
    // 模态框是否可见
    const [visible, setVisible] = useState<boolean>(false)
    // 每个表单收集的数据总份数
    let [total, setTotal] = useState<number>(0)
    // 时间戳转年月日的函数
    let moment = require('moment')
    // 模态框内容部分
    const children = <div>您确定要删除此表单吗，删除后将无法填写表单和查看表单记录</div>
    // 标星与取消标星，先判断一下当前的状态，再调用不同的方法

    useEffect(()=>{
        formResult({
            id:id
        }).then(res=>{
            setTotal(res.data.items.length)
        })
    },[])

    const changeIsStar = (id: string, event: any) => {
        event.stopPropagation()
        if (star) {
            cancelStarForm({id}).then(res => {
                setStar(!star)
                message.success("取消标星成功！")
            })
        } else {
            starForm({id}).then(res => {
                setStar(!star)
                message.success("标星成功！")
            })
        }
    }

    // 当前状态
    const currentStatus = (status: number) => {
        if (status === 2) {
            return (<div className="draft">草稿</div>)
        }else if (status === 3) {
            return (<div className="collecting">{`正在收集 ${total}份`}</div>)
        }else if (status === 4) {
            return (<div className="over">{`已结束 收集${total}份`}</div>)
        }
    }

    // 打开模态框
    const handleClick = (event : any) => {
        event.stopPropagation()
        setVisible(!visible)
    }

    // 关闭模态框
    const closeModal = (event : any) => {
        event.stopPropagation()
        setVisible(false)
    }

    // 操作栏
    const operation = (status: number) => {
        if (status === 2) {
            return (
                <>
                    <Button style={{marginRight: 10}} onClick={(event : any) => {
                        releaseFormItem(id,index, event)
                    }}>发布</Button>
                    <Button
                        onClick={(event : any)=> editForm(id, event)}
                        style={{marginRight: 10}}>编辑</Button>
                    <Button type="primary" danger size="middle" onClick={handleClick}
                            style={{marginRight: 10}}>删除</Button>
                    <Modal visible={visible}
                           title="删除表单"
                           children={children}
                           footer={[
                               // 实现关闭窗口的逻辑
                               <Button key="cancel" style={{marginRight: 10}} onClick={closeModal}>取消</Button>,
                               // 实现关闭窗口的逻辑
                               <Button key="ok" type="primary" onClick={(event : any) => deleteFormItem(id, event)}>确认</Button>
                           ]}
                           onClose={closeModal}
                    />
                </>
            )
        }
        if (status === 3) {
            return (
                <>
                    <Button
                        onClick={(event : any)=> shareForm(id, event)}
                        style={{marginRight: 10}}>分享</Button>
                    <Button
                        onClick={(event : any)=> viewResult(id, event)}
                        style={{marginRight: 10}}>查看结果</Button>
                    <Button style={{marginRight: 10}} onClick={(event : any) => stopCollectForm(id,index, event)}>停止</Button>
                    <Button type="primary" danger size="middle" onClick={handleClick}
                            style={{marginRight: 10}}>删除</Button>
                    <Modal visible={visible}
                           title="删除表单"
                           children={children}
                           footer={[
                               // 实现关闭窗口的逻辑
                               <Button key="cancel" style={{marginRight: 10}} onClick={closeModal}>取消</Button>,
                               // 实现关闭窗口的逻辑
                               <Button key="ok" type="primary" onClick={(event : any) => deleteFormItem(id, event)}>确认</Button>
                           ]}
                           onClose={closeModal}
                    />
                </>
            )
        }
        if (status === 4) {
            return (
                <>
                    <Button
                        onClick={(event: any)=> viewResult(id, event)}
                        size="middle" style={{marginRight: 10}}>查看结果</Button>
                    <Button onClick={(event : any)=> releaseFormItem(id,index, event)}
                            size="middle" style={{marginRight: 10}}>继续收集</Button>
                    <Button type="primary" danger size="middle" onClick={handleClick}>删除</Button>
                    <Modal visible={visible}
                           title="删除表单"
                           children={children}
                           footer={[
                               // 实现关闭窗口的逻辑
                               <Button key="cancel" style={{marginRight: 10}} onClick={closeModal}>取消</Button>,
                               // 实现关闭窗口的逻辑
                               <Button key="ok" type="primary" onClick={(event : any) => deleteFormItem(id, event)}>确认</Button>
                           ]}
                           onClose={closeModal}
                    />
                </>
            )
        }
    }

    const shareForm = (id : string, event : any) => {
        event.stopPropagation()
        navigate({
            pathname: "/new-form-result",
            search: `?id=${id}`,
            hash: "#share"
        })
    }

    const viewResult = (id : string, event :any) => {
        event.stopPropagation()
        navigate({
            pathname: "/new-form-result",
            search: `?id=${id}`,
            hash: "#data"
        })
    }

    const editForm = (id : string, event : any) => {
        event.stopPropagation()
        navigate({
            pathname: "/new-form-create",
            search: `?id=${id}`,
            hash: "#data"
        })
    }

    const detailInfo = (status: number) => {
        if (status === 4 || status === 3){
            navigate({
                pathname: "/new-form-result",
                search: `?id=${id}`,
                hash: "#data"
            })
        }else if (status === 2){
            navigate({
                pathname: "/new-form-create",
                search: `?id=${id}`,
                hash: "#data"
            })
        }
    };

    return (
        <>
            <div onClick={()=> detailInfo(status)} className="tablelist">
                <div className="tablelist-title">{title}</div>
                <div className="tablelist-time">
                    {moment(ctime).format('YYYY年MM月DD日 HH:mm')}
                </div>
                <div className="tablelist-status">
                    {/*根据返回的status判断当前的状态：草稿，收集中，结束*/}
                    {currentStatus(status)}
                </div>
                <div className="tablelist-star">
                    <img src={star ?
                        require('../../assets/images/star-yellow.png')
                        : require('../../assets/images/star.png')}
                         style={{width: 20}}
                         onClick={(event : any) => {
                             changeIsStar(id, event)
                         }}/>
                </div>
                <div className="tablelist-operate">
                    {operation(status)}
                </div>
            </div>
        </>
    );
}
