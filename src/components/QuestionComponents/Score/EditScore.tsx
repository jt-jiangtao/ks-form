import Textarea from "@/components/Textarea";
import {IProblem, TProblemType} from "@/types/service/model";
import {createRef, useEffect, useState} from "react";
import Stars from "@/components/Stars";

type EditScoreProps = {
    index: number,
    focus: boolean,
    freshData: Function,
    changeFocusElement: Function,
    data: IProblem<TProblemType>,
}

export default function EditScore(props: EditScoreProps){
    let [score, setScore] = useState(props.data)
    let textarea = createRef<HTMLTextAreaElement>()

    useEffect(()=>{
        setScore(props.data)
    }, [props.data])

    useEffect(()=>{
        // if (!props.focus) textarea.current?.blur()
        // else textarea.current?.focus()
    },[props.focus])

    const changeFocusElement = (event : any) => {
        event.stopPropagation()
        props.changeFocusElement(props.index)
    }

    const textareaValueChange = (event : any) => {
      setScore(Object.assign(score, {
          "title": event.currentTarget.value
      }))
    }

    const inputDataChange = () => {
        props.freshData(props.index, score)
    }

    return (
        <div
            onClick={changeFocusElement}
            className="edit-select-wrapper"
        >
            <div className="select__title">
                <div className="number">{`${props.index + 1}.`}</div>
                <Textarea
                    ref={textarea}
                    onBlur={inputDataChange}
                    onChange={textareaValueChange}
                    className="select__textarea"
                    value={score.title} />
            </div>
            <div className="score-stars">
                <Stars score={0} editable={false} maxScore={5} />
            </div>
        </div>
    )
}
