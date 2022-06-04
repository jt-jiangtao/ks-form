import {IDatetimeSetting, IProblem, TProblemType} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import {createRef, useEffect, useState} from "react";
import {CheckOutlined, ClockCircleOutlined, UserOutlined} from "@ant-design/icons";
import bottomIcon from "@/assets/icon/bottom.png"
import calendarIcon from "@/assets/icon/calendar.svg"
import classNames from "classnames";
import DropDown from "@/components/DropDown/DropDown";
import Menu, {MenuItem} from "@/components/DropDown/Menu";

type EditDateTimeProps = {
    index: number,
    focus: boolean,
    freshData: Function,
    changeFocusElement: Function,
    data: IProblem<TProblemType>,
}

export default function EditDateTime(props: EditDateTimeProps) {
    let [textareaValue, setTextareaValue] = useState(props.data.title)
    let [choice, setChoice] = useState((props.data.setting as IDatetimeSetting).type || 0)
    let textarea = createRef<HTMLTextAreaElement>()
    let timeItems: MenuItem[] = [
        {
            label: '时间:   时  分',
            key: 0,
            icon: <CheckOutlined
                style={{color: "#1488ED", fontSize: "14px", visibility: (choice === 0 ? 'visible' : 'hidden')}}/>,
            value: "时  分"
        },
        {
            label: '时间:   时  分  秒',
            key: 1,
            icon: <CheckOutlined
                style={{color: "#1488ED", fontSize: "14px", visibility: (choice === 1 ? 'visible' : 'hidden')}}/>,
            value: "时  分  秒"
        }
    ]
    let dateItems: MenuItem[] = [
        {
            label: '年  月',
            key: 0,
            icon: <CheckOutlined
                style={{color: "#1488ED", fontSize: "14px", visibility: (choice === 0 ? 'visible' : 'hidden')}}/>,
            value: "年  月"
        },
        {
            label: '年  月  日',
            key: 1,
            icon: <CheckOutlined
                style={{color: "#1488ED", fontSize: "14px", visibility: (choice === 1 ? 'visible' : 'hidden')}}/>,
            value: "年  月  日"
        },
        {
            label: '年  月  日  时  分',
            key: 2,
            icon: <CheckOutlined
                style={{color: "#1488ED", fontSize: "14px", visibility: (choice === 2 ? 'visible' : 'hidden')}}/>,
            value: "年  月  日  时  分"
        }
    ]
    useEffect(() => {
        setTextareaValue(props.data.title)
        setChoice((props.data.setting as IDatetimeSetting).type || 0)
    }, [props.data])

    useEffect(()=>{
        // if (!props.focus) textarea.current?.blur()
        // else textarea.current?.focus()
    },[props.focus])

    const changeFocusElement = (event: any) => {
        event.stopPropagation()
        props.changeFocusElement(props.index)
    }

    const freshChoiceData = (event: any, item: any) => {
        props.freshData(props.index, {
            "setting": {
                "type": item.key
            }
        })
    }

    const freshTitleData = () => {
        props.freshData(props.index, {
            "title": textareaValue
        })
    }

    const getMenu = () => {
        return (
            <Menu className="datetime-menu" onClick={freshChoiceData}
                  items={props.data.type === 'time' ? timeItems : dateItems}/>
        )
    }

    const renderIcon = () => {
        if (props.data.type === 'time') {
            return (
                <>
                    <DropDown pullable={props.focus} trigger="click" overlay={getMenu()}>
                        <ClockCircleOutlined/>
                        <img className="down" src={bottomIcon}/>
                    </DropDown>
                </>
            )
        }
        return (
            <>
                <DropDown pullable={props.focus} trigger="click" overlay={getMenu()}>
                    <img src={calendarIcon}/>
                    <img className="down" src={bottomIcon}/>
                </DropDown>
            </>
        )
    }

    const renderFormat = () => {
        let menu = props.data.type === "time" ? timeItems : dateItems
        for (let i = 0; i < menu.length; i++) {
            let item: any = menu[i]
            if (item.key === choice) {
                return item.value
            }
        }
        return ''
    }

    const textareaValueChange = (event: any) => {
        setTextareaValue(event.currentTarget.value)
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
                    onBlur={freshTitleData}
                    onChange={textareaValueChange}
                    className="select__textarea"
                    value={textareaValue}/>
            </div>
            <div className="datetime">
                <div className="datetime-container">
                    <div className={classNames("icon", {
                        "icon-hover": props.data.type === 'time' && props.focus
                    })}>{renderIcon()}</div>
                    <div className="format">{renderFormat()}</div>
                </div>
            </div>
        </div>
    );
}
