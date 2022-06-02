import {IProblem, TProblemType} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import Stars from "@/components/Stars";
import React, {useEffect, useState} from "react";
import classNames from "classnames";

type EditableScoreProps = {
    data: IProblem<TProblemType>,
    changeData: Function,
    index: number
}

export default function EditableScore(props : EditableScoreProps){
    let [score, setScore] = useState(props.data)

    useEffect(()=>{
        setScore(props.data)
    }, [props])

    const onScoreChange = (star : number) => {
        let copy = JSON.parse(JSON.stringify(props.data))
        copy['result'] = {
            'value': star
        }
        props.changeData(props.index, copy)
    }

    return (
        <div
            className="editable-select-wrapper"
        >
            <div className="select__title select__title--no-hover">
                <div className="number">
                    <span className={classNames("required-title-with", {
                        "required-show": props.data.required
                    })}>*</span>
                    {`${props.index + 1}.`}
                </div>
                <Textarea
                    editable={false}
                    className="select__textarea"
                    value={score.title} />
            </div>
            <div className="score-stars">
                <Stars
                    onScoreChange={onScoreChange}
                    score={Number(score.result?.value) || 0} editable={true} maxScore={5} />
            </div>
        </div>
    )
}
