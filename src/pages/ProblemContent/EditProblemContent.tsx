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
import Menu from "@/components/DropDown/Menu";
import DropDown from "@/components/DropDown/DropDown";
import downIcon from "@/assets/icon/down.svg"
import "@/styles/EditProblemContent.scss"
import right from "@/assets/icon/right.svg"
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DragModule} from "@/components/QuestionComponents/Module/DragModule";

type FocusType = 'title' | 'subTitle' | number | ''

export default function EditProblemContent() {
    const {data, focus, setData, changeFocus} = useContext(DataInfoContext)
    const location = useLocation()
    let [isCreate] = useState<boolean>(location.search.slice(1).split("=").indexOf('id') === -1)
    useEffect(() => {
        let clearFocus = () => {
            changeFocus('')
        }
        document.addEventListener('click', clearFocus)
        return () => {
            document.removeEventListener('click', clearFocus)
        }
    }, [])

    const problemTypeMenuClick = (event : any, item : any, index : number) => {
        let newData = JSON.parse(JSON.stringify(data.problems[index]))
        newData.type = item.key
        if (item.key === 'singleSelect' || item.key === 'multiSelect'){
            newData["setting"] = {
                options: [
                    {
                        title: "",
                        status: 2
                    }
                ]
            }
        }
        if (item.key === 'date' || item.key === 'time'){
            newData["setting"] = {
                value: {
                    type: 0
                }
            }
        }
        freshProblemData(index, newData)
    }

    const renderProblemTypeMenu = (key: string, index : number) => {
        let items = [
            {
                key: "input",
                label: (<div className="problem-type-menu-content">
                    {key === 'input' && <img src={right}/>}<span>填空题</span></div>),
                name: "填空题"
            },
            {
                key: "pullSelect",
                label: (<div className="problem-type-menu-content">
                    {key === 'pullSelect' && <img src={right}/>}<span>下拉选择</span></div>),
                name: "下拉选择"
            },
            {
                key: "singleSelect",
                label: (<div className="problem-type-menu-content">
                    {key === 'singleSelect' && <img src={right}/>}<span>单选题</span></div>),
                name: "单选题"
            },
            {
                key: "multiSelect",
                label: (<div className="problem-type-menu-content">
                    {key === 'multiSelect' && <img src={right}/>}<span>多选题</span></div>),
                name: "多选题"
            },
            {
                key: "score",
                label: (<div className="problem-type-menu-content">
                    {key === 'score' && <img src={right}/>}<span>分数题</span></div>),
                name: "分数题"
            }
            , {
                key: "time",
                label: (<div className="problem-type-menu-content">
                    {key === 'time' && <img src={right}/>}<span>时间题</span></div>),
                name: "时间题"
            }, {
                key: "date",
                label: (<div className="problem-type-menu-content">
                    {key === 'date' && <img src={right}/>}<span>日期题</span></div>),
                name: "日期题"
            }
        ]
        return <DropDown trigger="click"
                         overlay={<Menu className="problem-type-menu" onClick={(event : any, item : any)=> problemTypeMenuClick(event, item, index)} items={items}/>}>
            <div className="problem-type-container">
                <span className="problem-type-title">{items.filter(item => item.key === key)[0].name}</span>
                <img src={downIcon}/>
            </div>
        </DropDown>
    }

    const changeFocusElement = (element: FocusType) => {
        changeFocus(element)
    }

    const freshTitle = (title: string) => {
        setData({
            title
        })
    }

    const freshSubTitle = (subTitle: string) => {
        setData({
            subTitle
        })
    }

    const freshProblemData = (index: number, newData: Object) => {
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
                data={item}
                index={index}
                dataRequired={item.required}
                titleShow={isCreate}
                key={`input-${item.id}`}
                focus={focus === index}
                title={renderProblemTypeMenu(item.type, index)}
                tools={<ToolMenu index={index}/>}
            >
                <EditInput index={index} focus={focus === index} freshData={freshProblemData}
                           changeFocusElement={changeFocusElement} data={item}/>
            </Module>
        )
    };

    const scoreEditWithModule = (item: IProblem<TProblemType>, index: number) => {
        return (
            <Module
                data={item}
                index={index}
                dataRequired={item.required}
                titleShow={isCreate}
                key={`input-${item.id}`}
                focus={focus === index}
                title={renderProblemTypeMenu(item.type, index)}
                tools={<ToolMenu index={index}/>}
            >
                <EditScore index={index} focus={focus === index} freshData={freshProblemData}
                           changeFocusElement={changeFocusElement} data={item}/>
            </Module>
        )
    }

    const selectEditWithModule = (item: IProblem<TProblemType>, index: number) => {
        return (
            <Module
                data={item}
                index={index}
                dataRequired={item.required}
                titleShow={isCreate}
                key={`input-${item.id}`}
                focus={focus === index}
                title={renderProblemTypeMenu(item.type, index)}
                tools={<ToolMenu index={index}/>}
            >
                <EditSelect index={index} focus={focus === index} freshData={freshProblemData}
                            changeFocusElement={changeFocusElement} data={item}/>
            </Module>
        )
    }

    const dateTimeEditWithModule = (item: IProblem<TProblemType>, index: number) => {
        return (
            <Module
                data={item}
                index={index}
                dataRequired={item.required}
                titleShow={isCreate}
                key={`input-${item.id}`}
                focus={focus === index}
                title={renderProblemTypeMenu(item.type, index)}
                tools={<ToolMenu index={index}/>}
            >
                <EditDateTime index={index} focus={focus === index} freshData={freshProblemData}
                              changeFocusElement={changeFocusElement} data={item}/>
            </Module>
        )
    }

    return (
        <>
            <EditTitle changeFocusElement={changeFocusElement} focus={focus === 'title'} title={data.title}
                       freshData={freshTitle}/>
            <EditSubTitle focus={focus === 'subTitle'} title={data.subTitle} freshData={freshSubTitle}
                          changeFocusElement={changeFocusElement}/>
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
