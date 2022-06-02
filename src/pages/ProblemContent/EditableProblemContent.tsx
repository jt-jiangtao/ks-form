import {IForm, TProblemType, TResult} from "@/types/service/model";
import WatchTitle from "@/components/QuestionComponents/Title/WatchTitle";
import WatchSubTitle from "@/components/QuestionComponents/SubTitle/WatchSubTitle";
import {useEffect, useState} from "react";
import EditableInput from "@/components/QuestionComponents/Input/EditableInput";
import {nanoid} from "nanoid";
import Button from "@/components/Button/Button";
import "@/styles/ProblemContent/EditableProblemContent.scss"
import EditableScore from "@/components/QuestionComponents/Score/EditableScore";
import EditableDateTime from "@/components/QuestionComponents/DateTime/EditableDateTime";
import EditableSelect from "@/components/QuestionComponents/Select/EditableSelect";
import {inputForm} from "@/services";
import message from "@/components/Message";
import classNames from "classnames";
import {useLocation, useNavigate} from "react-router";

type EditableProblemContentProps = {
    data : IForm,
    canSubmit ?: boolean
}

export default function EditableProblemContent(props : EditableProblemContentProps){
    const {canSubmit = false} = props
    let [data, setData] = useState<IForm>(props.data)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        setData(props.data)
    }, [props.data])
    const setResult = (index: number, newData : TResult<TProblemType>) => {
        let copy = JSON.parse(JSON.stringify(data))
        copy.problems[index] = newData
        setData(copy)
    }

    const submit = () => {
        if (!canSubmit){
            message.info("预览状态暂不支持提交")
            return
        }
        let req : any= {}
        req.formId = data.id
        req.problems = data.problems
        inputForm(req).then(res=>{
            if (res.stat === 'ok'){
                navigate({
                    pathname: location.pathname,
                    hash: "#success"
                })
            }
        })
    }

    return (
        <>
            <WatchTitle title={data.title} />
            <WatchSubTitle title={data.subTitle} />
            {
                data.problems.map((item, index) => {
                    switch (item.type) {
                        case "input":
                            return <EditableInput key={`input-${nanoid(5)}`} index={index} data={item} changeData={setResult}/>
                        case "date":
                        case "time":
                            return <EditableDateTime key={`input-${nanoid(5)}`} index={index} data={item} changeData={setResult}/>
                        case "multiSelect":
                        case "pullSelect":
                        case "singleSelect":
                            return <EditableSelect key={`input-${nanoid(5)}`} index={index} data={item} changeData={setResult} />
                        case "score":
                            return <EditableScore  key={`input-${nanoid(5)}`} index={index} data={item} changeData={setResult} />
                    }
                    return null
                })
            }
            <div className="submit">
                <Button
                    className={classNames("submit-btn", {
                        "forbidden-submit": !canSubmit
                    })}
                    onClick={submit}
                    type="primary">提交</Button>
            </div>
        </>
    )
}

