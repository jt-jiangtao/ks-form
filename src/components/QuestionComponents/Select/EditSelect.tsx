import {IProblem, ISelectOption, TProblemType} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import {useEffect, useState} from "react";
import Button from "@/components/Button/Button";
import {PlusOutlined} from "@ant-design/icons";
import draggableIcon from "@/assets/icon/draggable-v.png"
import closeIcon from "@/assets/icon/close.png"
import singleSelectIcon from "@/assets/icon/singleSelect.png"

type EditSingleSelectProps = {
    index: number,
    focus: boolean,
    freshData: Function,
    changeFocusElement: Function,
    data: IProblem<TProblemType>,
}

export default function EditSelect(props : EditSingleSelectProps){

    let [singleSelect, setSingleSElect] = useState(props.data)

    useEffect(()=>{
        setSingleSElect(props.data)
    }, [props.data])

    const changeFocusElement = (event : any) => {
        event.stopPropagation()
        props.changeFocusElement(props.index)
    }

    const renderOptionIndex = (item : ISelectOption, index : number) => {
      return (
          <img src={singleSelectIcon} />
          // <span>1.</span>
      )
    }


    const renderChoices = (item : ISelectOption, index : number) => {
        return (
            <div className="option-content">
                <div className="option-content__move">
                    <img src={draggableIcon}/>
                </div>
                <div className="option-index">
                    {renderOptionIndex(item, index)}
                </div>
                <div className="option-input-container">
                    <Textarea className="option-input" value={item.title} />
                </div>
                <img className="close" src={closeIcon} />
            </div>
        );
    }

    return (
        <div
            onClick={changeFocusElement}
            className="edit-select-wrapper"
        >
            <div className="select__title">
                <div className="number">{`${props.index + 1}.`}</div>
                <Textarea
                    className="select__textarea"
                    value={singleSelect.title} />
            </div>
            <div className="choices">{
                singleSelect.setting && singleSelect.setting.options.map((item, index)=>{
                    return renderChoices(item, index)
                })
            }</div>
            <div className="operations">
                <Button className="operation" icon={<PlusOutlined />} type="link">添加选项</Button>
            </div>
        </div>
    );
}
