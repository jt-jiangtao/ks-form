import Pagination from "@/components/Pagination/Pagination";
import {useEffect, useState} from "react";
import React from "react";
import {Spin} from "antd";
import {deleteForm, endCollectForm, getFormList, startCollectForm} from "@/services";
import style from "@/styles/FormList/content.module.scss"
import Table from "@/components/Table/Table";
import {IForm} from "@/types/service/model";
import message from "@/components/Message";


type ContentProps = {
    sidebar?: string
}

export default function Content(props: ContentProps) {
    const [tableItem, setTableItem] = useState<IForm[]>([])
    const [showStar, setShowStar] = useState<boolean>(false)
    const [showLoading, setShowLoading] = useState<boolean>(true)
    // 每页展示几条数据
    const options = [4, 5, 6]

    // 一个页面的数据条数
    const [total, setTotal] = useState<number>(0)
    const [currentPageSize, setCurrentPageSize] = useState<number>(options[0])

    useEffect(() => {
        getFormListByStatus(0, currentPageSize)
    }, [])

    // 封装一下请求数据的方法，根据三个可选的参数来请求
    const getFormListByStatus = (offset?: number, limit?: number, isStar?: boolean) => {
        // console.log(currentPageSize)
        getFormList({
            // 首次进来默认展示五条数据
            offset: offset,
            limit: limit,
            isStar: isStar
        }).then(res => {
            // console.log(res)
            setTableItem(res.data.items)
            setTotal(res.data.total)
            setShowLoading(false)
        })
    }

    // 仅展示收藏,需要做重新设置数据总数和分页处理
    const onlyStar = () => {
        if (!showStar) {
            getFormListByStatus(0, currentPageSize, !showStar)
            // 点亮右上角图标
            setShowStar(true)
        } else {
            getFormListByStatus(0, currentPageSize)
            setShowStar(false)
        }
    }

    const changePageCallback = (pageNum: number) => {
        // 判断当前状态，若showStar为false，则分页时不带参数，默认请求所有的
        if (!showStar) {
            getFormListByStatus(pageNum - 1, currentPageSize)
        }
        // 若showStar为true，则分页时带参数，请求所有的带星的
        else {
            getFormListByStatus(pageNum - 1, currentPageSize, showStar)
        }
    }

    const changePageSizeCallback = (pageSize: any, pageNum: number) => {
        // 判断当前状态，若showStar为false，则分页时不带参数，默认请求所有的
        if (!showStar) {
            // console.log(pageSize)
            setCurrentPageSize(pageSize)
            getFormListByStatus(pageNum - 1, pageSize)
        }
        // 若showStar为true，则分页时带参数，请求所有的带星的
        else {
            setCurrentPageSize(pageSize)
            getFormListByStatus(pageNum - 1, pageSize, showStar)
        }
    }

    // 删除表单
    const deleteFormItem = (id: string,event : any) => {
        event.stopPropagation()
        console.log(id)
        const newTableItem = tableItem.filter(item => item.id !== id)
        setTableItem(newTableItem)
        deleteForm({id}).then(res => {
            console.log(res)
            message.success("删除成功!")
            // 删除成功后重新请求一遍数据
            getFormListByStatus(0, currentPageSize)
        })
    }
    // 发布表单出去填写
    const releaseFormItem = (id: string, index: number,event : any) => {
        event.stopPropagation()
        startCollectForm({id}).then(res => {
            message.success("发布成功!")
        })
        // 修改本地状态
        const newTableItem = [...tableItem]
        newTableItem[index].status = 3
        setTableItem(newTableItem)
    }
    // 停止收集表单
    const stopCollectForm = (id: string, index: number,event : any) => {
        event.stopPropagation()
        endCollectForm({id}).then(res => {
            message.success("停止成功!")
        })
        // 修改本地状态
        const newTableItem = [...tableItem]
        newTableItem[index].status = 4
        setTableItem(newTableItem)
    }
    return (
        <>
            <div className={style.form}>
                <div className={style.form_header}>
                    <div className={style.form_mycreate}>我创建的</div>
                    <div className={style.form_star} onClick={onlyStar}>
                        <img src={showStar ?
                            require('../../assets/images/star-yellow.png') :
                            require('../../assets/images/star.png')
                        }
                             style={{width: 22, marginRight: 5}}/>
                        仅展示星标
                    </div>
                </div>
                <div className={style.form_list}>
                    <div className={style.list_title}>表单名称</div>
                    <div className={style.list_time}>创建时间</div>
                    <div className={style.list_status}>状态</div>
                    <div className={style.list_star}>标星</div>
                    <div className={style.list_operate}>操作</div>
                </div>
                <div className={showLoading ? `${style.form_loading}` : `${style.form_null}`}>
                    <Spin size="large"/>
                </div>
                {
                    tableItem.map((item, index) => {
                        return (
                            <Table key={item.id}
                                   index={index}
                                   ctime={item.ctime || new Date().getTime()}
                                   id={item.id || ''}
                                   isStar={item.isStar || false}
                                   status={item.status || 2}
                                   title={item.title}
                                   deleteFormItem={deleteFormItem}
                                   releaseFormItem={releaseFormItem}
                                   stopCollectForm={stopCollectForm}
                            />
                        )
                    })
                }
            </div>
            {
                tableItem.length === 0 ?
                    <div className={style.img_noData}>
                        <img style={{
                            display: showLoading ? "none" : 'block'
                        }} src={require('../../assets/images/noData.png')} alt="noData"/>
                    </div>
                    :
                    <div className={style.form_pagination}>
                        <Pagination total={total} showSizeChanger={true} showJumpInput={false} pageSizeOptions={options}
                                    changePageCallback={changePageCallback}
                                    changePageSizeCallback={changePageSizeCallback}/>
                    </div>
            }
        </>
    )
}
