import {IForm, IFormResult, IProblem, TProblemType} from "@/types/service/model";
import WatchTitle from "@/components/QuestionComponents/Title/WatchTitle";
import {nanoid} from "nanoid";
import WatchInput from "@/components/QuestionComponents/Input/WatchInput";
import WatchScore from "@/components/QuestionComponents/Score/WatchScore";
import WatchDateTime from "@/components/QuestionComponents/DateTime/WatchDateTime";
import WatchSelect from "@/components/QuestionComponents/Select/WatchSelect";

type WatchProblemContentProps = {
    form: IForm | undefined,
    data: IFormResult | undefined
}

export default function WatchProblemContent(props : WatchProblemContentProps){
    if (!props.form || !props.data)return null
    return (
        <>
            <WatchTitle title={props.form.title} />
            {
                props.data.result.map((item, index) => {
                    switch (item.type) {
                        case "input":
                            return <WatchInput key={`input-${nanoid(5)}`} index={index} data={item} />
                        case "date":
                        case "time":
                            return <WatchDateTime key={`input-${nanoid(5)}`} index={index} data={item} />
                        case "multiSelect":
                        case "pullSelect":
                        case "singleSelect":
                            return <WatchSelect key={`input-${nanoid(5)}`} index={index} data={item} />
                        case "score":
                            return <WatchScore key={`input-${nanoid(5)}`} index={index} data={item} />
                    }
                    return null
                })
            }
        </>
    )
}
