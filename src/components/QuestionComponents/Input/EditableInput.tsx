import {IProblem, TProblemType} from "@/types/service/model";
import {createRef, useEffect, useState} from "react";

type EditableInputProps = {
    data: IProblem<TProblemType>,
    changeData: Function,
    index: number
}

export default function EditableInput(props : EditableInputProps){
    let [value, setValue] = useState(props.data.result?.value || '')
    let textarea = createRef<HTMLTextAreaElement>()
    let titleTextarea = createRef<HTMLTextAreaElement>()
    // TODO: PROBLEM 状态更新时导致textarea样式重新渲染
    const textareaValueChange = () => {
        setValue(textarea.current?.value || '')
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

    const saveInfo = () => {
        let copy = JSON.parse(JSON.stringify(props.data))
        copy['result'] = {
            'value': textarea.current?.value || ''
        }
        props.changeData(props.index, copy)
    }

    return (
        <div className="editable-input-container">
            <div className="title-container">
                <span className="title__number">{`${props.index + 1}.`}</span>
                <textarea
                    disabled
                    ref={titleTextarea}
                    className="input-textarea title__content">{props.data.title}</textarea>
            </div>
            <div className="input-editor">
                <textarea
                    className="input-textarea"
                    onBlur={saveInfo}
                    ref={textarea}
                    onChange={textareaValueChange}
                    value={value.toString()}
                    placeholder="请输入" />
            </div>
        </div>
    );
}
