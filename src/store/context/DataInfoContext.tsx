import React, {useEffect, useState} from "react";
import {IProblem, TProblemType, TResult, TSetting} from "@/types/service/model";
import {useLocation} from "react-router";
import {getForm} from "@/services";
import {parseSearch} from "@/utils/uri";
import {nanoid} from "nanoid";

type DataInfo = {
    title: string,
    subTitle: string,
    problems: (IProblem<TProblemType> & { isNew: boolean })[];
}

type FocusType = 'title' | 'subTitle' | number | ''

// PROBLEM: id为空
export const defaultDataInfo: DataInfo = {
    "title": "",
    "subTitle": "",
    "problems": [
        {
            "title": "",
            "type": "input",
            "required": false,
            "id": nanoid(10),
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
    const location = useLocation()
    const [data, setContextData] = useState<DataInfo>(defaultDataInfo)
    // PROBLEMS: 由于location错误导致重复请求接口丢失状态
    useEffect(()=>{
        let id = parseSearch(location.search, 'id')
        if (!!id){
            getForm({
                id: parseSearch(location.search, 'id')
            }).then(res=>{
                setContextData(res.data.item)
            })
        }
    }, [location.search])
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
