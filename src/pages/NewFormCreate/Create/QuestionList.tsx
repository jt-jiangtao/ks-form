import {useContext} from "react";
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
        title: '',
        type: 'input',
        required: false,
        isNew: true
    },
    "name": {
        title: '姓名',
        type: 'input',
        required: false,
        isNew: true
    },
    "singleSelect": {
        isNew: true,
        title: "",
        type: "singleSelect",
        required: false,
        setting: {
            options: [
                {
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
    "sex": {
        isNew: true,
        title: "性别",
        type: "singleSelect",
        required: false,
        setting: {
            options: [
                {
                    title: "男",
                    status: 2
                },
                {
                    title: "女",
                    status: 2
                }
            ]
        }
    }
}

export default function QuestionList() {
    const {data, setData, changeFocus} = useContext(DataInfoContext)
    const {focus} = useContext(DataInfoContext)
    const addData = (event : any, key : ProblemType) => {
        event.stopPropagation()
        let newData : any = problems[key]
        let copy = JSON.parse(JSON.stringify(data.problems))
        newData.id = nanoid(10)
        if (focus === '' || focus === 'title' || focus ==='subTitle') {
            copy.push(newData)
            changeFocus(copy.length - 1)
        }
        else {
            copy.splice(Number(focus) + 1, 0, newData)
            changeFocus(Number(focus) + 1)
        }
        setData({
            problems: copy
        })
    }

    return (
        <div className="question-list">
            <SelectList title="添加题目" pullable={false}>
                <div className="question-container">
                    <Button
                        onClick={(event)=> addData(event, "input")}
                        className="question" icon={<SvgComponent src={editSvg}/>}>填空题</Button>
                    <Button
                        onClick={(event)=> addData(event, "singleSelect")}
                        className="question" icon={<SvgComponent src={singleSelect}/>}>单选题</Button>
                    <Button
                        onClick={(event)=> addData(event, "multiSelect")}
                        className="question" icon={<SvgComponent src={multiSelect}/>}>多选题</Button>
                    <Button
                        onClick={(event)=> addData(event, "pullSelect")}
                        className="question" icon={<SvgComponent src={pullSelect}/>}>下拉选择</Button>
                    <Button
                        onClick={(event)=> addData(event, "score")}
                        className="question" icon={<SvgComponent src={starIcon}/>}>分数题</Button>
                    <Button
                        onClick={(event)=> addData(event, "date")}
                        className="question" icon={<SvgComponent src={dateIcon}/>}>日期题</Button>
                    <Button
                        onClick={(event)=> addData(event, "time")}
                        className="question" icon={<SvgComponent src={timeIcon}/>}>时间题</Button>
                </div>
            </SelectList>
            <SelectList title="题目模板">
                <div className="question-container">
                    <Button
                        onClick={(event)=> addData(event, "name")}
                        className="question">姓名</Button>
                    <Button
                        onClick={(event)=> addData(event, "sex")}
                        className="question">性别</Button>
                </div>
            </SelectList>
            <SelectList title="我的常用题" pullable={false}>
                <div className="normal-question-container">暂无我的常用题</div>
            </SelectList>
        </div>
    )
}
