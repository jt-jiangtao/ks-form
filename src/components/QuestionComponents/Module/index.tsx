import React, {createRef, useContext, useEffect, useRef} from "react";
import classNames from "classnames";
import './index.scss'
import {useDrag, useDrop} from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'
import {DataInfoContext} from "@/store/context/DataInfoContext";
import {getEmptyImage} from "react-dnd-html5-backend";
import {IProblem, TProblemType} from "@/types/service/model";
import {debounce} from "lodash"

type ModuleProps = {
    focus: boolean,
    children: JSX.Element | React.ReactNode,
    tools?: JSX.Element,
    title?: JSX.Element | string,
    titleShow?: boolean,
    draggable?: boolean,
    dataRequired: boolean,
    index : number,
    data ?: IProblem<TProblemType> | null
}


export default function Module(props: ModuleProps) {
    const {data, setData, changeFocus} = useContext(DataInfoContext)
    let ref = useRef<HTMLDivElement>(null)
    let [{ handlerId }, drop] = useDrop<
        {
            index: number,
            props: ModuleProps
        },
        void,
        { handlerId: Identifier | null }
        >({
        accept: "module",
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
            changeItems(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })
    const changeItems = debounce((dragIndex : number, hoverIndex : number) => {
        changeFocus('')
        let temp = data.problems[dragIndex]
        data.problems[dragIndex] = data.problems[hoverIndex]
        data.problems[hoverIndex] = temp
        setData({
            "problems": data.problems
        })
    }, 100)

    let [{isDragging}, drag, preview] = useDrag({
        type: "module",
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

    const renderTitle = () => {
        return typeof props.title === 'string' ?
            <div className='module__title--string'>{props.title}</div> :
            <div className='module__title--component'>{props.title}</div>
    }

    const clickHandler = (event: any) => {
        event.stopPropagation()
    }


    return (
        <div
            style={{
                opacity: isDragging ? 0 : 1
            }}
            ref={ref}
            onClick={clickHandler}
            className={classNames('module', {
                'module--focus': props.focus,
                'module--not-focus': !props.focus
            })}
        >
            <div
                style={{
                    display: props.titleShow ? '' : 'none'
                }}
                className="module__title">
                {renderTitle()}
            </div>
            {props.draggable && <div className='module__draggable'/>}
            <span className={classNames("required", {
                "required-show": props.dataRequired
            })}>*</span>
            {props.children}
            <div className="module__tools">
                {props.tools}
            </div>
        </div>
    )
}

Module.defaultProps = {
    focus: false,
    title: '标题',
    draggable: true,
    titleShow: true
}
