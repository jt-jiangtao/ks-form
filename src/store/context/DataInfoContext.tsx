import React, {useState} from "react";
import {IProblem, TProblemType, TResult, TSetting} from "@/types/service/model";

type DataInfo = {
    title: string,
    subTitle: string,
    problems: IProblem<TProblemType>[]
}

type FocusType = 'title' | 'subTitle' | number | ''

export const defaultDataInfo: DataInfo = {
    "title": "标题",
    "subTitle": "子标题",
    "problems": [
        {
            "title": "填写姓名",
            "type": "input",
            "required": true,
            "id": "a0c5b631-fdcb-416a-8a56-7ad89589cebf"
        }
    ]
}

export const defaultFocus : FocusType = 0

export const DataInfoContext = React.createContext<{
    data: DataInfo,
    focus: FocusType,
    setData: Function,
    changeFocus: Function
}>({
    data: defaultDataInfo,
    focus: defaultFocus,
    setData: (newData : any): void=>{},
    changeFocus: (focus : any): void=>{}
})

type DataInfoContextProps = {
    children?: JSX.Element | React.ReactNode
}

export const DataInfoProvider = (props: DataInfoContextProps) => {
    const [data, setContextData] = useState<DataInfo>(defaultDataInfo)
    const setData = (newData : any) : void=>{
        setContextData({...data, ...newData})
    }
    const [focus, setFocus] = useState<FocusType>(defaultFocus)

    const changeFocus = (focus: FocusType): void => {
        setFocus(focus)
    }

    return (
        <DataInfoContext.Provider value={{data, focus , setData, changeFocus}}>
            {props.children}
        </DataInfoContext.Provider>
    )
}
