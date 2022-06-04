import type {CSSProperties, FC} from "react";
import type {XYCoord} from "react-dnd";
import {useDragLayer} from "react-dnd";
import Module from "@/components/QuestionComponents/Module/index";
import React, {useContext, useRef} from "react";
import {DataInfoContext} from "@/store/context/DataInfoContext";
import classNames from "classnames";
import Textarea from "@/components/Textarea";

const layerStyles: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
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

export const DragModule: FC = () => {
    const ref = useRef<HTMLDivElement>(null)
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

    function renderItem() {
        switch (itemType) {
            case "module":
                return (
                    <Module
                        index={0}
                        dataRequired={item.required}
                        titleShow={false}
                        key={`input-${item.id}`}
                        focus={true}
                        title={""}
                        tools={undefined}
                    >
                        <div style={{
                            margin: 0
                        }} className="select__title select__title--no-hover">
                            <div className="number">
                                <span className={classNames("required-title-with", {"required-show": item?.data.required || false})}>*</span>
                                {`${item.index + 1}.`}
                            </div>
                            <Textarea
                                editable={false}
                                className="select__textarea"
                                value={item?.data.title || ''}/>
                        </div>
                    </Module>
                )
            default:
                return null;
        }
    }

    if (!isDragging) {
        return null;
    }

    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(
                    initialOffset,
                    {
                        y: ((currentOffset?.y || 0) - 130) || 0,
                        x: 0
                    }
                )}
            >
                {renderItem()}
            </div>
        </div>
    );
};
