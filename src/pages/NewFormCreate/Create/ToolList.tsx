import '@/styles/NewFormCreate/Create/toolList.scss'
import Button from "@/components/Button/Button";
import {useLocation, useNavigate} from "react-router";
import {useContext, useState} from "react";
import classNames from "classnames";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import {createForm} from "@/services";

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

    }

    const completeForm = () => {
        createForm(data).then(res=>{
            navigate({
                pathname: "/new-form-result",
                hash: "#share",
                search: `?id=${res.data.id}`
            })
        })
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
