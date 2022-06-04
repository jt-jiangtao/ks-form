import {IProblem, TProblemType} from "@/types/service/model";
import React, {createRef, useEffect, useState} from "react";
import classNames from "classnames";

type WatchInputProps = {
    data: IProblem<TProblemType>
    index: number
}

export default function WatchInput(props : WatchInputProps){
    console.log(props)
    let textarea = createRef<HTMLTextAreaElement>()
    let titleTextarea = createRef<HTMLTextAreaElement>()
    // TODO: PROBLEM 状态更新时导致textarea样式重新渲染
    const textareaValueChange = () => {
        if (textarea.current){
            textarea.current.style.height = '18px'
            let height = (textarea.current?.scrollHeight || 18) + 'px'
            textarea.current.style.height = height
        }
        if (titleTextarea.current){
            titleTextarea.current.style.height = '18px'
            let height = (titleTextarea.current?.scrollHeight || 18) + 'px'
            titleTextarea.current.style.height = height
        }
    }

    useEffect(()=>{
        textareaValueChange()
    }, [])

    return (
        <div className="watch-input-container">
            <div className="title-container">
                <span className="title__number">
                    <span className={classNames("required-title-with", {
                        "required-show": props.data.required
                    })}>*</span>
                    {`${props.index + 1}.`}</span>
                <textarea
                    disabled
                    ref={titleTextarea}
                    className="watch-input-textarea title__content">{props.data.title}</textarea>
            </div>
            <div className={classNames("watch-input-editor", {
                "content-hidden": !props.data.result || props.data.result.value === ''
            })}>
                <textarea
                    disabled
                    className="watch-input-textarea"
                    ref={textarea}
                    value={props.data.result?.value.toString() || ''}
                    placeholder="请输入" />
            </div>
            <div className={classNames("none-edit",{
                "content-hidden": props.data.result && props.data.result.value !== ''
            })}>此题未填写</div>
        </div>
    );
}
