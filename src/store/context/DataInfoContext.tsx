import React, {useState} from "react";
import {IProblem, TProblemType, TResult, TSetting} from "@/types/service/model";

type DataInfo = {
    title: string,
    subTitle: string,
    problems: (IProblem<TProblemType> & { isNew: boolean })[];
}

type FocusType = 'title' | 'subTitle' | number | ''

export const defaultDataInfo: DataInfo = {
    "title": "",
    "subTitle": "",
    "problems": [
        {
            "title": "",
            "type": "input",
            "required": false,
            "id": "",
            isNew: true
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
