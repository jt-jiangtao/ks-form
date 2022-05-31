import {useState} from "react";
import unselectIcon from '@/assets/icon/multiSelect.png'
import selectIcon from '@/assets/icon/not-multiSelect.png'

type CheckBoxContent = {
    label : string,
    value: string
}

type CheckBoxProps = {
    options : CheckBoxContent[],
    onChange ?: Function,
    defaultValue ?: string[]
}

export default function CheckBox(props : CheckBoxProps){
    let [value, setValue] = useState(props.defaultValue  || [])

    const onclick = (event : any, item : any) => {
        if (value?.indexOf(item.value) === -1) {
            props.onChange && props.onChange([...value, item.value])
            setValue([...value, item.value])
        } else {
            props.onChange && props.onChange([...value].filter(i => i !== item.value))
            setValue([...value].filter(i => i !== item.value))
        }
    }

    const renderItems = () => {
        let items : any = []
        props.options.forEach((item : any)=>{
            items.push((
                <div
                    onClick={(event : any) => onclick(event, item)}
                    className="select-item">
                    <img src={value?.indexOf(item.value) !== -1 ? selectIcon : unselectIcon} />
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


