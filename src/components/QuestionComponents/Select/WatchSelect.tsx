import Textarea from "@/components/Textarea";
import {IMultiResult, IProblem, ISingleResult, TProblemType, TResult} from "@/types/service/model";
import classNames from "classnames";
import React from "react";

type WatchSelectProps = {
    data: IProblem<TProblemType>
    index: number
}

export default function WatchSelect(props : WatchSelectProps){
    const renderContent = () => {
        if (["singleSelect", "pullSelect"].indexOf(props.data.type) !== -1){
            return <div className="select-result-item">{`${(props.data.result as ISingleResult)?.value?.title}`}</div>
        }else {
            let res : any = []
            let choices = (props.data.result as IMultiResult)?.value
            for (let i = 0; i < choices?.length; i++) {
                res.push((
                    <div className="select-result-item">{`${choices[i].title}`}</div>
                ))
            }
            return res
        }
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
                    {`${props.index + 1}.`}</div>
                <Textarea
                    editable={false}
                    className="select__textarea"
                    value={props.data.title} />
            </div>
            <div className="select-result">
                {renderContent()}
            </div>
        </div>
    )
}
