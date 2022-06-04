import {IProblem, ISelectOption, ISelectSetting, TProblemType} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import {createRef, useEffect, useState} from "react";
import Button from "@/components/Button/Button";
import {PlusOutlined} from "@ant-design/icons";

import classNames from "classnames";
import Option from "@/components/QuestionComponents/Select/OptionIndex";
import {nanoid} from "nanoid";

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
        // if (!props.focus) textarea.current?.blur()
        // else textarea.current?.focus()
    },[props.focus])

    const changeFocusElement = (event : any) => {
        event.stopPropagation()
        props.changeFocusElement(props.index)
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
            status: 2,
            id: nanoid(8)
        })
        props.freshData(props.index, {
            "setting": copy.setting
        })
    }

    const renderChoices = (item : ISelectOption, index : number) => {
        return (
            <Option key={`option-${item.id}`} selectIndex={props.index} freshData={props.freshData} focus={props.focus} deleteOption={deleteOption} item={item} index={index} textareaKeydown={textareaKeydown} inputDataChange={inputDataChange} choiceChange={choiceChange} select={select} />
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
