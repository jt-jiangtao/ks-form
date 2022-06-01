import {IProblem, ISelectOption, ISelectSetting, TProblemType} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import {createRef, useEffect, useState} from "react";
import Button from "@/components/Button/Button";
import {PlusOutlined} from "@ant-design/icons";
import draggableIcon from "@/assets/icon/draggable-v.png"
import closeIcon from "@/assets/icon/close.png"
import singleSelectIcon from "@/assets/icon/singleSelect.png"
import multiSelectIcon from "@/assets/icon/multiSelect.png"
import classNames from "classnames";

type EditSingleSelectProps = {
    index: number,
    focus: boolean,
    freshData: Function,
    changeFocusElement: Function,
    data: IProblem<TProblemType>,
}

export default function EditSelect(props : EditSingleSelectProps){

    let [select, setSelect] = useState(props.data)
    let textarea = createRef<HTMLTextAreaElement>()
    let [title, setTitle] = useState(props.data.title)

    useEffect(()=>{
        setSelect(props.data)
        setTitle(props.data.title)
    }, [props.data])

    useEffect(()=>{
        if (!props.focus) textarea.current?.blur()
        else textarea.current?.focus()
    },[props.focus])

    const changeFocusElement = (event : any) => {
        event.stopPropagation()
        props.changeFocusElement(props.index)
    }

    const renderOptionIndex = (item : ISelectOption, index : number) => {
        if (select.type === "singleSelect") return <img src={singleSelectIcon} />
        else if (select.type === "multiSelect") return <img src={multiSelectIcon} />
        return <span>{`${index + 1}.`}</span>
    }

    const textareaKeydown = (event: any) => {
      if (event.keyCode === 13){
          if (window.event) {
              window.event.returnValue = false
          } else {
              event.preventDefault()
          }
      }
    }

    const inputDataChange = () => {
        props.freshData(props.index, {
            "setting": select.setting,
             title
        })
    }

    const choiceChange = (event : any, index : number) => {
        let copy = JSON.parse(JSON.stringify(select))
        copy.setting.options[index].title = event.currentTarget.value
        setSelect(copy)
    }

    const titleChange = (event : any) => {
        setTitle(event.currentTarget.value)
    }

    const deleteOption = (index : number) => {
        let copy = JSON.parse(JSON.stringify(select))
        copy.setting.options.splice(index, 1)
        props.freshData(props.index, {
            "setting": copy.setting
        })
    }

    const addOption = () => {
        let copy = JSON.parse(JSON.stringify(select))
        copy.setting.options.push({
            title: '',
            status: 2
        })
        props.freshData(props.index, {
            "setting": copy.setting
        })
    }

    const renderChoices = (item : ISelectOption, index : number) => {
        return (
            <div className="option-content">
                <div className={classNames("option-content__move", {
                    "not-focus-hidden": !props.focus
                })}>
                    <img src={draggableIcon}/>
                </div>
                <div className="option-index">
                    {renderOptionIndex(item, index)}
                </div>
                <div className="option-input-container">
                    <Textarea
                        placeholder={`选项${index + 1}`}
                        onkeydown={textareaKeydown}
                        onBlur={inputDataChange}
                        onChange={(event : any) =>choiceChange(event, index)}
                        className="option-input"
                        value={item.title} />
                </div>
                <img
                    onClick={()=> deleteOption(index)}
                    className={classNames("close", {
                    "not-focus-hidden": !props.focus
                })} src={closeIcon} />
            </div>
        );
    }

    return (
        <div
            onClick={changeFocusElement}
            className="edit-select-wrapper"
        >
            <div className="select__title">
                <div className="number">{`${props.index + 1}.`}</div>
                <Textarea
                    ref={textarea}
                    onBlur={inputDataChange}
                    onChange={titleChange}
                    className="select__textarea"
                    value={title} />
            </div>
            <div className="choices">{
                select.setting && (select.setting as ISelectSetting).options.map((item : any, index : number)=>{
                    return renderChoices(item, index)
                })
            }</div>
            <div className={classNames("operations", {
                "not-focus-hidden": !props.focus
            })}>
                <Button onClick={addOption} className="operation" icon={<PlusOutlined />} type="link">添加选项</Button>
            </div>
        </div>
    );
}
