import Textarea from "@/components/Textarea";
import {IDatetimeSetting, IProblem, TProblemType, TResult} from "@/types/service/model";
import {useEffect, useState} from "react";
import {DatePicker, TimePicker} from "antd";
import moment from "moment";
import closeIcon from "@/assets/icon/closeIcon.png"
import clockIcon from "@/assets/icon/clock.png"
import dateIcon from "@/assets/icon/dateIcon.png"
import classNames from "classnames";

type EditableDateTimeProps = {
    data: IProblem<TProblemType>,
    changeData: Function,
    index: number
}

export default function EditableDateTime(props : EditableDateTimeProps){
    let [datetime, setDatetime] = useState(props.data)
    let [value, setValue] = useState((props.data.result as TResult<TProblemType>)?.value || '')

    useEffect(()=>{
        setDatetime(props.data)
        setValue((props.data.result as TResult<TProblemType>)?.value || '')
    }, [props.data])

    const dateChange = (time : any, format : any) => {
        let copy = JSON.parse(JSON.stringify(props.data))
        copy['result'] = {
            'value': time.format(format)
        }
        props.changeData(props.index, copy)
    }

    const dateClear = () => {
        let copy = JSON.parse(JSON.stringify(props.data))
        copy['result'] = {
            'value': ''
        }
        props.changeData(props.index, copy)
    }

    const renderDatetimeInput = () => {
        if (props.data.type === 'date'){

            let formatList = [{
                "showTime": false,
                "picker": "month",
                "format": "YYYY/MM"
            },{
                "showTime": false,
                "picker": "date",
                "format": "YYYY/MM/DD"
            },{
                "showTime": true,
                "picker": "date",
                "format": "YYYY/MM/DD HH:mm"
            }]
            let format = formatList[(props.data.setting as IDatetimeSetting).type] || formatList[0]
            return <DatePicker showTime={format.showTime ? {
                format: "HH:mm"
            } : false} picker={format.picker === "month" ? "month" : "date"} onChange={(time : any)=> dateChange(time, format.format)} inputReadOnly={true} className="time-picker" name="确定" suffixIcon={null} clearIcon={false} placeholder="请输入" bordered={false} defaultValue={value !== '' ? moment(String(value), format.format) : undefined} format={format.format} />
        }
        let time : string = ((props.data.setting as IDatetimeSetting).type === 1) ? "HH:mm:ss" : "HH:mm"
        return <TimePicker onChange={(item : any)=> dateChange(item, time)} inputReadOnly={true} className="time-picker" name="确定" suffixIcon={null} showNow={false} clearIcon={false} placeholder="请输入" bordered={false} defaultValue={value !== '' ? moment(String(value), time) : undefined} format={time} />
    }

    return (
        <div
            className="editable-select-wrapper"
        >
            <div className="select__title select__title--no-hover">
                <div className="number">{`${props.index + 1}.`}</div>
                <Textarea
                    editable={false}
                    className="select__textarea"
                    value={datetime.title}/>
            </div>
            <div className="editable-datetime">
                <div className="text-wrapper">
                    <img
                        className="clock"
                        src={props.data.type === 'time' ? clockIcon : dateIcon}/>
                    <img
                        onClick={dateClear}
                        className={classNames("close", {
                            "close-show": value !== ''
                        })}
                        src={closeIcon}/>
                </div>
                <div className="picker">
                    {renderDatetimeInput()}
                </div>
            </div>
        </div>
    );
}
