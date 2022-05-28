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
import {IProblem, TProblemType} from "@/types/service/model";
import {nanoid} from "nanoid";

export default function QuestionList() {
    const {data, setData, changeFocus} = useContext(DataInfoContext)

    const addData = (newData : IProblem<TProblemType> & {isNew: boolean}) => {
        let copy = JSON.parse(JSON.stringify(data.problems))
        newData.id = nanoid(10)
        copy.push(newData)
        changeFocus(copy.length - 1)
        setData({
            problems: copy
        })
    }

    const addInputProblem = (event : any)=>{
        event.stopPropagation()
        addData({
            title: '',
            type: 'input',
            required: false,
            isNew: true
        })
    }

    const addNameProblem = (event : any) => {
        event.stopPropagation()
        addData({
            title: '姓名',
            type: 'input',
            required: true,
            isNew: true
        })
    }

    return (
        <div className="question-list">
            <SelectList title="添加题目" pullable={false}>
                <div className="question-container">
                    <Button
                        onClick={addInputProblem}
                        className="question" icon={<SvgComponent src={editSvg}/>}>填空题</Button>
                    <Button className="question" icon={<SvgComponent src={singleSelect}/>}>单选题</Button>
                    <Button className="question" icon={<SvgComponent src={multiSelect}/>}>多选题</Button>
                    <Button className="question" icon={<SvgComponent src={pullSelect}/>}>下拉选择</Button>
                    <Button className="question" icon={<SvgComponent src={starIcon}/>}>分数题</Button>
                    <Button className="question" icon={<SvgComponent src={dateIcon}/>}>日期题</Button>
                    <Button className="question" icon={<SvgComponent src={timeIcon}/>}>时间题</Button>
                </div>
            </SelectList>
            <SelectList title="题目模板">
                <div className="question-container">
                    <Button
                        onClick={addNameProblem}
                        className="question">姓名</Button>
                    <Button className="question">性别</Button>
                </div>
            </SelectList>
            <SelectList title="我的常用题" pullable={false}>
                <div className="normal-question-container">暂无我的常用题</div>
            </SelectList>
        </div>
    )
}
