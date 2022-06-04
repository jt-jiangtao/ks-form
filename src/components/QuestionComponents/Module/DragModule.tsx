import type {CSSProperties, FC} from "react";
import type {XYCoord} from "react-dnd";
import {useDragLayer} from "react-dnd";
import Module from "@/components/QuestionComponents/Module/index";
import React, {RefObject, useContext, useRef} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import classNames from "classnames";
import Textarea from "@/components/Textarea";
import draggableIcon from "@/assets/icon/draggable-v.png";
import closeIcon from "@/assets/icon/close.png";
import {ISelectOption} from "@/types/service/model";
import singleSelectIcon from "@/assets/icon/singleSelect.png";
import multiSelectIcon from "@/assets/icon/multiSelect.png";

const layerStyles: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
};

function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }
    let {x, y} = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    };
}

type DragModuleProps = {
    scrollRef: RefObject<HTMLDivElement>
}

export const DragModule: FC<DragModuleProps> = (props) => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));

    const renderOptionIndex = (type : string, index : number) => {
        if (type === "singleSelect") return <img src={singleSelectIcon} />
        else if (type === "multiSelect") return <img src={multiSelectIcon} />
        return <span>{`${index + 1}.`}</span>
    }

    function renderItem() {
        switch (itemType) {
            case "module":
                return (
                    <Module
                        index={0}
                        dataRequired={item.props.required}
                        titleShow={false}
                        key={`input-${item.props.id}`}
                        focus={true}
                        title={""}
                        tools={undefined}
                    >
                        <div style={{
                            margin: 0
                        }} className="select__title select__title--no-hover">
                            <div className="number">
                                <span className={classNames("required-title-with", {"required-show": item?.props.data.required || false})}>*</span>
                                {`${item.props.index + 1}.`}
                            </div>
                            <Textarea
                                placeholder="请输入问题"
                                editable={false}
                                className="select__textarea"
                                value={item?.props.data.title || ''}/>
                        </div>
                    </Module>
                )
            case "select":
                return (
                    <div
                        style={{
                            zIndex: 0
                        }}
                        className="option-content">
                        <div className={classNames("option-content__move", {
                            "not-focus-hidden": false
                        })}>
                            <img src={draggableIcon}/>
                        </div>
                        <div className="option-index">
                            {renderOptionIndex(item.props.select.type, item.props.index)}
                        </div>
                        <div className="option-input-container">
                            <Textarea
                                placeholder={`选项${item.props.index + 1}`}
                                className="option-input"
                                value={item.props.item.title} />
                        </div>
                        <img
                            className={classNames("close", {
                                "not-focus-hidden": false
                            })} src={closeIcon} />
                    </div>
                )
            default:
                return null;
        }
    }

    if (!isDragging) {
        return null;
    }

    const getScrollHeight = () => {
        if (props.scrollRef){
            return props.scrollRef.current?.scrollTop || 0
        }
        return 0
    }


    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(
                    initialOffset,
                    {
                        y: ((currentOffset?.y || 0) - 130 + getScrollHeight()) || 0,
                        x: 0
                    }
                )}
            >
                {renderItem()}
            </div>
        </div>
    );
};
