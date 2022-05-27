import React, {useState} from "react";
import {CaretUpOutlined} from "@ant-design/icons";
import classNames from "classnames";

type SelectListProps = {
    pullable ?: boolean,
    open ?: boolean,
    title: string
    children:  JSX.Element | React.ReactNode | React.ReactNode[]
}


export default function SelectList(props : SelectListProps){
    let [open, setOpen] = useState(!props.pullable || props.open)

    const changeOpenState = () => {
      setOpen(!open)
    }

    return (
        <div className="select-list">
            <div className="select-list__title">
                <span>{props.title}</span>
                <CaretUpOutlined
                    onClick={()=> changeOpenState()}
                    className={classNames('select-list__icon', {
                        'select-list__icon--hidden': !props.pullable,
                        'select-list__icon-rotate': !open
                    })}
                    />
            </div>
            <div className={classNames("select-list__content--" + (open ? 'down' : 'up'), "select-list__content")}>
                {props.children}
            </div>
        </div>
    );
}

SelectList.defaultProps = {
    pullable: true,
    open: true
}
