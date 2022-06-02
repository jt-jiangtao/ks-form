import Textarea from "@/components/Textarea";
import {IProblem, TProblemType, TResult} from "@/types/service/model";
import {useEffect, useState} from "react";

type WatchDateTimeProps = {
    data: IProblem<TProblemType>
    index: number
}

export default function WatchDateTime(props : WatchDateTimeProps){
    let [datetime, setDatetime] = useState(props.data)
    let [value, setValue] = useState((props.data.result as TResult<TProblemType>)?.value || '')

    useEffect(()=>{
        setDatetime(props.data)
        setValue((props.data.result as TResult<TProblemType>)?.value || '')
    }, [props])

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
                <div className="picker">
                    <span className="picker-content">{String(value)}</span>
                </div>
            </div>
        </div>
    );
}
