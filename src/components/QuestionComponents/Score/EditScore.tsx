import Textarea from "@/components/Textarea";
import {IProblem, TProblemType} from "@/types/service/model";
import {useEffect, useState} from "react";

type EditScoreProps = {
    index: number,
    focus: boolean,
    freshData: Function,
    changeFocusElement: Function,
    data: IProblem<TProblemType>,
}

export default function EditScore(props: EditScoreProps){
    let [score, setScore] = useState(props.data)

    useEffect(()=>{
        setScore(props.data)
    }, [props.data])

    const changeFocusElement = (event : any) => {
        event.stopPropagation()
        props.changeFocusElement(props.index)
    }

    return (
        <div
            onClick={changeFocusElement}
            className="edit-select-wrapper"
        >
            <div className="select__title">
                <div className="number">{`${props.index + 1}.`}</div>
                <Textarea
                    className="select__textarea"
                    value={score.title} />
            </div>

        </div>
    )
}
