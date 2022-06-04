import singleSelectIcon from "@/assets/icon/singleSelect.png";
import multiSelectIcon from "@/assets/icon/multiSelect.png";
import {IProblem, ISelectOption, TProblemType} from "@/types/service/model";
import Textarea from "@/components/Textarea";
import classNames from "classnames";
import draggableIcon from "@/assets/icon/draggable-v.png";
import closeIcon from "@/assets/icon/close.png";
import {useEffect, useRef} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";
import {useDrag, useDrop} from "react-dnd";
import {Identifier, XYCoord} from "dnd-core";
import {debounce} from "lodash";

type OptionIndexProps = {
    item : ISelectOption
    index : number,
    textareaKeydown : Function,
    inputDataChange : Function,
    choiceChange : Function,
    deleteOption : Function,
    select : IProblem<TProblemType>,
    focus: boolean,
    changeItems : Function
}

export default function Option(props : OptionIndexProps){
    const {changeItems, focus, deleteOption, select, item, index, textareaKeydown, inputDataChange, choiceChange} = props
    let ref = useRef<HTMLDivElement>(null)
    const renderOptionIndex = (item : ISelectOption, index : number) => {
        if (select.type === "singleSelect") return <img src={singleSelectIcon} />
        else if (select.type === "multiSelect") return <img src={multiSelectIcon} />
        return <span>{`${index + 1}.`}</span>
    }

    let [{ handlerId }, drop] = useDrop<
        {
            index: number,
            props: OptionIndexProps
        },
        void,
        { handlerId: Identifier | null }
        >({
        accept: "select",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any,monitor : any) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = props.index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            changeItemsFun(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const changeItemsFun = debounce((dragIndex : number, hoverIndex : number) => {
        changeItems(dragIndex, hoverIndex)
    }, 100)


    let [{isDragging}, drag, preview] = useDrag({
        type: "select",
        item: ()=>({
            index: props.index,
            props
        }),
        collect: (monitor)=>({
            isDragging: monitor.isDragging()
        })
    })

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    drag(drop(ref))

    return (
        <div
            style={{
                opacity: isDragging ? 0 : 1
            }}
            ref={ref} className="option-content">
            <div className={classNames("option-content__move", {
                "not-focus-hidden": !focus
            })}>
                <img src={draggableIcon}/>
            </div>
            <div className="option-index">
                {renderOptionIndex(item, index)}
            </div>
            <div className="option-input-container">
                <Textarea
                    placeholder={`选项${index + 1}`}
                    onkeydown={textareaKeydown}
                    onBlur={inputDataChange}
                    onChange={(event : any) =>choiceChange(event, index)}
                    className="option-input"
                    value={item.title} />
            </div>
            <img
                onClick={()=> deleteOption(index)}
                className={classNames("close", {
                    "not-focus-hidden": !focus
                })} src={closeIcon} />
        </div>
    )
}
