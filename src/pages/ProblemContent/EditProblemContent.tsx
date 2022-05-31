import {useContext, useEffect, useState} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import EditTitle from "@/components/QuestionComponents/Title/EditTitle";
import EditSubTitle from "@/components/QuestionComponents/SubTitle/EditSubTitle";
import Module from "@/components/QuestionComponents/Module";
import EditInput from "@/components/QuestionComponents/Input/EditInput";
import {IProblem, TProblemType} from "@/types/service/model";
import {ToolMenu} from "@/components/QuestionComponents/ToolMenu/ToolMenu";
import {useLocation} from "react-router";
import EditSelect from "@/components/QuestionComponents/Select/EditSelect";
import EditScore from "@/components/QuestionComponents/Score/EditScore";
import EditDateTime from "@/components/QuestionComponents/DateTime/EditDateTime";

type FocusType = 'title' | 'subTitle' | number | ''

export default function EditProblemContent(){
    const {data,focus,  setData, changeFocus} = useContext(DataInfoContext)
    const location = useLocation()
    let [isCreate] = useState<boolean>( location.search.slice(1).split("=").indexOf('id') === -1)
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
                titleShow={isCreate}
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

    const scoreEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <Module
              titleShow={isCreate}
              key={`input-${item.id}`}
              focus={focus === index}
              title="评分题"
              tools={<ToolMenu index={index}/>}
          >
              <EditScore index={index} focus={focus === index} freshData={freshProblemData} changeFocusElement={changeFocusElement} data={item}/>
          </Module>
      )
    }

    const selectEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <Module
              titleShow={isCreate}
              key={`input-${item.id}`}
              focus={focus === index}
              title="单选题"
              tools={<ToolMenu index={index}/>}
          >
            <EditSelect index={index} focus={focus === index} freshData={freshProblemData} changeFocusElement={changeFocusElement} data={item}/>
          </Module>
      )
    }

    const dateTimeEditWithModule = (item : IProblem<TProblemType>, index : number) => {
      return (
          <Module
              titleShow={isCreate}
              key={`input-${item.id}`}
              focus={focus === index}
              title="时间题"
              tools={<ToolMenu index={index}/>}
          >
              <EditDateTime index={index} focus={focus === index} freshData={freshProblemData} changeFocusElement={changeFocusElement} data={item}/>
          </Module>
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
                        case "pullSelect":
                        case "singleSelect":
                        case "multiSelect":
                            return selectEditWithModule(item, index)
                        case "score":
                            return scoreEditWithModule(item, index)
                        case "time":
                        case "date":
                            return dateTimeEditWithModule(item, index)
                    }
                    return null
                })
            }
        </>
    )
}
