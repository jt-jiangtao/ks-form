import '@/styles/NewFormCreate/Create/toolList.scss'
import Button from "@/components/Button/Button";
import {useLocation, useNavigate} from "react-router";
import {useContext, useState} from "react";
import classNames from "classnames";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import {createForm, deleteForm, starForm, startCollectForm} from "@/services";
import message from "@/components/Message";
import {IForm} from "@/types/service/model";
import {parseSearch} from "@/utils/uri";

export default function ToolList(){
    let navigate = useNavigate()
    let location = useLocation()
    let [isCreate] = useState<boolean>(location.search.slice(1).split("=").indexOf('id') === -1)
    const {data} = useContext(DataInfoContext)

    const previewForm = () => {
      navigate({
          hash: "#preview",
          search: location.search
      })
    }

    const saveForm = () => {
        createForm(data).then(res=>{
            message.success("保存草稿成功")
        })
    }

    const createFormWithPut = async () => {
        let form = await createForm(data)
        await startCollectForm({
            id: form.data.id
        }).then(res=> {
            navigate({
                pathname: "/new-form-result",
                hash: "#share",
                search: `?id=${form.data.id}`
            })
        })
    }

    const completeForm = async () => {
        if (isCreate){
            await createFormWithPut()
        }
    }

    const saveModify = async () => {
        // 草稿 => 草稿
        // 已发布 => 发布
        // 已停止 => 草稿
        let res = await deleteForm({
            id: parseSearch(location.search, 'id')
        })
        if (res.stat === 'ok') {
            if ((data as IForm).status === 2 || (data as IForm).status === 4){
                try {
                    createForm(data).then(res => {
                        message.success("保存修改成功")
                    })
                } catch (e) {
                    message.error("保存修改失败")
                }
            }else {
                await createFormWithPut()
            }
        } else {
            message.error("保存修改失败")
        }
    }

    return (
        <div className="tool-list">
            <div className="button-wrapper over-btn">
                <Button
                    className="btn-white"
                    onClick={previewForm}
                >预览</Button>
                <Button
                    onClick={saveForm}
                    className={classNames("btn-white", {
                        'button-hidden': !isCreate
                    })}
                >保存草稿</Button>
                <Button
                    onClick={saveModify}
                    className={classNames({
                        'button-hidden': isCreate
                    })}
                    type="primary"
                >保存修改</Button>
            </div>
            
            <div className={classNames("button-wrapper", {
                'button-hidden': !isCreate
            })}>
                <Button
                    onClick={completeForm}
                    block type="primary">完成创建</Button>
            </div>
        </div>
    )
}
