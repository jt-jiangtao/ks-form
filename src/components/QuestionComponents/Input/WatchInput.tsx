import {IProblem, TProblemType} from "@/types/service/model";
import {createRef, useEffect, useState} from "react";

type WatchInputProps = {
    data: IProblem<TProblemType>
    index: number
}

export default function WatchInput(props : WatchInputProps){
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
                <span className="title__number">{`${props.index + 1}.`}</span>
                <textarea
                    disabled
                    ref={titleTextarea}
                    className="watch-input-textarea title__content">{props.data.title}</textarea>
            </div>
            <div className="watch-input-editor">
                <textarea
                    disabled
                    className="watch-input-textarea"
                    ref={textarea}
                    value={props.data.result?.value.toString() || ''}
                    placeholder="请输入" />
            </div>
        </div>
    );
}
