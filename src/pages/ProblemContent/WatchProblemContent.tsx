import {IForm, IFormResult, IProblem, TProblemType} from "@/types/service/model";
import WatchTitle from "@/components/QuestionComponents/Title/WatchTitle";
import EditableInput from "@/components/QuestionComponents/Input/EditableInput";
import {nanoid} from "nanoid";
import WatchInput from "@/components/QuestionComponents/Input/WatchInput";

type WatchProblemContentProps = {
    form: IForm | undefined,
    data: IFormResult | undefined
}

export default function WatchProblemContent(props : WatchProblemContentProps){
    if (!props.form || !props.data)return null
    console.log(props)
    return (
        <>
            <WatchTitle title={props.form.title} />
            {
                props.data.result.map((item, index) => {
                    switch (item.type) {
                        case "input":
                            return <WatchInput key={`input-${nanoid(5)}`} index={index} data={item} />
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
        </>
    )
}
