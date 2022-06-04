import React, {useEffect, useState} from "react";
import {IStarProblem, TProblemType} from "@/types/service/model";
import {listStar} from "@/services";

type NormalUsedProblemProps = {
    children?: JSX.Element | React.ReactNode
}

export const NormalUsedProblemContext = React.createContext<{
    data: IStarProblem<TProblemType>[],
    freshNormalUsedProblem: Function
}>({
    data : [],
    freshNormalUsedProblem: ()=>{}
})

export function NormalUsedProblemProvider(props : NormalUsedProblemProps){
    let [data, setData] = useState<IStarProblem<TProblemType>[]>([])
    const freshData = () => {
        listStar().then(res=>{
            setData(res.data.items)
        })
    }
    useEffect(()=>{
        freshData()
    }, [])
    const freshNormalUsedProblem = () => {
      freshData()
    }
    return (
        <NormalUsedProblemContext.Provider value={{data, freshNormalUsedProblem}}>
            {props.children}
        </NormalUsedProblemContext.Provider>
    )
}
