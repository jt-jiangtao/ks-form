import {createRef, useEffect, useState} from "react";
import {IProblem, TProblemType} from "@/types/service/model";

type EditInputProps = {
    index: number,
    focus: boolean,
    freshData: Function,
    changeFocusElement: Function,
    data: IProblem<TProblemType>,
}

export default function EditInput(props: EditInputProps){
    let [value, setValue] = useState(props.data.title)
    let textarea = createRef<HTMLTextAreaElement>()

    // TODO: PROBLEM组件之间的复用问题
    useEffect(()=>{
        setValue(props.data.title)
    }, [props.data.title])

    useEffect(()=>{
        // if (!props.focus) textarea.current?.blur()
        // else textarea.current?.focus()
    },[props])

    const textareaValueChange = () => {
      setValue(textarea.current?.value || '')
        if (textarea.current){
            textarea.current.style.height = '18px'
            textarea.current.style.height = (textarea.current?.scrollHeight || 18) + 'px'
        }
    }

    useEffect(()=>{
        textareaValueChange()
    }, [])

    const inputDataChange = () => {
        props.freshData(props.index, {
            "title": value
        })
    }

    const changeFocusElement = (event : any) => {
        event.stopPropagation()
        props.changeFocusElement(props.index)
    }

    return (
        <div
            onClick={changeFocusElement}
            className="edit-input">
            <div className="input-editor-container">
                <span className="input__number">{`${props.index + 1}.`}</span>
                <textarea
                    onBlur={inputDataChange}
                    ref={textarea}
                    onChange={textareaValueChange}
                    placeholder="请输入问题"
                    value={value} />
            </div>
            <div className="input-describe">填写者回答区</div>
        </div>
    )
}
