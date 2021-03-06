import {useContext, useState} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import '@/styles/NewFormCreate/Create/questionList.scss'
import SelectList from "@/components/SelectList";
import Button from "@/components/Button/Button";
import editSvg from '@/assets/icon/edit.svg'
import starIcon from '@/assets/icon/star.svg'
import singleSelect from '@/assets/icon/singleSelect.svg'
import multiSelect from '@/assets/icon/multiSelect.svg'
import dateIcon from '@/assets/icon/date.png'
import timeIcon from '@/assets/icon/time.png'
import pullSelect from '@/assets/icon/pullSelect.svg'
import SvgComponent from "@/utils/SvgComponent";
import {nanoid} from "nanoid";
import {NormalUsedProblemContext} from "@/store/context/NormalUsedProblem";
import Modal from "@/components/Modal/Modal";
import {PlusOutlined} from "@ant-design/icons";
import {cancelStarProblem, star} from "@/services";
import message from "@/components/Message";
import classNames from "classnames";
import {ToolMenu} from "@/components/QuestionComponents/ToolMenu/ToolMenu";
import EditInput from "@/components/QuestionComponents/Input/EditInput";
import Module from "@/components/QuestionComponents/Module";
import right from "@/assets/icon/right.svg";
import DropDown from "@/components/DropDown/DropDown";
import Menu from "@/components/DropDown/Menu";
import downIcon from "@/assets/icon/down.svg";
import {IProblem, TProblemType} from "@/types/service/model";
import selected from "@/assets/icon/selected.svg";
import unselect from "@/assets/icon/unselect.svg";
import EditableDateTime from "@/components/QuestionComponents/DateTime/EditableDateTime";
import EditDateTime from "@/components/QuestionComponents/DateTime/EditDateTime";
import EditScore from "@/components/QuestionComponents/Score/EditScore";
import EditSelect from "@/components/QuestionComponents/Select/EditSelect";
import {checkProblem} from "@/utils/validate";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export type ProblemType =
    | "input"
    | "singleSelect"
    | "multiSelect"
    | "pullSelect"
    | "date"
    | "time"
    | "score"
    | "sex"
    | "name"

const problems = {
    "input": {
        isNew: true,
        title: '',
        type: 'input',
        required: false
    },
    "singleSelect": {
        isNew: true,
        title: "",
        type: "singleSelect",
        required: false,
        setting: {
            options: [
                {
                    id: nanoid(10),
                    title: "",
                    status: 2
                }
            ]
        }
    },
    "multiSelect": {
        isNew: true,
        title: "",
        type: "multiSelect",
        required: false,
        setting: {
            options: [
                {
                    id: nanoid(10),
                    title: "",
                    status: 2
                }
            ]
        }
    },
    "pullSelect": {
        isNew: true,
        title: "",
        type: "pullSelect",
        required: false,
        setting: {
            options: [
                {
                    id: nanoid(10),
                    title: "",
                    status: 2
                }
            ]
        }
    },
    "date": {
        isNew: true,
        title: "",
        type: "date",
        required: false,
        setting: {
            type: 1
        }
    },
    "time": {
        isNew: true,
        title: "",
        type: "time",
        required: false,
        setting: {
            type: 1
        }
    },
    "score": {
        isNew: true,
        title: "",
        type: "score",
        required: false,
    },
    "name": {
        isNew: true,
        title: '??????',
        type: 'input',
        required: false
    },
    "sex": {
        isNew: true,
        title: "??????",
        type: "singleSelect",
        required: false,
        setting: {
            options: [
                {
                    id: nanoid(10),
                    title: "???",
                    status: 2
                },
                {
                    id: nanoid(10),
                    title: "???",
                    status: 2
                }
            ]
        }
    }
}

export default function QuestionList() {
    const {data: normalUsedProblem, freshNormalUsedProblem} = useContext(NormalUsedProblemContext)
    const {data, focus, setData, changeFocus} = useContext(DataInfoContext)
    const [normalQuestionStatus, setNormalQuestionStatus] = useState(0)
    const [manageData, setManageData] = useState<IProblem<TProblemType>>(problems.input as any)
    const [normalId, setNormalId] = useState<string>('')

    const freshData = (index: number, newData: any) => {
        setManageData(Object.assign({}, manageData, newData))
    }
    const addDataWithKey = (event: any, key: ProblemType) => {
        event.stopPropagation()
        let newData: any = problems[key]
        addData(newData)
    }
    const addData = (newData: any) => {
        let copy = JSON.parse(JSON.stringify(data.problems))
        newData.id = nanoid(10)
        if (focus === '' || focus === 'title' || focus === 'subTitle') {
            copy.push(newData)
            changeFocus(copy.length - 1)
        } else {
            copy.splice(Number(focus) + 1, 0, newData)
            changeFocus(Number(focus) + 1)
        }
        setData({
            problems: copy
        })
    }

    const addNormalData = (event: any, data: any) => {
        event.stopPropagation()
        if (["pullSelect", "singleSelect", "multiSelect"].indexOf(data.type) !== -1){
            let options = data.setting.options
            for (let i = 0; i < options.length; i++) {
                options[i].id = nanoid(10)
            }
        }
        addData(data)
    }

    const deleteNormalQuestion = (id: string) => {
        cancelStarProblem({
            id
        }).then(res => {
            if (res.stat === 'ok') {
                message.success("????????????")
                freshNormalUsedProblem()
            }
        })
    }

    const problemTypeMenuClick = (event: any, item: any) => {
        let newData = JSON.parse(JSON.stringify(manageData))
        newData.type = item.key
        if (item.key === 'singleSelect' || item.key === 'multiSelect') {
            newData["setting"] = {
                options: [
                    {
                        title: "",
                        status: 2
                    }
                ]
            }
        }
        if (item.key === 'date' || item.key === 'time') {
            newData["setting"] = {
                value: {
                    type: 0
                }
            }
        }
        setManageData(newData)
    }

    const renderProblemTypeMenu = (key: string) => {
        let items = [
            {
                key: "input",
                label: (<div className="problem-type-menu-content">
                    {key === 'input' && <img src={right}/>}<span>?????????</span></div>),
                name: "?????????"
            },
            {
                key: "pullSelect",
                label: (<div className="problem-type-menu-content">
                    {key === 'pullSelect' && <img src={right}/>}<span>????????????</span></div>),
                name: "????????????"
            },
            {
                key: "singleSelect",
                label: (<div className="problem-type-menu-content">
                    {key === 'singleSelect' && <img src={right}/>}<span>?????????</span></div>),
                name: "?????????"
            },
            {
                key: "multiSelect",
                label: (<div className="problem-type-menu-content">
                    {key === 'multiSelect' && <img src={right}/>}<span>?????????</span></div>),
                name: "?????????"
            },
            {
                key: "score",
                label: (<div className="problem-type-menu-content">
                    {key === 'score' && <img src={right}/>}<span>?????????</span></div>),
                name: "?????????"
            }
            , {
                key: "time",
                label: (<div className="problem-type-menu-content">
                    {key === 'time' && <img src={right}/>}<span>?????????</span></div>),
                name: "?????????"
            }, {
                key: "date",
                label: (<div className="problem-type-menu-content">
                    {key === 'date' && <img src={right}/>}<span>?????????</span></div>),
                name: "?????????"
            }
        ]
        return <DropDown trigger="click"
                         overlay={<Menu className="problem-type-menu"
                                        onClick={(event: any, item: any) => problemTypeMenuClick(event, item)}
                                        items={items}/>}>
            <div className="problem-type-container">
                <span className="problem-type-title">{items.filter(item => item.key === key)[0].name}</span>
                <img src={downIcon}/>
            </div>
        </DropDown>
    }

    const renderNormalItem = (key: string) => {
        switch (key) {
            case "input":
                return <EditInput index={0} focus={true} freshData={freshData}
                                  changeFocusElement={() => {
                                  }} data={manageData}/>
            case "date":
            case "time":
                return <EditDateTime index={0} focus={true} freshData={freshData}
                                     changeFocusElement={() => {
                                     }} data={manageData}/>
            case "score":
                return <EditScore index={0} focus={true} freshData={freshData}
                                  changeFocusElement={() => {
                                  }} data={manageData}/>
            case "pullSelect":
            case "singleSelect":
            case "multiSelect":
                return <EditSelect index={0} focus={true} freshData={freshData}
                                   changeFocusElement={() => {
                                   }} data={manageData}/>
        }
        return null
    }

    const renderNormalEdit = () => {
        return (
            <Module
                index={0}
                draggable={false}
                dataRequired={manageData.required}
                titleShow={true}
                key={`input-${manageData.id}`}
                focus={true}
                title={renderProblemTypeMenu(manageData.type)}
                tools={<div className="tool__require">
                    <div
                        onClick={() => freshData(0, {
                            "required": !manageData.required
                        })}
                        className="require-des">??????
                    </div>
                    <img
                        onClick={() => freshData(0, {
                            "required": !manageData.required
                        })}
                        className="choice"
                        src={manageData.required ? selected : unselect}/>
                </div>}
            >
                {renderNormalItem(manageData.type)}
            </Module>
        )
    }

    const starManageData = () => {
        star({
            problem: manageData
        }).then(res => {
            if (res.stat === 'ok') {
                if (normalId === '') {
                    message.success("????????????")
                } else {
                    message.success("????????????")
                }
                freshNormalUsedProblem()
                setNormalQuestionStatus(1)
            }
        })
    }

    const addNormalProblem = () => {
        if (!checkProblem(manageData)) return
        if (normalId === '') {
            starManageData()
        } else {
            cancelStarProblem({
                id: normalId
            }).then(res => {
                starManageData()
            })
        }
    }

    return (
        <>
            <div className="question-list">
                <SelectList title="????????????" pullable={false}>
                    <div className="question-container">
                        <Button
                            onClick={(event) => addDataWithKey(event, "input")}
                            className="question" icon={<SvgComponent src={editSvg}/>}>?????????</Button>
                        <Button
                            onClick={(event) => addDataWithKey(event, "singleSelect")}
                            className="question" icon={<SvgComponent src={singleSelect}/>}>?????????</Button>
                        <Button
                            onClick={(event) => addDataWithKey(event, "multiSelect")}
                            className="question" icon={<SvgComponent src={multiSelect}/>}>?????????</Button>
                        <Button
                            onClick={(event) => addDataWithKey(event, "pullSelect")}
                            className="question" icon={<SvgComponent src={pullSelect}/>}>????????????</Button>
                        <Button
                            onClick={(event) => addDataWithKey(event, "score")}
                            className="question" icon={<SvgComponent src={starIcon}/>}>?????????</Button>
                        <Button
                            onClick={(event) => addDataWithKey(event, "date")}
                            className="question" icon={<SvgComponent src={dateIcon}/>}>?????????</Button>
                        <Button
                            onClick={(event) => addDataWithKey(event, "time")}
                            className="question" icon={<SvgComponent src={timeIcon}/>}>?????????</Button>
                    </div>
                </SelectList>
                <SelectList title="????????????">
                    <div className="question-container">
                        <Button
                            onClick={(event) => addDataWithKey(event, "name")}
                            className="question">??????</Button>
                        <Button
                            onClick={(event) => addDataWithKey(event, "sex")}
                            className="question">??????</Button>
                    </div>
                </SelectList>
                <SelectList
                    title="???????????????"
                    pullable={false}
                    manager={<Button onClick={(event : any) => {
                        event.stopPropagation()
                        setNormalQuestionStatus(1)
                    }} type="link">??????</Button>}
                >
                    {
                        normalUsedProblem.length === 0 ? <div className="normal-question-container">?????????????????????</div>
                            :
                            <div className="question-container">
                                {
                                    normalUsedProblem.map((item: any) => <Button
                                        key={`button-${nanoid(5)}`}
                                        onClick={(event) => addNormalData(event, item.problem)}
                                        className="question">{item.problem.title}</Button>)
                                }
                            </div>
                    }
                </SelectList>
            </div>
            <Modal
                onClose={() => setNormalQuestionStatus(0)}
                width={850} height={578} footer="" title="???????????????" visible={normalQuestionStatus === 1}>
                <Button onClick={() => {
                    setManageData(problems.input as any)
                    setNormalQuestionStatus(2)
                    setNormalId('')
                }} className="normal-button" type="link" icon={<PlusOutlined/>}>????????????????????????</Button>
                <div className="normal-question-list">
                    {
                        normalUsedProblem.map((item: any) => {
                            return (
                                <div key={`normal-problem-${nanoid(5)}`} className="question-item">
                                    <div className="title">{item.problem.title}</div>
                                    <div className="operation">
                                        <Button onClick={() => {
                                            setManageData(item.problem)
                                            setNormalQuestionStatus(2)
                                            setNormalId(item.id)
                                        }} className="operation-btn" type="link">??????</Button>
                                        <Button onClick={() => deleteNormalQuestion(item.id)} className="operation-btn"
                                                type="link">??????</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal>
            <Modal
                footer={
                    <div className="add-normal-buttons">
                        <Button onClick={() => setNormalQuestionStatus(1)}>??????</Button>
                        <Button onClick={addNormalProblem} type="primary">??????</Button>
                    </div>
                }
                onClose={() => setNormalQuestionStatus(1)}
                width={850} height={545} title="???????????????" visible={normalQuestionStatus === 2}>
                <div className="question-wrapper">
                    <span className="title">????????????</span>
                    <Button
                        onClick={() => setManageData(problems.input as any)}
                        className={classNames("question", {
                            "question-active": manageData.type === 'input'
                        })} icon={<SvgComponent src={editSvg}/>}>?????????</Button>
                    <Button
                        onClick={() => setManageData(problems.singleSelect as any)}
                        className={classNames("question", {
                            "question-active": manageData.type === 'singleSelect'
                        })} icon={<SvgComponent src={singleSelect}/>}>?????????</Button>
                    <Button
                        onClick={() => setManageData(problems.multiSelect as any)}
                        className={classNames("question", {
                            "question-active": manageData.type === 'multiSelect'
                        })} icon={<SvgComponent src={multiSelect}/>}>?????????</Button>
                    <Button
                        onClick={() => setManageData(problems.pullSelect as any)}
                        className={classNames("question", {
                            "question-active": manageData.type === 'pullSelect'
                        })} icon={<SvgComponent src={pullSelect}/>}>????????????</Button>
                    <Button
                        onClick={() => setManageData(problems.score as any)}
                        className={classNames("question", {
                            "question-active": manageData.type === 'score'
                        })} icon={<SvgComponent src={starIcon}/>}>?????????</Button>
                    <Button
                        onClick={() => setManageData(problems.date as any)}
                        className={classNames("question", {
                            "question-active": manageData.type === 'date'
                        })} icon={<SvgComponent src={dateIcon}/>}>?????????</Button>
                    <Button
                        onClick={() => setManageData(problems.time as any)}
                        className={classNames("question", {
                            "question-active": manageData.type === 'time'
                        })} icon={<SvgComponent src={timeIcon}/>}>?????????</Button>
                </div>
                <div className="normal-edit">
                    {renderNormalEdit()}
                </div>
            </Modal>
        </>
    );
}
