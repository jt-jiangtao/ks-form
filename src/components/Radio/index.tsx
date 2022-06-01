import {useEffect, useState} from "react";
import unselectIcon from "@/assets/icon/singleSelect.png"
import selectIcon from "@/assets/icon/slectedSingle.png"
import exp from "constants";


type RadioContent = {
    label : string,
    value: string
}

type RadioProps = {
    options : RadioContent[],
    onChange ?: Function,
    defaultValue ?: string
}

export default function Radio(props : RadioProps){
    let [value, setValue] = useState(props.defaultValue)

    const onclick = (event : any, item : any) => {
        if (value === item.value) {
            props.onChange && props.onChange('')
            setValue('')
        } else {
            props.onChange && props.onChange(item.value)
            setValue(item.value)
        }
    }

    const renderItems = () => {
        let items : any = []
        props.options.forEach((item : any)=>{
            items.push((
                <div
                    onClick={(event : any) => onclick(event, item)}
                    className="select-item">
                    <img src={value === item.value ? selectIcon : unselectIcon} />
                    <div className="select-label">{item.label}</div>
                </div>
            ))
        })
        return items
    }

    return (
        <div className="select-items">
            {renderItems()}
        </div>
    )
}

