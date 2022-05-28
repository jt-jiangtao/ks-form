import React, {useState} from 'react';
import {IForm} from "@/types/service/model";
import "./table.scss"
import moment from 'moment';
import {cancelStarForm, deleteForm, endCollectForm, getForm, starForm, startCollectForm} from "@/services";
import SideBar from "@/pages/FormList/SideBar";
import message from "@/components/Message";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

interface ITable {
    id: string,
    index:number,
    title: string,
    ctime: number,
    isStar: boolean,
    status: number,
    deleteFormItem: (id: string) => void
    releaseFormItem: (id: string,index:number) => void
    stopCollectForm: (id: string,index:number) => void
}

export default function Table(Props: ITable) {
    // 解构赋值
    const {index,title, ctime, isStar, status, id, deleteFormItem, releaseFormItem, stopCollectForm} = Props
    // 是否标星的状态
    const [star, setStar] = useState<boolean>(isStar)
    // 模态框是否可见
    const [visible, setVisible] = useState<boolean>(false)
    // 时间戳转年月日的函数
    let moment = require('moment')
    // 模态框内容部分
    const children = <div>您确定要删除此表单吗，删除后将无法填写表单和查看表单记录</div>
    // 标星与取消标星，先判断一下当前的状态，再调用不同的方法
    const changeIsStar = (id: string) => {
        if (star) {
            cancelStarForm({id}).then(res => {
                // console.log(res)
                console.log(isStar)
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
        if (status == 2) {
            return (<div className="draft">草稿</div>)
        }
        if (status == 3) {
            return (<div className="collecting">正在收集 0份</div>)
        }
        if (status == 4) {
            return (<div className="over">已结束 收集0份</div>)
        }
    }

    // 打开模态框
    const handleClick = () => {
        setVisible(!visible)
    }

    // 关闭模态框
    const closeModal = () => {
        setVisible(false)
    }

    // 操作栏
    const operation = (status: number) => {
        if (status == 2) {
            return (
                <>
                    <Button style={{marginRight: 10}} onClick={() => {
                        releaseFormItem(id,index)
                    }}>发布</Button>
                    <Button style={{marginRight: 10}}>编辑</Button>
                    <Button type="primary" danger size="middle" onClick={handleClick}
                            style={{marginRight: 10}}>删除</Button>
                    <Modal visible={visible}
                           title="删除表单"
                           children={children}
                           footer={[
                               // 实现关闭窗口的逻辑
                               <Button key="cancel" style={{marginRight: 10}} onClick={() => closeModal()}>取消</Button>,
                               // 实现关闭窗口的逻辑
                               <Button key="ok" type="primary" onClick={() => deleteFormItem(id)}>确认</Button>
                           ]}
                           onClose={() => closeModal()}
                    />
                </>
            )
        }
        if (status == 3) {
            return (
                <>
                    <Button style={{marginRight: 10}}>分享</Button>
                    <Button style={{marginRight: 10}}>查看结果</Button>
                    <Button style={{marginRight: 10}} onClick={() => stopCollectForm(id,index)}>停止</Button>
                    <Button type="primary" danger size="middle" onClick={handleClick}
                            style={{marginRight: 10}}>删除</Button>
                </>
            )
        }
        if (status == 4) {
            return (
                <>
                    <Button size="middle" style={{marginRight: 10}}>查看结果</Button>
                    <Button type="primary" danger size="middle" onClick={handleClick}>删除</Button>
                    <Modal visible={visible}
                           title="删除表单"
                           children={children}
                           footer={[
                               // 实现关闭窗口的逻辑
                               <Button key="cancel" style={{marginRight: 10}} onClick={() => closeModal()}>取消</Button>,
                               // 实现关闭窗口的逻辑
                               <Button key="ok" type="primary" onClick={() => deleteFormItem(id)}>确认</Button>
                           ]}
                           onClose={() => closeModal()}
                    />
                </>
            )
        }
    }
    return (
        <>
            <div className="tablelist">
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
                         onClick={() => {
                             changeIsStar(id)
                         }}/>
                </div>
                <div className="tablelist-operate">
                    {operation(status)}
                </div>
            </div>
        </>
    );
}
