import {useContext, useEffect, useState} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import EditTitle from "@/components/QuestionComponents/Title/EditTitle";
import EditSubTitle from "@/components/QuestionComponents/SubTitle/EditSubTitle";
import Module from "@/components/QuestionComponents/Module";
import EditInput from "@/components/QuestionComponents/Input/EditInput";
import {IProblem, TProblemType} from "@/types/service/model";
import {ToolMenu} from "@/components/QuestionComponents/ToolMenu/ToolMenu";

type FocusType = 'title' | 'subTitle' | number | ''

export default function EditableProblemContent(){
    const {data,focus,  setData, changeFocus} = useContext(DataInfoContext)
    useEffect(()=>{
        let clearFocus = ()=>{
            changeFocus('')
        }
        document.addEventListener('click', clearFocus)
        return ()=>{
            document.removeEventListener('click', clearFocus)
        }
    }, [])

    const changeFocusElement = (element : FocusType) => {
        changeFocus(element)
    }

    const freshTitle = (title : string) => {
      setData({
          title
      })
    }

    const freshSubTitle = (subTitle : string) => {
      setData({
          subTitle
      })
    }

    const freshProblemData = (index : number, newData : Object) => {
        let completeData = Object.assign(JSON.parse(JSON.stringify(data.problems[index])), newData)
        let copy = JSON.parse(JSON.stringify(data.problems))
        copy[index] = completeData
        setData({
            problems: copy
        })
    }

    const inputEditWithModule = (item: IProblem<TProblemType>, index: number) => {
        return (
            <Module
                key={`input-${item.id}`}
                focus={focus === index}
                title="填空题"
                tools={<ToolMenu index={index}/>}
            >
                <EditInput index={index} focus={focus === index} freshData={freshProblemData}
                           changeFocusElement={changeFocusElement} data={item}/>
            </Module>
        )
    };

    const dateEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <div>dateEditWithModule</div>
      )
    }

    const multiSelectEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <div>multiSelectEditWithModule</div>
      )
    }

    const pullSelectEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <div>pullSelectEditWithModule</div>
      )
    }

    const scoreEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <div>scoreEditWithModule</div>
      )
    }

    const singleSelectEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <div>singleSelectEditWithModule</div>
      )
    }

    const timeEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <div>timeEditWithModule</div>
      )
    }

    return (
        <>
            <EditTitle changeFocusElement={changeFocusElement} focus={focus === 'title'} title={data.title} freshData={freshTitle}/>
            <EditSubTitle focus={focus === 'subTitle'} title={data.subTitle} freshData={freshSubTitle} changeFocusElement={changeFocusElement} />
            {
                data.problems.map((item, index) => {
                    switch (item.type) {
                        case "input":
                            return inputEditWithModule(item, index)
                        case "date":
                            return dateEditWithModule(item, index)
                        case "multiSelect":
                            return multiSelectEditWithModule(item, index)
                        case "pullSelect":
                            return pullSelectEditWithModule(item, index)
                        case "score":
                            return scoreEditWithModule(item, index)
                        case "singleSelect":
                            return singleSelectEditWithModule(item, index)
                        case "time":
                            return timeEditWithModule(item, index)
                    }
                    return null
                })
            }
        </>
    )
}
