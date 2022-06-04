import {IProblem, TProblemType} from "@/types/service/model";
import React, {createRef, useEffect, useState} from "react";
import classNames from "classnames";
import Textarea from "@/components/Textarea";

type EditableInputProps = {
    data: IProblem<TProblemType>,
    changeData: Function,
    index: number
    error: boolean,
    setError: Function
}

export default function EditableInput(props : EditableInputProps){
    let [value, setValue] = useState(props.data.result?.value || '')
    let [error, setError] = useState(props.error)
    let textarea = createRef<HTMLTextAreaElement>()
    // TODO: PROBLEM 状态更新时导致textarea样式重新渲染
    const textareaValueChange = () => {
        setValue(textarea.current?.value || '')
        if (textarea.current){
            textarea.current.style.height = '18px'
            let height = (textarea.current?.scrollHeight || 18) + 'px'
            textarea.current.style.height = height
        }
    }

    useEffect(()=>{
        textareaValueChange()
    }, [])

    const saveInfo = () => {
        if (!textarea.current?.value){
            props.setError(props.index, true)
        }else {
            props.setError(props.index, false)
        }
        let copy = JSON.parse(JSON.stringify(props.data))
        copy['result'] = {
            'value': textarea.current?.value || ''
        }
        props.changeData(props.index, copy)
    }

    const onFocus = () => {
        setError(false)
    }

    return (
        <div className="editable-input-container">
            <div className="title-container">
                <span className="title__number">
                    <span className={classNames("required-title-with", {
                        "required-show": props.data.required
                    })}>*</span>
                    {`${props.index + 1}.`}</span>
                <Textarea
                    editable={false}
                    className="select__textarea"
                    value={props.data.title}/>
            </div>
            <div className="input-editor">
                <textarea
                    className="input-textarea"
                    onBlur={saveInfo}
                    onFocus={onFocus}
                    ref={textarea}
                    onChange={textareaValueChange}
                    value={value.toString()}
                    placeholder="请输入" />
            </div>
            <div className={classNames("error", {
                "error-show": error && (props.data.required && props.error)
            })}>此题为必填，请输入</div>
        </div>
    );
}
