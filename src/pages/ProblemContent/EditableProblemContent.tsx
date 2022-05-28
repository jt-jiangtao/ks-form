import {IForm, TProblemType, TResult} from "@/types/service/model";
import WatchTitle from "@/components/QuestionComponents/Title/WatchTitle";
import WatchSubTitle from "@/components/QuestionComponents/SubTitle/WatchSubTitle";
import {useState} from "react";
import EditableInput from "@/components/QuestionComponents/Input/EditableInput";
import {nanoid} from "nanoid";
import Button from "@/components/Button/Button";
import "@/styles/ProblemContent/EditableProblemContent.scss"

type EditableProblemContentProps = {
    data : IForm
}

export default function EditableProblemContent(props : EditableProblemContentProps){
    let [data, setData] = useState<IForm>(props.data)

    const setResult = (index: number, newData : TResult<TProblemType>) => {
        let copy = JSON.parse(JSON.stringify(data))
        copy.problems[index] = newData
        setData(copy)
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
                        // case "date":
                        //     return dateEditWithModule(item, index)
                        // case "multiSelect":
                        //     return multiSelectEditWithModule(item, index)
                        // case "pullSelect":
                        //     return pullSelectEditWithModule(item, index)
                        // case "score":
                        //     return scoreEditWithModule(item, index)
                        // case "singleSelect":
                        //     return singleSelectEditWithModule(item, index)
                        // case "time":
                        //     return timeEditWithModule(item, index)
                    }
                    return null
                })
            }
            <div className="submit">
                <Button type="primary">提交</Button>
            </div>
        </>
    )
}

