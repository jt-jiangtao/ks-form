import {IProblem, TProblemType} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import Stars from "@/components/Stars";
import classNames from "classnames";
import React from "react";

type WatchScoreProps = {
    data: IProblem<TProblemType>
    index: number
}

export default function WatchScore(props : WatchScoreProps){
    return (
        <div
            className="editable-select-wrapper"
        >
            <div className="select__title select__title--no-hover">
                <div className="number">
                    <span className={classNames("required-title-with", {
                        "required-show": props.data.required
                    })}>*</span>
                    {`${props.index + 1}.`}</div>
                <Textarea
                    editable={false}
                    className="select__textarea"
                    value={props.data.title} />
            </div>
            <div className="watch-score-stars">
                <Stars
                    score={Number(props.data.result?.value) || 0} editable={false} maxScore={5} />
                <div className="score">{`${(Number(props.data.result?.value) || 0).toFixed(1)}分`}</div>
            </div>
        </div>
    )
}
