import {createRef, useEffect, useState} from "react";
import classNames from "classnames";

type TextareaProps = {
    style ?: Object,
    className ?: string,
    value : string
    onBlur ?: Function
    onChange ?: Function
    onkeydown ?: Function
    placeholder ?: string
    maxLength ?: number
    editable ?: boolean
}

Textarea.defaultProps = {
    placeholder: ''
}

export default function Textarea(props : TextareaProps){
    let [value, setValue] = useState(props.value)
    let textarea = createRef<HTMLTextAreaElement>()

    const textareaValueChange = () => {
        setValue(textarea.current?.value || '')
        if (textarea.current){
            textarea.current.style.height = '18px'
            textarea.current.style.height = (textarea.current?.scrollHeight || 18) + 'px'
        }
    }

    useEffect(()=>{
        setValue(props.value)
    }, [props.value])

    useEffect(()=>{
        textareaValueChange()
    }, [])

    const onBlur = (event : any) => {
        props.onBlur && props.onBlur(event)
    }

    const onkeydown = (event : any) => {
        props.onkeydown && props.onkeydown(event)
    }

    const onChange = (event : any) => {
        textareaValueChange()
        props.onChange && props.onChange(event)
    }

    return (
        <textarea
            onKeyDown={onkeydown}
            contentEditable={props.editable}
            style={props.style}
            maxLength={props.maxLength}
            className={classNames("form-c-normal-textarea", props.className)}
            onBlur={onBlur}
            ref={textarea}
            onChange={onChange}
            placeholder={props.placeholder}
            value={value} />
    )
}
