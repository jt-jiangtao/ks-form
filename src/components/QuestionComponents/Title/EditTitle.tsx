import {createRef, useEffect, useState} from "react";

type EditTitleProps = {
    focus: boolean,
    title: string,
    freshData: Function,
    changeFocusElement: Function,
}

export default function EditTitle(props : EditTitleProps){
    let [value, setValue] = useState(props.title)
    let inputRef = createRef<HTMLInputElement>()

    useEffect(()=>{
        // TODO: PROBLEM 失去焦点问题
        // onblur触发后props.focus不一定发生改变
        // 当输入框内容相同时，不会触发onblur
        // 加上这段会导致每次都会触发
        // 自动获取焦点
        if (!props.focus) inputRef.current?.blur()
        else inputRef.current?.focus()
    }, [props.focus])

    const inputDataChange = (event : any) => {
        props.changeFocusElement('')
        props.freshData(value)
    };

    const changeFocusElement = (event: any) => {
        event.stopPropagation()
        props.changeFocusElement('title')
    }

    const onChange = (event : any)=>{
        setValue(event.target.value)
    }

    const renderFocus = () => {
        return <input ref={inputRef} type="text" value={value} maxLength={30} onChange={onChange} onBlur={inputDataChange}/>
    }

    const renderUnFocus = () => {
      return <div className="input-title-value">{props.title || '请输入表单标题'}</div>
    }
    return (
        <div  onClick={changeFocusElement} className="input-title-container">
            {props.focus ? renderFocus() : renderUnFocus()}
        </div>
    )
}
